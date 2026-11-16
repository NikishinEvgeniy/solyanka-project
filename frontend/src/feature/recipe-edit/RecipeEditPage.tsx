import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useKeycloak } from '@react-keycloak/web'
import { useRecipe } from '../recipe/hooks/useRecipe'
import type { RecipeData } from '../recipe/model/Recipe'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { validate } from './recipeEditValidation'
import type { Errors } from './recipeEditValidation'
import { editRecipe, RecipeEditError } from './recipeEditApi'
import './RecipeEditPage.css'

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
  if (isError) return <main><p role="alert">{error.message}</p><button onClick={() => void refetch()}>Повторить</button></main>
  if (!data) return <p role="alert">Рецепт не найден</p>
  return <Editor id={id} recipe={data} />
}
function Editor({ id, recipe }: { id: string; recipe: RecipeData }) {
  const [title, setTitle] = useState(recipe.title)
  const [description, setDescription] = useState(recipe.description)
  const [errors, setErrors] = useState<Errors>({})
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const submitting = useRef(false)
  const { keycloak } = useKeycloak()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  async function submit(event: FormEvent) {
    event.preventDefault()
    if (submitting.current) return
    setNotice('')
    const validation = validate(title, description)
    setErrors(validation)
    if (Object.keys(validation).length) return
    submitting.current = true
    setBusy(true)
    try {
      if (!keycloak.authenticated) throw new RecipeEditError(401)
      try {
        await keycloak.updateToken(30)
      } catch {
        throw new RecipeEditError(401)
      }
      if (!keycloak.token) throw new RecipeEditError(401)
      const saved = await editRecipe(keycloak.token, id, title, description)
      await queryClient.cancelQueries({ queryKey: ['recipe', id] })
      queryClient.setQueryData(['recipe', id], saved)
      void queryClient.invalidateQueries({ queryKey: ['recipes'] })
      navigate(`/recipes/${id}`)
    } catch (error) {
      if (error instanceof RecipeEditError && error.status === 409) {
        setErrors({ title: error.message })
      } else {
        setNotice(error instanceof RecipeEditError ? error.message : 'Ошибка сохранения. Попробуйте ещё раз.')
      }
    } finally {
      submitting.current = false
      setBusy(false)
    }
  }
  function fieldError(name: string) {
    return errors[name] && <p className="edit-error" id={`error-${name}`} role="alert">{errors[name]}</p>
  }
  return <div className="recipe-edit"><Header /><main className="edit-main">
    <h1>Редактирование рецепта</h1>
      <form onSubmit={submit} noValidate><div className="edit-grid"><div>
        <fieldset className="edit-panel" disabled={busy}><h2>Основная информация</h2>
          <label htmlFor="edit-title">Название рецепта *</label>
          <input id="edit-title" value={title} required placeholder="Название" aria-invalid={!!errors.title} aria-describedby="error-title" onChange={e => setTitle(e.target.value)} />{fieldError('title')}
          <label htmlFor="edit-description">Описание *</label>
          <textarea id="edit-description" value={description} required placeholder="Описание" aria-invalid={!!errors.description} aria-describedby="error-description" onChange={e => setDescription(e.target.value)} />{fieldError('description')}
          {recipe.image_url && <img src={recipe.image_url} alt="Текущее фото блюда" style={{ maxWidth: '100%', maxHeight: 240 }} />}
          <div className="edit-upload"><div><strong>Фото рецепта</strong></div></div>
        </fieldset>
        <div className="edit-actions"><button type="submit" className="edit-primary" disabled={busy}>{busy ? 'Сохранение…' : 'Сохранить'}</button>{!busy && <Link to={`/recipes/${id}`}>Отмена</Link>}</div>
        {notice && <p className="edit-notice" role="alert">{notice}</p>}
      </div><aside className="edit-panel"><h2>Данные рецепта</h2><p>Рецепт №{id}</p><hr /></aside></div></form>
  </main><Footer /></div>
}
