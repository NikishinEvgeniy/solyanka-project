interface Props {
    onBack?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export const RecipeActions = ({ onBack, onEdit, onDelete }: Props) => (
    <div className="top-actions">
        <button className="btn btn-back" onClick={onBack}>Назад</button>
        <div className="btn-actions">
            <button className="btn btn-edit" onClick={onEdit}>Редактировать</button>
            <button className="btn btn-delete" onClick={onDelete}>Удалить</button>
        </div>
    </div>
);

export default RecipeActions;