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
