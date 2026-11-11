import { useEffect, useState } from 'react'
import './auth.css'

type RegistrationNoticeProps = {
  authenticated: boolean
}

function RegistrationNotice({ authenticated }: RegistrationNoticeProps) {
  const [registrationSuccess] = useState(() => new URLSearchParams(window.location.search).get('registration') === 'success')

  useEffect(() => {
    if (authenticated && registrationSuccess) {
      const url = new URL(window.location.href)
      url.searchParams.delete('registration')
      window.history.replaceState(window.history.state, '', url)
    }
  }, [authenticated, registrationSuccess])

  if (!registrationSuccess || !authenticated) return null

  return <div className="registration-success" role="status">Регистрация прошла успешно!</div>
}

export default RegistrationNotice
