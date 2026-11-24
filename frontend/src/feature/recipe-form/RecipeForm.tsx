import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useKeycloak } from '@react-keycloak/web'
import { Link, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { validateRecipe, type FieldErrors } from './validation'
import { RecipePhoto } from './RecipePhoto'
import { fetchRecipes } from '../recipesList/hooks/useRecipes'
import type { IngredientPayload } from '../recipe-edit/recipeEditApi'
import type { RecipeData } from '../recipe/model/Recipe'

import { IngredientsForm, useIngredientsForm } from '../ingredients-form'
import './RecipeForm.css'


type Props = {
  recipe?: RecipeData
  onSave: (token: string, title: string, description: string, image: File | undefined, ingredients: IngredientPayload[]) => Promise<{ id: number }>
}

export default function RecipeForm({ recipe, onSave }: Props) {
  const { keycloak } = useKeycloak()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [title, setTitle] = useState(recipe?.title ?? '')
  const [description, setDescription] = useState(recipe?.description ?? '')
  const [image, setImage] = useState<File>()
  const [errors, setErrors] = useState<FieldErrors>({})
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const submitting = useRef(false)
  const [removedPhoto, setRemovedPhoto] = useState(false)
  const ingredientsForm = useIngredientsForm()

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current || !keycloak.authenticated) return
    setNotice('')
    const validation = validateRecipe(title, description, image)
    setErrors(validation)
    const ingredientsValid = ingredientsForm.validate()
    if (Object.keys(validation).length > 0 || !ingredientsValid) return
    submitting.current = true
    setBusy(true)
    try {
      await keycloak.updateToken(30)
      if (!keycloak.token) throw new Error('Сессия истекла. Войдите снова')
      const normalized = title.trim().toLowerCase()
      if (normalized !== recipe?.title.trim().toLowerCase()) {
        const recipes = await fetchRecipes(keycloak.token)
        if (recipes.some(item => item.id !== recipe?.id && item.title.trim().toLowerCase() === normalized)) {
          setErrors({ title: 'Рецепт с таким названием уже существует' })
          return
        }
      }
      const saved = await onSave(keycloak.token, title, description, image, ingredientsForm.toPayload())
      await queryClient.cancelQueries({ queryKey: ['recipe', String(saved.id)] })
      queryClient.setQueryData(['recipe', String(saved.id)], saved)
      void queryClient.invalidateQueries({ queryKey: ['recipes'] })
      navigate(`/recipes/${saved.id}`)
    } catch (error) {
      if (error instanceof Error && 'status' in error && error.status === 409) {
        setErrors({ title: 'Рецепт с таким названием уже существует' })
      } else {
        setNotice(error instanceof Error ? error.message : 'Ошибка сохранения. Попробуйте ещё раз.')
      }
    } finally {
      submitting.current = false
      setBusy(false)
    }
  }

  const author = keycloak.tokenParsed?.name || keycloak.tokenParsed?.preferred_username || 'Текущий пользователь'
  return <div className="recipe-editor">
    <Header />
    <main className="recipe-editor-main">
      <h1>{recipe ? 'Редактирование рецепта' : 'Создание рецепта'}</h1>
      <form noValidate onSubmit={submit}>
        <div className="recipe-editor-grid">
          <fieldset className="recipe-editor-panel" disabled={busy}>
            <h2>Основная информация</h2>
            <label htmlFor="recipe-title">Название рецепта *</label>
            <input id="recipe-title" maxLength={100} required placeholder="Название" value={title}
              aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? 'title-error' : undefined}
              onChange={event => { setTitle(event.target.value); setErrors(previous => ({ ...previous, title: undefined })) }} />
            {errors.title && <p className="recipe-editor-error" id="title-error" role="alert">{errors.title}</p>}
            <label htmlFor="recipe-description">Описание *</label>
            <textarea id="recipe-description" required placeholder="Описание" value={description}
              aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? 'description-error' : undefined}
              onChange={event => { setDescription(event.target.value); setErrors(previous => ({ ...previous, description: undefined })) }} />
            {errors.description && <p className="recipe-editor-error" id="description-error" role="alert">{errors.description}</p>}
            <RecipePhoto image={image} existingUrl={removedPhoto ? undefined : recipe?.image_url}
              error={errors.image} onChange={file => {
                setImage(file)
                setErrors(previous => ({ ...previous, image: validateRecipe(title, description, file).image }))
              }}
              onRemove={() => {
                setImage(undefined)
                setRemovedPhoto(true)
                setErrors(previous => ({ ...previous, image: undefined }))
              }} />
            {recipe && (image || (removedPhoto && recipe.image_url)) && (
              <p role="status">Изменение фото доступно в форме. Сохранение фото на сервере пока недоступно.</p>
            )}
            {errors.image && <p className="recipe-editor-error" id="image-error" role="alert">{errors.image}</p>}
          </fieldset>
          <aside className="recipe-editor-panel recipe-editor-meta">
            <h2>Данные рецепта</h2><p>Автор: {recipe ? '—' : author}</p>
            <p>Дата создания: {recipe ? '—' : new Date().toLocaleDateString('ru-RU')}</p>
            <hr />
          </aside>
          <IngredientsForm form={ingredientsForm} disabled={busy} className="recipe-editor-ingredients" />
        </div>

        <div className="recipe-editor-actions">
          <button type="submit" disabled={busy}>{busy ? 'Сохранение…' : 'Сохранить'}</button>
          {!busy && <Link to={recipe ? `/recipes/${recipe.id}` : '/recipes'}>Отмена</Link>}
        </div>
      </form>
      {notice && <div className="recipe-editor-notice" role="alert">{notice}</div>}
    </main>
    <Footer />
  </div>
}
