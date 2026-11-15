import { useParams } from 'react-router-dom';
import RecipePageContent from './page/RecipePageContent.tsx';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './RecipePage.css';

export const RecipePage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="recipe-page-wrapper">
            <Header />
            <RecipePageContent id={id} />
            <Footer />
        </div>
    );
};

export default RecipePage;