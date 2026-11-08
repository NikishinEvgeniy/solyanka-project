import appleLeft from '../assets/images/apple-left.svg'
import appleRight from '../assets/images/apple-right.svg'

function Footer() {
  return (
    <footer className="site-footer">
      <img className="footer-apple" src={appleLeft} alt="" />
      <div className="footer-content">
        <a href="/privacy">Политика конфиденциальности</a>
        <a href="/terms">Пользовательское соглашение</a>
        <p>© 2026 «Солянка». Все права защищены.</p>
      </div>
      <img className="footer-apple" src={appleRight} alt="" />
    </footer>
  )
}

export default Footer
