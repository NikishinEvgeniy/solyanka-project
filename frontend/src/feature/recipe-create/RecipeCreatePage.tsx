import { useKeycloak } from '@react-keycloak/web'
import RecipeForm from '../recipe-form/RecipeForm'
import { saveRecipe } from './recipeApi'

export default function RecipeCreatePage() {
  const { keycloak, initialized } = useKeycloak()
  if (!initialized) return <div className="auth-loader">Проверка авторизации…</div>
  if (!keycloak.authenticated) return <div className="auth-loader"><div>
    <p>Для добавления рецепта необходимо войти</p>
    <button type="button" onClick={() => void keycloak.login({ redirectUri: window.location.href })}>Войти</button>
  </div></div>
  return <RecipeForm onSave={saveRecipe} />
}
