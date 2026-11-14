import type {Ingredient} from "../model/Ingredient.ts";

export const IngredientsList = ({items}: { items: Ingredient[] }) => (
    <>
        <h2 className="ingredients-title">Ингредиенты</h2>
        <ul className="ingredients-list">
            {items.map((ing, i) => (
                <li key={`${ing.name}-${i}`}>
                    <span>{ing.name}</span>
                    <span>{ing.amount}</span>
                </li>
            ))}
        </ul>
    </>
);