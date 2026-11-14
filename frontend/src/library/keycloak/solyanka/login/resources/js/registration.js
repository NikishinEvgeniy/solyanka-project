export function validateRegistration(values) {
  const errors = {}
  for (const name of ['email', 'username', 'password', 'password-confirm']) {
    if (!values[name]?.trim()) errors[name] = 'Обязательное поле'
  }
  if (!errors.email && !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/.test(values.email)) {
    errors.email = 'Введите корректный Email, например name@example.ru'
  }
  if (!errors.username && (values.username.length < 3 || values.username.length > 255)) errors.username = 'Логин должен содержать от 3 до 255 символов'
  if (!errors.password && (values.password.length < 8 || !/[A-Za-z]/.test(values.password) || !/[0-9]/.test(values.password))) {
    errors.password = 'Пароль должен содержать минимум 8 символов, латинские буквы и цифры'
  }
  if (!errors['password-confirm'] && values.password !== values['password-confirm']) errors['password-confirm'] = 'Пароли не совпадают'
  return errors
}

export function mountRegistration(form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const values = Object.fromEntries(new FormData(form))
    values.email = values.email.trim()
    values.username = values.username.trim()
    const errors = validateRegistration(values)
    for (const name of ['email', 'username', 'password', 'password-confirm']) {
      form.elements.namedItem(name).setAttribute('aria-invalid', String(Boolean(errors[name])))
      form.querySelector(`#error-${name}`).textContent = errors[name] || ''
    }
    if (Object.keys(errors).length) {
      form.elements.namedItem(Object.keys(errors)[0]).focus()
      return
    }
    const button = form.querySelector('[type=submit]')
    const alert = form.querySelector('#registration-error')
    button.disabled = true
    alert.textContent = ''
    try {
      // Keep the live form (including passwords) when Keycloak returns validation errors.
      const response = await fetch(form.action, {
        method: 'POST', body: new URLSearchParams(values), credentials: 'same-origin', redirect: 'manual',
      })
      if (response.type === 'opaqueredirect') {
        const target = sessionStorage.getItem('solyanka.registrationReturn')
        if (!target) throw new Error('Missing return URL')
        window.location.assign(target)
        return
      }
      if (!response.ok) throw new Error('server')
      const page = new DOMParser().parseFromString(await response.text(), 'text/html')
      const retry = page.querySelector('#kc-register-form')
      if (retry) {
        form.action = retry.action
        for (const name of ['email', 'username', 'password', 'password-confirm']) {
          const error = page.querySelector(`#error-${name}`)?.textContent || ''
          form.querySelector(`#error-${name}`).textContent = error
          form.elements.namedItem(name).setAttribute('aria-invalid', String(Boolean(error)))
        }
        alert.textContent = page.querySelector('.alert-error, .alert-danger, .pf-m-danger')?.textContent?.trim() || 'Не удалось зарегистрироваться. Проверьте данные формы.'
      } else {
        window.location.assign(response.url)
      }
    } catch {
      alert.textContent = 'Не удалось зарегистрироваться. Попробуйте ещё раз. Введённые данные сохранены.'
    } finally {
      button.disabled = false
    }
  })
}

if (typeof document !== 'undefined') {
  const form = document.querySelector('#kc-register-form')
  if (form) mountRegistration(form)
}
