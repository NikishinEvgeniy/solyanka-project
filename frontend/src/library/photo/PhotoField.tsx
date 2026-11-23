import { useRef } from 'react'
import './PhotoField.css'

type Props = {
  id: string
  title: string
  file?: File
  errorId?: string
  onSelect?: (file?: File) => void
}

export default function PhotoField({ id, title, file, errorId, onSelect }: Props) {
  const input = useRef<HTMLInputElement>(null)
  return (
    <div className="photo-field">
      <div>
        <strong>{title}</strong>
        <p>{file?.name || 'Файл не выбран. Форматы: JPG, PNG. До 10 МБ'}</p>
      </div>
      <input ref={input} id={id} type="file" accept="image/jpeg,image/png"
        aria-label={title} aria-invalid={Boolean(errorId)} aria-describedby={errorId}
        disabled={!onSelect} onChange={event => onSelect?.(event.target.files?.[0])} />
      <button type="button" disabled={!onSelect} onClick={() => input.current?.click()}>
        Выбрать файл
      </button>
    </div>
  )
}
