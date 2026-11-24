import { useKeycloak } from '@react-keycloak/web'
import { useEffect, useState } from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import ProfileSummary from './ProfileSummary'
import ProfileDetails from './ProfileDetails'
import './ProfilePage.css'

function ProfileContent({ login, email }: { login?: string; email?: string }) {
  const [photo, setPhoto] = useState<{ file: File; url: string }>()
  useEffect(() => () => {
    if (photo) URL.revokeObjectURL(photo.url)
  }, [photo])

  return (
    <div className="profile-layout">
      <ProfileSummary login={login} email={email} photoUrl={photo?.url} />
      <ProfileDetails login={login} email={email} file={photo?.file}
        onPhotoSelected={file => setPhoto({ file, url: URL.createObjectURL(file) })} />
    </div>
  )
}

export default function ProfilePage() {
  const { keycloak, initialized } = useKeycloak()
  const login = keycloak.tokenParsed?.preferred_username?.trim()
  const email = keycloak.tokenParsed?.email?.trim()

  return (
    <div className="profile-page">
      <Header />
      <main className="profile-main">
        <h1>Профиль пользователя</h1>
        {!initialized ? <p role="status">Загрузка профиля…</p> : keycloak.authenticated ? (
          <ProfileContent key={keycloak.subject} login={login} email={email} />
        ) : <button type="button" onClick={() => void keycloak.login()}>Войти в профиль</button>}
      </main>
      <Footer />
    </div>
  )
}
