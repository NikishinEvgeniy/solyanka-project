import { useParams } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import { useRecipe } from '../recipe/hooks/useRecipe'
import RecipeForm from '../recipe-form/RecipeForm'
import { editRecipe } from './recipeEditApi'
export default function RecipeEditPage() {
  const { id = '' } = useParams()
  const { keycloak, initialized } = useKeycloak()
  if (!initialized) return <p role="status">Проверка авторизации…</p>
  if (!keycloak.authenticated) return <main><p>Для редактирования рецепта необходимо войти</p>
    <button onClick={() => void keycloak.login({ redirectUri: window.location.href })}>Войти</button></main>
  return <LoadedEditor key={id} id={id} />
}
function LoadedEditor({ id }: { id: string }) {
  const { data, isLoading, isError, error, refetch } = useRecipe(id)
  if (isLoading) return <p role="status">Загрузка рецепта…</p>
  if (isError) return <main><p className="recipe-editor-error" role="alert">{error.message}</p><button onClick={() => void refetch()}>Повторить</button></main>
  if (!data) return <p role="alert">Рецепт не найден</p>
  return <RecipeForm recipe={data} onSave={(token, title, description, image, ingredients) =>
    editRecipe(token, id, title, description, ingredients, image)} />
}
