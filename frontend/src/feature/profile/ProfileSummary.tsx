type Props = { login?: string; email?: string; photoUrl?: string }

function loginInitials(login = '') {
  const [firstPart, secondPart] = login.match(/[\p{L}\p{N}]+/gu) ?? []
  if (!firstPart) return '—'
  const first = Array.from(firstPart)
  const second = secondPart ? Array.from(secondPart)[0] : first[1]
  return (first[0] + (second ?? '')).toLocaleUpperCase('ru')
}

export default function ProfileSummary({ login, email, photoUrl }: Props) {
  return (
    <section className="profile-panel profile-summary" aria-label="Карточка пользователя">
      {photoUrl
        ? <img className="profile-avatar" src={photoUrl} alt="Предпросмотр аватара" />
        : <span className="profile-initials" aria-hidden="true">{loginInitials(login)}</span>}
      <h2>{login || 'Логин не указан'}</h2>
      <p>{email || 'Почта не указана'}</p>
      <p className="profile-member-since">В базе с 00.00.00</p>
    </section>
  )
}
