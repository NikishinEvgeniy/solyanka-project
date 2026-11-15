import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { validate } from './recipeEditValidation'
import type { Errors } from './recipeEditValidation'
import './RecipeEditPage.css'

export default function RecipeEditPage() {
  const { id = '' } = useParams()
  // Remount the form when navigating between recipes, discarding stale data.
  return <Editor key={id} id={id} />
}
function Editor({ id }: { id: string }) {
  const [title, setTitle] = useState('Яблочный пирог')
  const [description, setDescription] = useState('Домашний пирог с яблоками. Смешайте ингредиенты и выпекайте до золотистой корочки.')
  const [image, setImage] = useState<File>()
  const [errors, setErrors] = useState<Errors>({})
  const [notice, setNotice] = useState('')
  const fileInput = useRef<HTMLInputElement>(null)
  function submit(event: FormEvent) {
    event.preventDefault()
    setNotice('')
    const validation = validate(title, description, image)
    setErrors(validation)
    if (Object.keys(validation).length) return
    setNotice('Изменения проверены. Это демонстрационная форма, данные не сохраняются.')
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
          <div className="edit-upload"><div><strong>Фото блюда</strong><p>{image?.name || 'Файл не выбран. Форматы: JPG, PNG. До 10 МБ'}</p></div>
            <input ref={fileInput} type="file" accept="image/jpeg,image/png" aria-label="Фото блюда" aria-invalid={!!errors.image} aria-describedby="error-image" onChange={e => setImage(e.target.files?.[0])} />
            <button type="button" onClick={() => fileInput.current?.click()}>Выбрать файл</button></div>{fieldError('image')}
        </fieldset>
        <div className="edit-actions"><button className="edit-primary">Сохранить</button><Link to={`/recipes/${id}`}>Отмена</Link></div>
        {notice && <p className="edit-notice" role="status">{notice}</p>}
      </div><aside className="edit-panel"><h2>Данные рецепта</h2><p>Автор: Иван Иванов</p><p>Дата создания: 15.11.2026</p><hr /></aside></div></form>
  </main><Footer /></div>
}
