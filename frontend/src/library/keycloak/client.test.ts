import { describe, expect, it } from 'vitest'
import { keycloakInitOptions } from './client'

describe('Keycloak configuration', () => {
  it('перенаправляет неаутентифицированного пользователя на форму входа', () => {
    expect(keycloakInitOptions).toMatchObject({
      onLoad: 'login-required',
      pkceMethod: 'S256',
    })
  })
})
