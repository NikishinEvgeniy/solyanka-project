import Keycloak, { type KeycloakInitOptions } from 'keycloak-js'

const keycloak = new Keycloak({
  url: 'http://keycloak:9090',
  realm: 'solyanka',
  clientId: 'solyanka-frontend',
})

// Show success only after Keycloak has established an authenticated session.
const initialize = keycloak.init.bind(keycloak)
keycloak.init = async (options) => {
  const authenticated = await initialize(options)
  const url = new URL(window.location.href)
  if (authenticated && url.searchParams.get('registration') === 'success') {
    url.searchParams.delete('registration')
    window.history.replaceState(window.history.state, '', url)
    const notice = document.createElement('div')
    notice.setAttribute('role', 'status')
    notice.textContent = 'Аккаунт успешно зарегистрирован'
    Object.assign(notice.style, {
      position: 'fixed', top: '100px', right: '16px', zIndex: '1000',
      padding: '16px 24px', background: '#fff', color: '#493629',
      border: '2px solid #9ab66e', borderRadius: '16px', maxWidth: '90vw',
    })
    document.body.append(notice)
    window.setTimeout(() => notice.remove(), 4000)
  }
  return authenticated
}

export const keycloakInitOptions: KeycloakInitOptions = {
  onLoad: 'login-required',
  pkceMethod: 'S256',
  checkLoginIframe: false,
}

export default keycloak
