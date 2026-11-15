// recipesList/page/RecipesListPageContent.tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  fetchRecipes,
  type RecipesPageResponse,
} from '../api/RecipesListApi'
import { RecipesList } from '../card/RecipesList'
import tomatoImg from '../../../assets/images/error-tomato.svg'
import '../RecipesListPage.css'
const PAGE_SIZE = 6

export function RecipesListPageContent() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState<RecipesPageResponse | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    fetchRecipes({ page, pageSize: PAGE_SIZE })
      .then((res) => {
        if (cancelled) return
        setData(res)
        setStatus('idle')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [page])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const recipes = data?.items ?? []
  const totalPages = data?.totalPages ?? 1
  const isEmpty = status === 'idle' && data !== null && recipes.length === 0
  const showGrid = status !== 'error' && !isEmpty
  const isLoadingFirst = status === 'loading' && data === null

  return (
    <main className="catalog-main">
      <div className="catalog-header">
        <h1 className="catalog-title">Каталог рецептов</h1>
        <Link className="add-recipe-btn" to="/recipes/new">
          Добавить
        </Link>
      </div>

      {status === 'error' && (
        <div className="error-state" role="alert">
          <div className="error-content">
            <img src={tomatoImg} alt="Ошибка" className="error-tomato" />
            <div className="error-text">
              <h2>Что-то пошло не так</h2>
              <p>
                Попробуйте пока что приготовить
                <br />
                хотя-бы бутерброд
              </p>
            </div>
          </div>
        </div>
      )}

      {isEmpty && (
        <div className="status-banner status-empty" role="status">
          Рецепты не найдены
        </div>
      )}

      {showGrid && (
        <RecipesList
          recipes={recipes}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          isLoading={isLoadingFirst}
          skeletonCount={PAGE_SIZE}
        />
      )}

      {data !== null && totalPages > 1 && (
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

function buildPageList(current: number, total: number): Array<number | '…'> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set<number>([1, total, current - 1, current, current + 1])
  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b)
  const result: Array<number | '…'> = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('…')
    result.push(sorted[i])
  }
  return result
}