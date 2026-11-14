import { useKeycloak } from '@react-keycloak/web'
import HomePage from './pages/HomePage'

function App() {
  const { keycloak, initialized } = useKeycloak()

  if (!initialized) {
    return (
      <div className="auth-loader" role="status">
        Загружаем «Солянку»…
      </div>
    )
  }

  return <HomePage onLogout={() => void keycloak.logout()} />
}

export default App
