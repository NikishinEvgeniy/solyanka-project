import type {Ingredient} from "./Ingredient.ts";

export interface RecipeData {
    id?: string | number;
    title: string;
    description: string;
    ingredients: Ingredient[];
    imageUrl?: string;
    isFavorite?: boolean;
}