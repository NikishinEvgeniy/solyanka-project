import { useKeycloak } from '@react-keycloak/web'

function App() {
    const { keycloak, initialized } = useKeycloak()
    if (!initialized) return <div>Получение токена</div>
    return (
        <div>
            <h1>Солянка</h1>
            <p>Главная страница (в работе)</p>
            <p>Имя пользователя: {keycloak.tokenParsed?.preferred_username}</p>
            <button onClick={() => keycloak.logout()}>Выйти</button>
        </div>
    )
}

export default App