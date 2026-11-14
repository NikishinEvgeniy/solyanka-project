import Footer from '../components/Footer'
import Header from '../components/Header'

type HomePageProps = {
  onLogout: () => void
}

function HomePage({ onLogout }: HomePageProps) {
  return (
    <div className="home-page">
      <Header onLogout={onLogout} />

      <main>
        <section className="hero" aria-labelledby="home-title">
          <h1 id="home-title" className="hero-title" aria-label="всегда под рукой">
            <span>всегда</span>
            <span className="hero-title-outline" aria-hidden="true">
              всегда под рукой
            </span>
            <span>под рукой</span>
          </h1>
          <p>рецепты, которые находят вас сами</p>
        </section>

        <section className="about" id="project" aria-label="О проекте">
          <p>
            Устали листать десятки рецептов в поисках нужного? Здесь всё устроено иначе. Каждый ингредиент
            в рецепте кликабелен и ведёт к списку всех блюд, где он используется. А встроенный фильтр поможет
            мгновенно подобрать рецепт из того, что уже есть у вас на кухне. Готовьте с удовольствием — без
            лишнего поиска!
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
