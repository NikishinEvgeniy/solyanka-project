import { useNavigate } from 'react-router-dom';
import { useDeleteRecipe } from '../hooks/useDeleteRecipe';

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
        <div className="top-actions">
            <button className="btn btn-back" onClick={() => navigate('/recipes')}>Назад</button>
            <div className="btn-actions">
                <button className="btn btn-edit" onClick={onEdit}>Редактировать</button>
                <button className="btn btn-delete" onClick={handleDelete} disabled={isPending}>
                    {isPending ? 'Удаление...' : 'Удалить'}
                </button>
            </div>
            {error && <p className="error">Не удалось удалить рецепт</p>}
        </div>
    );
};

export default RecipeActions;