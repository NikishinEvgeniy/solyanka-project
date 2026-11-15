import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import { useRecipe } from '../recipe/hooks/useRecipe'
import type { RecipeData } from '../recipe/model/Recipe'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { validate } from './recipeEditValidation'
import type { Errors } from './recipeEditValidation'
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
  const [image, setImage] = useState<File>()
  const [errors, setErrors] = useState<Errors>({})
  const fileInput = useRef<HTMLInputElement>(null)
  function submit(event: FormEvent) {
    event.preventDefault()
    const validation = validate(title, description, image)
    setErrors(validation)
  }
  function fieldError(name: string) {
    return errors[name] && <p className="edit-error" id={`error-${name}`} role="alert">{errors[name]}</p>
  }
  return <div className="recipe-edit"><Header /><main className="edit-main">
    <h1>Редактирование рецепта</h1>
      <form onSubmit={submit} noValidate><div className="edit-grid"><div>
        <fieldset className="edit-panel"><h2>Основная информация</h2>
          <label htmlFor="edit-title">Название рецепта *</label>
          <input id="edit-title" value={title} required placeholder="Название" aria-invalid={!!errors.title} aria-describedby="error-title" onChange={e => setTitle(e.target.value)} />{fieldError('title')}
          <label htmlFor="edit-description">Описание *</label>
          <textarea id="edit-description" value={description} required placeholder="Описание" aria-invalid={!!errors.description} aria-describedby="error-description" onChange={e => setDescription(e.target.value)} />{fieldError('description')}
          {recipe.image_url && <img src={recipe.image_url} alt="Текущее фото блюда" style={{ maxWidth: '100%', maxHeight: 240 }} />}
          <div className="edit-upload"><div><strong>Фото блюда</strong><p>{image?.name || 'Файл не выбран. Форматы: JPG, PNG. До 10 МБ'}</p></div>
            <input ref={fileInput} type="file" accept="image/jpeg,image/png" aria-label="Фото блюда" aria-invalid={!!errors.image} aria-describedby="error-image" onChange={e => setImage(e.target.files?.[0])} />
            <button type="button" onClick={() => fileInput.current?.click()}>Выбрать файл</button></div>{fieldError('image')}
        </fieldset>
        <div className="edit-actions"><button className="edit-primary" disabled aria-describedby="edit-unavailable">Сохранить</button><Link to={`/recipes/${id}`}>Отмена</Link></div>
        <p className="edit-notice" id="edit-unavailable" role="status">Сохранение изменений временно недоступно</p>
      </div><aside className="edit-panel"><h2>Данные рецепта</h2><p>Рецепт №{id}</p><hr /></aside></div></form>
  </main><Footer /></div>
}
