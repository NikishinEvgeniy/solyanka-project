// import { IngredientsList } from './IngredientsList';
import type { RecipeData } from '../model/Recipe';

type Props = { recipe: RecipeData };

const RecipeCard = ({ recipe }: Props) => (
    <div className="recipe-card recipe-main-info">
        <div className="image-placeholder" />
        <div className="ingredients-section">
            <div className="recipe-header-title">
                <h1 className="recipe-title">{recipe.title}</h1>
            </div>
            {/*<IngredientsList items={recipe.ingredients} />*/}
        </div>
    </div>
);

export default RecipeCard;