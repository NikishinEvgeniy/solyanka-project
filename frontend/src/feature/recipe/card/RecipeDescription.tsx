import type { RecipeData } from '../model/Recipe';
import styles from '../RecipePage.module.css';

export const RecipeDescription = ({ recipe }: { recipe: RecipeData }) => (
    <div className={`${styles['recipe-card']} ${styles['description-section']}`}>
        <h2>Описание</h2>
        <p className={styles['description-text']}>{recipe.description}</p>
    </div>
);

export default RecipeDescription;
