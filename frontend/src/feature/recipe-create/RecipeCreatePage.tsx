import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useKeycloak } from '@react-keycloak/web'
import { Link, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { RecipeApiError, saveRecipe, validateRecipe } from './recipeApi'
import type { FieldErrors } from './recipeApi'
import { IngredientsForm, useIngredientsForm } from '../ingredients-form'
import './RecipeCreatePage.css'

export default function RecipeCreatePage() {
  const { keycloak, initialized } = useKeycloak()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File>()
  const [errors, setErrors] = useState<FieldErrors>({})
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const submitting = useRef(false)
  const fileInput = useRef<HTMLInputElement>(null)
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
      if (!keycloak.token) throw new RecipeApiError(401)
      const saved = await saveRecipe(keycloak.token, title, description, image)
      queryClient.setQueryData(['recipe', String(saved.id)], saved)
      void queryClient.invalidateQueries({ queryKey: ['recipes'] })
      navigate(`/recipes/${saved.id}`)
    } catch (error) {
      if (error instanceof RecipeApiError && error.status === 409) {
        setErrors({ title: 'Рецепт с таким названием уже существует' })
      } else {
        setNotice(error instanceof RecipeApiError ? error.message : 'Ошибка сохранения. Попробуйте ещё раз.')
      }
    } finally {
      submitting.current = false
      setBusy(false)
    }
  }

  if (!initialized) return <div className="auth-loader">Проверка авторизации…</div>
  if (!keycloak.authenticated) return <div className="auth-loader"><div>
    <p>Для добавления рецепта необходимо войти</p>
    <button type="button" onClick={() => void keycloak.login({ redirectUri: window.location.href })}>Войти</button>
  </div></div>

  const author = keycloak.tokenParsed?.name || keycloak.tokenParsed?.preferred_username || 'Текущий пользователь'
  return <div className="recipe-editor">
    <Header />
    <main className="recipe-editor-main">
      <h1>Создание рецепта</h1>
        <form noValidate onSubmit={submit}>
          <div className="recipe-editor-grid">
            <fieldset className="recipe-editor-panel" disabled={busy}>
              <h2>Основная информация</h2>
              <label htmlFor="recipe-title">Название рецепта *</label>
              <input id="recipe-title" required placeholder="Название" value={title}
                aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? 'title-error' : undefined}
                onChange={event => { setTitle(event.target.value); setErrors(previous => ({ ...previous, title: undefined })) }} />
              {errors.title && <p className="recipe-editor-error" id="title-error" role="alert">{errors.title}</p>}
              <label htmlFor="recipe-description">Описание *</label>
              <textarea id="recipe-description" required placeholder="Описание" value={description}
                aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? 'description-error' : undefined}
                onChange={event => { setDescription(event.target.value); setErrors(previous => ({ ...previous, description: undefined })) }} />
              {errors.description && <p className="recipe-editor-error" id="description-error" role="alert">{errors.description}</p>}
              <div className="recipe-editor-upload">
                <div><strong>Фото блюда</strong><p>{image?.name || 'Файл не выбран. Форматы: JPG, PNG. До 10 МБ'}</p></div>
                <input ref={fileInput} id="recipe-image" type="file" accept="image/jpeg,image/png" aria-label="Фото блюда"
                  aria-invalid={Boolean(errors.image)} aria-describedby={errors.image ? 'image-error' : undefined}
                  onChange={event => {
                    const file = event.target.files?.[0]
                    setImage(file)
                    setErrors(previous => ({ ...previous, image: validateRecipe(title, description, file).image }))
                  }} />
                <button type="button" onClick={() => fileInput.current?.click()}>Выбрать файл</button>
              </div>
              {errors.image && <p className="recipe-editor-error" id="image-error" role="alert">{errors.image}</p>}
            </fieldset>
            <aside className="recipe-editor-panel recipe-editor-meta">
              <h2>Данные рецепта</h2><p>Автор: {author}</p>
              <p>Дата создания: {new Date().toLocaleDateString('ru-RU')}</p>
              <hr />
            </aside>
            <IngredientsForm
            form={ingredientsForm}
            disabled={busy}
            className="recipe-editor-ingredients"
            />
          </div>

          <div className="recipe-editor-actions">
            <button type="submit" disabled={busy}>{busy ? 'Сохранение…' : 'Сохранить'}</button>
            {!busy && <Link to="/recipes">Отмена</Link>}
          </div>
        </form>
      {notice && <div className="recipe-editor-notice" role="alert">{notice}</div>}
    </main>
    <Footer />
  </div>
}
