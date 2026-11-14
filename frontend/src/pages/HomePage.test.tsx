import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import HomePage from './HomePage'

describe('HomePage', () => {
  it('показывает логотип, информацию о проекте и основные разделы', () => {
    render(<HomePage onLogout={vi.fn()} />)

    expect(screen.getByRole('img', { name: 'Солянка' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'всегда под рукой' })).toBeInTheDocument()
    expect(screen.getByText(/Устали листать десятки рецептов/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Все рецепты' })).toHaveAttribute('href', '/recipes')
    expect(screen.getByRole('link', { name: 'Мои рецепты' })).toHaveAttribute('href', '/my-recipes')
    expect(screen.getByRole('link', { name: 'Профиль' })).toHaveAttribute('href', '/profile')
  })

  it('запускает выход из учётной записи', () => {
    const onLogout = vi.fn()
    render(<HomePage onLogout={onLogout} />)

    fireEvent.click(screen.getByRole('button', { name: 'Выйти' }))

    expect(onLogout).toHaveBeenCalledOnce()
  })
})
