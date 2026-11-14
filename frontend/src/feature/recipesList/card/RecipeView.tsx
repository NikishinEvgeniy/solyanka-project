// recipesList/card/RecipeView.tsx
import type { Recipe } from '../api/RecipesListApi'

type RecipeViewProps = {
  recipe: Recipe
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
}

export function RecipeView({ recipe, isFavorite, onToggleFavorite }: RecipeViewProps) {
  return (
    <article className="recipe-card">
      <div className="recipe-card-header">
        <h2 className="recipe-card-title">
          <a href={`/recipes/${recipe.id}`}>{recipe.title}</a>
        </h2>
        <button
          className={`card-favorite-btn${isFavorite ? ' is-active' : ''}`}
          type="button"
          aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(recipe.id)}
        >
          <svg className="card-heart-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
          </svg>
        </button>
      </div>
      <a href={`/recipes/${recipe.id}`} className="recipe-image-wrapper">
        {recipe.imageUrl && (
          <img
            className="recipe-image"
            src={recipe.imageUrl}
            alt={recipe.title}
            loading="lazy"
          />
        )}
      </a>
    </article>
  )
}