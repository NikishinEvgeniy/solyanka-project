import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'

function Header() {
    return (
        <header className="site-header">
            <Link className="brand" to="/" aria-label="Солянка — главная страница">
                <img src={logo} alt="Солянка" />
            </Link>

            <nav className="main-nav" aria-label="Основная навигация">
                <Link to="/recipes">Все рецепты</Link>
                <Link to="/my-recipes">Мои рецепты</Link>
            </nav>

            <nav className="user-nav" aria-label="Навигация пользователя">
                <Link className="favorites-link" to="/favorites" aria-label="Избранные рецепты">
                    <svg className="heart-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
                    </svg>
                    <span aria-hidden="true">X</span>
                </Link>
                <Link to="/profile">Профиль</Link>
                <button className="nav-button" type="button">
                    Выйти
                </button>
            </nav>
        </header>
    )
}

export default Header