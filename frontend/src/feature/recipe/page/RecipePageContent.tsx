import RecipeActions from '../card/RecipeActions.tsx';
import RecipeCard from '../card/RecipeCard.tsx';
import RecipeDescription from '../card/RecipeDescription.tsx';
import { useRecipe } from '../hooks/useRecipe';

type Props = { id?: string };

const RecipePageContent = ({ id }: Props) => {
    const { data: recipe, isLoading, isError, error } = useRecipe(id);

    if (isLoading) return <main className="recipe-main">Загрузка...</main>;

    if (isError) {
        const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
        return (
            <main className="recipe-main">
                <div className="recipe-menu__error" role="alert">{message}</div>
            </main>
        );
    }

    if (!recipe) return <main className="recipe-main">Рецепт не найден</main>;

    return (
        <main className="recipe-main">
            <RecipeActions />
            <RecipeCard recipe={recipe} />
            <RecipeDescription recipe={recipe} />
        </main>
    );
};

export default RecipePageContent;