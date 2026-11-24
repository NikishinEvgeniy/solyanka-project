import { useEffect, useRef } from 'react'

type Props = {
  image?: File
  existingUrl?: string
  error?: string
  onChange: (file: File) => void
  onRemove: () => void
}

export function RecipePhoto({ image, existingUrl, error, onChange, onRemove }: Props) {
  const input = useRef<HTMLInputElement>(null)
  const preview = useRef<HTMLImageElement>(null)
  useEffect(() => {
    if (!image || error || !preview.current) return
    const url = URL.createObjectURL(image)
    preview.current.src = url
    return () => URL.revokeObjectURL(url)
  }, [image, error])

  return (
    <>
      <div className="recipe-editor-upload">
        <div>
          <strong>Фото блюда</strong>
          <p>{image?.name || (existingUrl ? 'Текущее фото' : 'Файл не выбран. Форматы: JPG, PNG. До 10 МБ')}</p>
        </div>
        <input ref={input} type="file" accept="image/jpeg,image/png" aria-label="Фото блюда"
          aria-invalid={Boolean(error)} aria-describedby={error ? 'image-error' : undefined}
          onChange={event => {
            const file = event.currentTarget.files?.[0]
            if (file) onChange(file)
            event.currentTarget.value = ''
          }} />
        <div className="recipe-photo-actions">
          <button type="button" onClick={() => input.current?.click()}>Добавить фото</button>
          {(image || existingUrl) && <button type="button" onClick={onRemove}>Удалить фото</button>}
        </div>
      </div>
      {(existingUrl || (image && !error)) && (
        <img className="recipe-photo-preview" ref={preview}
          src={image && !error ? undefined : existingUrl} alt="Фото блюда" />
      )}
    </>
  )
}
