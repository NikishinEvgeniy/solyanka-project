import { useNavigate } from 'react-router-dom';
import { useDeleteRecipe } from '../hooks/useDeleteRecipe';
import styles from '../RecipePage.module.css';

interface Props {
    recipeId: number;
    onEdit?: () => void;
    onDelete?: () => void;
}

export const RecipeActions = ({ recipeId, onEdit, onDelete }: Props) => {
    const navigate = useNavigate();
    const { mutate, isPending, error } = useDeleteRecipe(() => {
        onDelete?.();
        navigate('/recipes');
    });

    const handleDelete = () => {
        if (!confirm('Удалить рецепт?')) return;
        mutate(recipeId);
    };

    return (
        <div className={styles['top-actions']}>
            <button className={`${styles.btn} ${styles['btn-back']}`} onClick={() => navigate('/recipes')}>Назад</button>
            <div className={styles['btn-actions']}>
                <button className={`${styles.btn} ${styles['btn-edit']}`} onClick={onEdit}>Редактировать</button>
                <button className={`${styles.btn} ${styles['btn-delete']}`} onClick={handleDelete} disabled={isPending}>
                    {isPending ? 'Удаление...' : 'Удалить'}
                </button>
            </div>
            {error && <p role="alert">Не удалось удалить рецепт</p>}
        </div>
    );
};

export default RecipeActions;
