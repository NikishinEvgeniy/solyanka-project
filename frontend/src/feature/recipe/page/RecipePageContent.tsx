import RecipeActions from '../card/RecipeActions.tsx';
import RecipeCard from '../card/RecipeCard.tsx';
import RecipeDescription from '../card/RecipeDescription.tsx';
import { useRecipe } from '../hooks/useRecipe';
import { useNavigate } from 'react-router-dom';
import styles from '../RecipePage.module.css';

type Props = { id?: string };

const RecipePageContent = ({ id }: Props) => {
    const navigate = useNavigate();
    const { data: recipe, isLoading, isError, error } = useRecipe(id);

    if (isLoading) return <main className={styles['recipe-main']}>Загрузка...</main>;

    if (isError) {
        const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
        return (
            <main className={styles['recipe-main']}>
                <div className="recipe-menu__error" role="alert">{message}</div>
            </main>
        );
    }

    if (!recipe) return <main className={styles['recipe-main']}>Рецепт не найден</main>;

    return (
        <main className={styles['recipe-main']}>
            <RecipeActions recipeId={recipe.id} onEdit={() => navigate(`/recipes/${recipe.id}/edit`)} />
            <RecipeCard recipe={recipe} />
            <RecipeDescription recipe={recipe} />
        </main>
    );
};

export default RecipePageContent;
