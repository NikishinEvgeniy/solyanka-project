// import { IngredientsList } from './IngredientsList';
import type { RecipeData } from '../model/Recipe';
import styles from '../RecipePage.module.css';

type Props = { recipe: RecipeData };

const RecipeCard = ({ recipe }: Props) => (
    <div className={`${styles['recipe-card']} ${styles['recipe-main-info']}`}>
        <div className={styles['image-placeholder']}>
            {recipe.image_url && <img src={recipe.image_url} alt={recipe.title} />}
        </div>
        <div className={styles['ingredients-section']}>
            <div className={styles['recipe-header-title']}>
                <h1 className={styles['recipe-title']}>{recipe.title}</h1>
            </div>
            {/*<IngredientsList items={recipe.ingredients} />*/}
        </div>
    </div>
);

export default RecipeCard;
