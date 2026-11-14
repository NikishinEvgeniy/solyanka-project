import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak, { keycloakInitOptions } from './library/keycloak/client'
import '@fontsource/brygada-1918/cyrillic-400.css'
import '@fontsource/piazzolla/cyrillic-300.css'
import '@fontsource/piazzolla/cyrillic-700.css'
import './app/global.css'
import App from './app/App'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ReactKeycloakProvider
            authClient={keycloak}
            initOptions={keycloakInitOptions}
        >
            <App />
        </ReactKeycloakProvider>
    </StrictMode>,
)
