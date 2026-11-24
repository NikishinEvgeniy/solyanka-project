// recipesList/page/RecipesListPageContent.tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecipes } from '../hooks/useRecipes'
import { RecipesList } from '../card/RecipesList'
import RecipesNotFound from '../../recipe/RecipesNotFound'
import tomatoImage from '../../../assets/images/error-leaves.svg'
import '../RecipesListPage.css'

const PAGE_SIZE = 6

export function RecipesListPageContent() {
  const { data: allRecipes, isLoading, isError, refetch } = useRecipes()

  const [selectedPage, setPage] = useState(1)
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  // --- КЛИЕНТСКАЯ ПАГИНАЦИЯ ---
  const totalItems = allRecipes?.length ?? 0
  const totalPages = Math.ceil(totalItems / PAGE_SIZE)

  const page = Math.min(selectedPage, totalPages || 1)
  const startIndex = (page - 1) * PAGE_SIZE
  const currentRecipes = allRecipes?.slice(startIndex, startIndex + PAGE_SIZE) ?? []

  const isEmpty = !isLoading && !isError && totalItems === 0
  const showGrid = !isError && !isEmpty
  const isLoadingFirst = isLoading && !allRecipes

  const buildPageList = (current: number, total: number): Array<number | '…'> => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
    const pages = new Set<number>([1, total, current - 1, current, current + 1])
    const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
    const result: Array<number | '…'> = []
    for (let i = 0; i < sorted.length; i++) {
      if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('…')
      result.push(sorted[i])
    }
    return result
  }

  if (isError) {
    return (
      <main className="catalog-error" aria-label="Каталог рецептов">
        <section className="catalog-error-band" role="alert">
          <img src={tomatoImage} alt="" />
          <div>
            <h1>Что-то пошло не так</h1>
            <p>Попробуйте пока что приготовить<br />хотя-бы бутерброд</p>
            <button type="button" onClick={() => void refetch()}>Попробовать снова</button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="catalog-main">
      <div className="catalog-header">
        <h1 className="catalog-title">Каталог рецептов</h1>
        <Link className="add-recipe-btn" to="/recipes/new">
          Добавить
        </Link>
      </div>

      {isEmpty && <RecipesNotFound />}

      {showGrid && (
        <RecipesList
          recipes={currentRecipes}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          isLoading={isLoadingFirst}
          skeletonCount={PAGE_SIZE}
        />
      )}

      {totalPages > 1 && (
        <nav className="pagination" aria-label="Навигация по страницам">
          {buildPageList(page, totalPages).map((item, idx) =>
            item === '…' ? (
              <span key={`e-${idx}`} className="pagination-ellipsis">
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                className={`pagination-item${item === page ? ' is-active' : ''}`}
                onClick={() => setPage(item)}
                aria-current={item === page ? 'page' : undefined}
              >
                {item}
              </button>
            ),
          )}
        </nav>
      )}
    </main>
  )
}
