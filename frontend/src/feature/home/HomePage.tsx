import Footer from '../footer/Footer'
import Header from '../header/Header'
import HomePageContent from './HomePageContent.tsx'

function HomePage() {
  return (
      <div className="home-page">
        <Header />
        <HomePageContent />
        <Footer />
      </div>
  )
}

export default HomePage