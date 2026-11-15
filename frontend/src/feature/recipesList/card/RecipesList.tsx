// recipesList/card/RecipesList.tsx
import type { Recipe } from '../model/Recipe'
import { RecipeView } from './RecipeView'

type RecipesListProps = {
  recipes: Recipe[]
  favorites: Set<number> // Изменено на number
  onToggleFavorite: (id: number) => void // Изменено на number
  isLoading?: boolean
  skeletonCount?: number
}

export function RecipesList({
  recipes,
  favorites,
  onToggleFavorite,
  isLoading = false,
  skeletonCount = 6,
}: RecipesListProps) {
  return (
    <section className="recipes-grid" role="region" aria-label="Список рецептов">
      {isLoading && recipes.length === 0
        ? Array.from({ length: skeletonCount }).map((_, i) => (
            <article
              key={`skeleton-${i}`}
              className="recipe-card-list recipe-card-list--skeleton"
              aria-hidden="true"
            />
          ))
        : recipes.map((recipe) => (
            <RecipeView
              key={recipe.id}
              recipe={recipe}
              isFavorite={favorites.has(recipe.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
    </section>
  )
}