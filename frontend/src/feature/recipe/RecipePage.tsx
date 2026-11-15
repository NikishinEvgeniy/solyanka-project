import { useParams } from 'react-router-dom';
import RecipePageContent from './page/RecipePageContent.tsx';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import styles from './RecipePage.module.css';

export const RecipePage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className={styles['recipe-page-wrapper']}>
            <Header />
            <RecipePageContent id={id} />
            <Footer />
        </div>
    );
};

export default RecipePage;
