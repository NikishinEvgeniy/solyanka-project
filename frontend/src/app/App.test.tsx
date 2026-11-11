import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

const useKeycloakMock = vi.fn()

vi.mock('@react-keycloak/web', () => ({
  useKeycloak: () => useKeycloakMock(),
}))

describe('App', () => {
  beforeEach(() => {
    useKeycloakMock.mockReset()
    window.history.replaceState({}, '', '/')
  })

  it('показывает уведомление после регистрации только при активной сессии и очищает URL', () => {
    window.history.replaceState({}, '', '/?registration=success')
    useKeycloakMock.mockReturnValue({ initialized: true, keycloak: { authenticated: true, logout: vi.fn() } })
    render(<App />)
    expect(screen.getByRole('status')).toHaveTextContent('Регистрация прошла успешно!')
    expect(window.location.search).toBe('')
  })

  it('не сообщает об успехе регистрации до аутентификации', () => {
    window.history.replaceState({}, '', '/?registration=success')
    useKeycloakMock.mockReturnValue({ initialized: false, keycloak: {} })
    render(<App />)
    expect(screen.queryByText('Регистрация прошла успешно!')).not.toBeInTheDocument()
  })

  it('показывает загрузку, пока Keycloak проверяет авторизацию', () => {
    useKeycloakMock.mockReturnValue({ initialized: false, keycloak: {} })

    render(<App />)

    expect(screen.getByRole('status')).toHaveTextContent('Загружаем «Солянку»')
    expect(screen.queryByRole('heading', { name: 'всегда под рукой' })).not.toBeInTheDocument()
  })

  it('показывает главную после успешной инициализации Keycloak', () => {
    useKeycloakMock.mockReturnValue({ initialized: true, keycloak: { logout: vi.fn() } })

    render(<App />)

    expect(screen.getByRole('heading', { name: 'всегда под рукой' })).toBeInTheDocument()
  })
})
