import logo from '../assets/images/logo.png'

type HeaderProps = {
  onLogout: () => void
}

function Header({ onLogout }: HeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Солянка — главная страница">
        <img src={logo} alt="Солянка" />
      </a>

      <nav className="main-nav" aria-label="Основная навигация">
        <a href="/recipes">Все рецепты</a>
        <a href="/my-recipes">Мои рецепты</a>
      </nav>

      <nav className="user-nav" aria-label="Навигация пользователя">
        <a className="favorites-link" href="/favorites" aria-label="Избранные рецепты">
          <svg className="heart-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
          </svg>
          <span aria-hidden="true">X</span>
        </a>
        <a href="/profile">Профиль</a>
        <button className="nav-button" type="button" onClick={onLogout}>
          Выйти
        </button>
      </nav>
    </header>
  )
}

export default Header
