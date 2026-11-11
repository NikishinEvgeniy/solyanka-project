import { useKeycloak } from '@react-keycloak/web'
import HomePage from '../pages/home/HomePage'
import RegistrationNotice from '../library/keycloak/RegistrationNotice'

function App() {
  const { keycloak, initialized } = useKeycloak()

  if (!initialized) {
    return (
      <div className="auth-loader" role="status">
        Загружаем «Солянку»…
      </div>
    )
  }

  return <>
    <RegistrationNotice authenticated={Boolean(keycloak.authenticated)} />
    <HomePage onLogout={() => void keycloak.logout()} />
  </>
}

export default App
