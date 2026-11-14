// recipesList/card/RecipesList.tsx
import type { Recipe } from '../api/RecipesListApi'
import { RecipeView } from './RecipeView'

type RecipesListProps = {
  recipes: Recipe[]
  favorites: Set<string>
  onToggleFavorite: (id: string) => void
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
              className="recipe-card recipe-card--skeleton"
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