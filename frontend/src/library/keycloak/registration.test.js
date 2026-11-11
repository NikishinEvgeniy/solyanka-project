import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, waitFor } from '@testing-library/dom'
import { setupRegistration, validateRegistration } from './solyanka/login/resources/js/registration.js'
import realm from '../../../../docker/solyanka-realm.json'

const valid = { username: 'cook', email: 'cook@example.ru', password: 'Cooking1', 'password-confirm': 'Cooking1' }
const names = Object.keys(valid)

function markup() {
  return `<form id="kc-register-form" action="http://localhost/register?session=original" method="post">
    <p id="registration-error" role="alert" hidden>Ошибка регистрации на сервере. Попробуйте ещё раз.</p>
    ${names.map(name => `<input id="${name}" name="${name}" type="${name.startsWith('password') ? 'password' : name === 'email' ? 'email' : 'text'}" required aria-invalid="false"><span id="error-${name}"></span>`).join('')}
    <button type="submit">Зарегистрироваться</button></form>`
}

describe('валидация регистрации', () => {
  it('тестовые пароли из импорта realm соответствуют политике регистрации', () => {
    const passwords = realm.users.flatMap(user => (user.credentials ?? [])
      .filter(credential => credential.type === 'password' && typeof credential.value === 'string')
      .map(credential => credential.value))
    expect(passwords.length).toBeGreaterThan(0)
    for (const password of passwords) {
      expect(validateRegistration({ ...valid, password, 'password-confirm': password }).password).toBeUndefined()
    }
  })

  it('требует заполнить все четыре поля', () => {
    expect(Object.keys(validateRegistration(Object.fromEntries(names.map(name => [name, '']))))).toHaveLength(4)
  })

  it.each(['abc1234', 'abcdefgh', '12345678', 'abcdefgh١'])('отклоняет неподходящий пароль %s', password => {
    expect(validateRegistration({ ...valid, password }).password).toContain('8 символов, буквы и цифры')
  })

  it.each(['Cooking1', 'Пароль12', 'a1234567'])('принимает подходящий пароль %s', password => {
    expect(validateRegistration({ ...valid, password, 'password-confirm': password })).toEqual({})
  })

  it('проверяет совпадение паролей', () => {
    expect(validateRegistration({ ...valid, 'password-confirm': 'Another1' })['password-confirm']).toBe('Пароли не совпадают')
  })

  it.each(['name', 'name@example', 'name@.ru', 'name@@example.ru', 'a b@example.ru', '.name@example.ru', 'a..b@example.ru', 'name@-example.ru'])('отклоняет Email %s', email => {
    expect(validateRegistration({ ...valid, email }).email).toBeTruthy()
  })

  it('разрешает допустимые спецсимволы и поддомены', () => {
    expect(validateRegistration({ ...valid, email: 'cook.recipes+new@sub.example.ru' })).toEqual({})
  })
})

describe('отправка формы Keycloak', () => {
  let form, request, navigate
  beforeEach(() => {
    document.body.innerHTML = markup()
    form = document.querySelector('form')
    for (const name of names) form.elements.namedItem(name).value = valid[name]
    request = vi.fn()
    navigate = vi.fn()
    setupRegistration(form, { request, navigate, storage: { getItem: () => 'http://localhost:3000/' } })
  })

  it('связывает ошибки с полями и не отправляет невалидную форму', () => {
    form.elements.namedItem('email').value = 'invalid'
    fireEvent.submit(form)
    expect(request).not.toHaveBeenCalled()
    expect(form.querySelector('#email')).toHaveAttribute('aria-invalid', 'true')
    expect(form.querySelector('#error-email')).toHaveTextContent('Введите корректный Email')
    expect(document.activeElement).toBe(form.querySelector('#email'))
  })

  it('обновляет ошибку подтверждения при изменении пароля', () => {
    fireEvent.input(form.querySelector('#password'), { target: { value: 'Changed1' } })
    expect(form.querySelector('#error-password-confirm')).toHaveTextContent('Пароли не совпадают')
  })

  it.each(['username', 'email'])('показывает серверную ошибку уникальности %s и сохраняет все значения', async name => {
    const page = new DOMParser().parseFromString(markup(), 'text/html')
    page.querySelector(`#error-${name}`).textContent = 'Пользователь с таким логином или email уже существует'
    page.querySelector('form').action = 'http://localhost/register?session=retry'
    request.mockResolvedValue({ ok: true, text: async () => page.body.innerHTML })
    fireEvent.submit(form)
    await waitFor(() => expect(form.querySelector(`#error-${name}`)).toHaveTextContent('Пользователь с таким логином или email уже существует'))
    expect(form.action).toContain('session=retry')
    for (const field of names) expect(form.elements.namedItem(field).value).toBe(valid[field])
    expect(navigate).not.toHaveBeenCalled()
  })

  it.each(['network', '500', 'unexpected'])('сохраняет данные при ошибке %s и позволяет повторить отправку', async error => {
    if (error === 'network') request.mockRejectedValue(new TypeError('Network error'))
    else request.mockResolvedValue({ ok: error !== '500', text: async () => '<html>Unavailable</html>' })
    fireEvent.submit(form)
    await waitFor(() => expect(form.querySelector('[role="alert"]')).toBeVisible())
    for (const name of names) expect(form.elements.namedItem(name).value).toBe(valid[name])
    expect(form.querySelector('button')).toBeEnabled()
    expect(form.action).toContain('session=original')
  })

  it('возвращает пользователя в приложение после перенаправления Keycloak, не читая OIDC callback через fetch', async () => {
    request.mockResolvedValue({ type: 'opaqueredirect' })
    fireEvent.submit(form)
    fireEvent.submit(form)
    await waitFor(() => expect(navigate).toHaveBeenCalledWith('http://localhost:3000/?registration=success'))
    expect(request).toHaveBeenCalledTimes(1)
    const options = request.mock.calls[0][1]
    expect(options).toMatchObject({ method: 'POST', redirect: 'manual', credentials: 'same-origin' })
    expect(options.body.get('password')).toBe(valid.password)
  })
})
