import RecipePageContent from './page/RecipePageContent.tsx';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './RecipePage.css';

export const RecipePage = () => {
    return (
        <div className="recipe-page-wrapper">
            <Header />
            <RecipePageContent />
            <Footer />
        </div>
    );
};

export default RecipePage;