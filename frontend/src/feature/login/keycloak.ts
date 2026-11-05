import Keycloak, { type KeycloakInitOptions } from 'keycloak-js'

const keycloak = new Keycloak({
  url: 'http://keycloak:9090',
  realm: 'solyanka',
  clientId: 'solyanka-frontend',
})

export const keycloakInitOptions: KeycloakInitOptions = {
  onLoad: 'login-required',
  pkceMethod: 'S256',
  checkLoginIframe: false,
}

export default keycloak
