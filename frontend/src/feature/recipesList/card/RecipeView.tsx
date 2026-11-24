// recipesList/card/RecipeView.tsx
import { Link } from 'react-router-dom'
import type { Recipe } from '../model/Recipe'
import RecipeImage from '../../recipe/card/RecipeImage'

type RecipeViewProps = {
  recipe: Recipe
  isFavorite: boolean
  onToggleFavorite: (id: number) => void // Изменено на number
}

export function RecipeView({ recipe, isFavorite, onToggleFavorite }: RecipeViewProps) {
  return (
    <article className="recipe-card-list">
      <div className="recipe-card-list-header">
        <h2 className="recipe-card-list-title">
          <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
        </h2>
        <button
          className={`card-favorite-btn${isFavorite ? ' is-active' : ''}`}
          type="button"
          aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(recipe.id)} // Передаем number
        >
          <svg className="card-heart-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
          </svg>
        </button>
      </div>
      <Link to={`/recipes/${recipe.id}`} className="recipe-image-wrapper" aria-label={recipe.title}>
        <RecipeImage src={recipe.imageUrl} title={recipe.title} lazy />
      </Link>
    </article>
  )
}
