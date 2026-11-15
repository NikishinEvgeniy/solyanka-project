import type { RecipeData } from '../model/Recipe';

export const RecipeDescription = ({ recipe }: { recipe: RecipeData }) => (
    <div className="recipe-card description-section">
        <h2>Описание</h2>
        <p className="description-text">{recipe.description}</p>
    </div>
);

export default RecipeDescription;