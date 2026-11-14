import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak, { keycloakInitOptions } from './feature/login/keycloak'
import '@fontsource/brygada-1918/cyrillic-400.css'
import '@fontsource/piazzolla/cyrillic-300.css'
import '@fontsource/piazzolla/cyrillic-700.css'
import './index.css'
import App from './App.tsx'

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
