import { useState } from 'react'
import fallbackImage from '../../../assets/images/image-not-found.svg'
import './RecipeImage.css'

type Props = { src?: string | null; title: string; lazy?: boolean }

export default function RecipeImage({ src, title, lazy }: Props) {
  const [failedUrl, setFailedUrl] = useState<string>()
  const url = src?.trim()
  const hasPhoto = Boolean(url && url !== failedUrl)

  return (
    <img
      className={hasPhoto ? 'recipe-photo-image' : 'recipe-photo-image recipe-photo-image--missing'}
      src={hasPhoto ? url : fallbackImage}
      alt={hasPhoto ? title : 'Изображение отсутствует'}
      loading={lazy ? 'lazy' : undefined}
      onError={hasPhoto ? () => setFailedUrl(url) : undefined}
    />
  )
}
