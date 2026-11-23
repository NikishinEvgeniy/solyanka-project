import PhotoField from '../../library/photo/PhotoField'
import { useState } from 'react'
import { validatePhoto } from '../../library/photo/validatePhoto'

type Props = { login?: string; email?: string; file?: File; onPhotoSelected: (file: File) => void }

export default function ProfileDetails({ login, email, file, onPhotoSelected }: Props) {
  const [error, setError] = useState<string>()

  function selectPhoto(selected?: File) {
    if (!selected) return
    const message = validatePhoto(selected)
    setError(message)
    if (!message) onPhotoSelected(selected)
  }

  return (
    <section className="profile-panel profile-details" aria-labelledby="profile-details-title">
      <h2 id="profile-details-title">Личные данные</h2>
      <dl>
        <div>
          <dt>Электронная почта</dt>
          <dd>{email || 'Не указана'}</dd>
        </div>
        <div>
          <dt>Логин</dt>
          <dd>{login || 'Не указан'}</dd>
        </div>
      </dl>
      <PhotoField id="profile-image" title="Фото аватара" file={file}
        onSelect={selectPhoto} errorId={error ? 'profile-photo-error' : undefined} />
      {error && <p className="profile-photo-error" id="profile-photo-error" role="alert">{error}</p>}
      <button className="profile-save" type="button" disabled>Сохранить изменения</button>
    </section>
  )
}
