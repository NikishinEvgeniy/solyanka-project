// import { IngredientsList } from './IngredientsList';
import type { RecipeData } from '../model/Recipe';
import RecipeImage from './RecipeImage';

type Props = { recipe: RecipeData };

const RecipeCard = ({ recipe }: Props) => (
    <div className="recipe-card recipe-main-info">
        <div className="recipe-detail-image">
            <RecipeImage src={recipe.image_url} title={recipe.title} />
        </div>
        <div className="ingredients-section">
            <div className="recipe-header-title">
                <h1 className="recipe-title">{recipe.title}</h1>
            </div>
            {/*<IngredientsList items={recipe.ingredients} />*/}
        </div>
    </div>
);

export default RecipeCard;
