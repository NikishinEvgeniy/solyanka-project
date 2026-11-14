import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useKeycloak } from '@react-keycloak/web'
import { Link, useParams } from 'react-router-dom'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { RecipeApiError, recipeRequest, saveRecipe, validateRecipe } from './recipeApi'
import type { FieldErrors, Recipe } from './recipeApi'
import './RecipeCreatePage.css'

export default function RecipeCreatePage() {
  const { keycloak, initialized } = useKeycloak()
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File>()
  const [existing, setExisting] = useState<Recipe>()
  const [errors, setErrors] = useState<FieldErrors>({})
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(Boolean(id))
  const [loadError, setLoadError] = useState(false)
  const [notice, setNotice] = useState<{ text: string; success: boolean }>()
  const submitting = useRef(false)
  const fileInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!id || !initialized || !keycloak.authenticated) return
    let active = true
    async function load() {
      try {
        await keycloak.updateToken(30)
        const recipe: Recipe = await recipeRequest(keycloak.token!, `/${id}`)
        if (active) {
          setExisting(recipe)
          setTitle(recipe.title)
          setDescription(recipe.description)
        }
      } catch {
        if (active) setLoadError(true)
      } finally {
        if (active) setLoading(false)
      }
    }
    void load()
    return () => { active = false }
  }, [id, initialized, keycloak])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current || !keycloak.authenticated) return
    setNotice(undefined)
    const validation = validateRecipe(title, description)
    if (errors.image) validation.image = errors.image
    setErrors(validation)
    if (Object.keys(validation).length) return
    // The backend currently provides no edit handler or recipe identifier in its PUT contract.
    if (id) {
      setNotice({ text: 'Редактирование пока недоступно на сервере', success: false })
      return
    }
    submitting.current = true
    setBusy(true)
    try {
      await keycloak.updateToken(30)
      if (!keycloak.token) throw new Error('Authentication required')
      const list: { recipes: Recipe[] } = await recipeRequest(keycloak.token)
      if (list.recipes.some(recipe => recipe.title.trim().toLocaleLowerCase('ru') === title.trim().toLocaleLowerCase('ru'))) {
        setErrors({ title: 'Рецепт с таким названием уже существует' })
        return
      }
      const saved = await saveRecipe(keycloak.token, title, description, image)
      setExisting(saved)
      setNotice({ text: 'Рецепт успешно добавлен', success: true })
    } catch (error) {
      if (error instanceof RecipeApiError && error.status === 409) {
        setErrors({ title: 'Рецепт с таким названием уже существует' })
      } else {
        setNotice({ text: 'Ошибка сохранения. Попробуйте ещё раз.', success: false })
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
      <h1>{id ? 'Редактирование рецепта' : 'Создание рецепта'}</h1>
      {loading ? <p role="status">Загрузка рецепта…</p> : loadError ? <p role="alert">Не удалось загрузить рецепт. Обновите страницу, чтобы повторить.</p> :
        <form noValidate onSubmit={submit}>
          <div className="recipe-editor-grid">
            <fieldset className="recipe-editor-panel" disabled={busy || notice?.success}>
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
                <div><strong>Фото блюда</strong><p>{image?.name || (existing?.image_url ? 'Фото уже загружено' : 'Файл не выбран. Форматы: JPG, PNG')}</p></div>
                <input ref={fileInput} id="recipe-image" type="file" accept="image/jpeg,image/png" aria-label="Фото блюда"
                  aria-invalid={Boolean(errors.image)} aria-describedby={errors.image ? 'image-error' : undefined}
                  onChange={event => {
                    const file = event.target.files?.[0]
                    const invalid = file && !['image/jpeg', 'image/png'].includes(file.type)
                    setImage(invalid ? undefined : file)
                    setErrors(previous => ({ ...previous, image: invalid ? 'Выберите изображение JPG или PNG' : undefined }))
                  }} />
                <button type="button" onClick={() => fileInput.current?.click()}>Выбрать файл</button>
              </div>
              {errors.image && <p className="recipe-editor-error" id="image-error" role="alert">{errors.image}</p>}
            </fieldset>
            <aside className="recipe-editor-panel recipe-editor-meta">
              <h2>Данные рецепта</h2><p>Автор: {id ? 'Нет данных об авторе' : author}</p>
              <p>Дата создания: {existing?.created_at ? new Date(existing.created_at).toLocaleDateString('ru-RU') : id ? 'Нет данных' : 'Будет задана при сохранении'}</p>
              {existing?.updated_at && <p>Обновлён: {new Date(existing.updated_at).toLocaleDateString('ru-RU')}</p>}
              <hr />
            </aside>
          </div>
          <div className="recipe-editor-actions">
            <button type="submit" disabled={busy || notice?.success || Boolean(id)}>{busy ? 'Сохранение…' : 'Сохранить'}</button>
            <Link to="/recipes">{notice?.success ? 'Все рецепты' : 'Отмена'}</Link>
          </div>
          {id && <p role="status">Редактирование пока недоступно на сервере.</p>}
        </form>}
      {notice && <div className={`recipe-editor-notice${notice.success ? ' success' : ''}`} role={notice.success ? 'status' : 'alert'}>{notice.text}</div>}
    </main>
    <Footer />
  </div>
}
