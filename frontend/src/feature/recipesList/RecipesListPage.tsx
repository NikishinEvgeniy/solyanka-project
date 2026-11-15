// RecipesListPage.tsx
import { RecipesListPageContent } from './page/RecipesListPageContent';
import Header from '../header/Header';
import Footer from '../footer/Footer';

export const RecipesListPage = () => {
  return (
    <div className="recipes-page">
     <Header/>
      <RecipesListPageContent />
      <Footer />
    </div>
  );
};
export default RecipesListPage;