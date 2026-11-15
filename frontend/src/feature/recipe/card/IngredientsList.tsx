import type {Ingredient} from "../model/Ingredient.ts";
import styles from '../RecipePage.module.css';

export const IngredientsList = ({items}: { items: Ingredient[] }) => (
    <>
        <h2 className={styles['ingredients-title']}>Ингредиенты</h2>
        <ul className={styles['ingredients-list']}>
            {items.map((ing, i) => (
                <li key={`${ing.name}-${i}`}>
                    <span>{ing.name}</span>
                    <span>{ing.amount}</span>
                </li>
            ))}
        </ul>
    </>
);
