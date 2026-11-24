import RecipeActions from '../card/RecipeActions.tsx';
import RecipeCard from '../card/RecipeCard.tsx';
import RecipeDescription from '../card/RecipeDescription.tsx';
import { useRecipe } from '../hooks/useRecipe';
import RecipesNotFound from '../RecipesNotFound';

type Props = { id?: string };

const RecipePageContent = ({ id }: Props) => {
    const { data: recipe, isPending, isError, error } = useRecipe(id);

    if (isPending) return <main className="recipe-main">Загрузка...</main>;

    if (isError) {
        const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
        return (
            <main className="recipe-main">
                <div className="recipe-menu__error" role="alert">{message}</div>
            </main>
        );
    }

    if (!recipe) return <main className="recipe-missing-main"><RecipesNotFound /></main>;

    return (
        <main className="recipe-main">
            <RecipeActions recipeId={Number(id)} />
            <RecipeCard recipe={recipe} />
            <RecipeDescription recipe={recipe} />
        </main>
    );
};

export default RecipePageContent;
