import { IngredientsList } from './IngredientsList';

const RecipeCard = () => (
    <div className="recipe-card recipe-main-info">
        <div className="image-placeholder" />
        <div className="ingredients-section">
            <div className="recipe-header-title">
                <h1 className="recipe-title">Название рецепта</h1>
            </div>
            <IngredientsList items={[{ name: 'Яблоко', amount: '1 шт' }]} />
        </div>
    </div>
);

export default RecipeCard;