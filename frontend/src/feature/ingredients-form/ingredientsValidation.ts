import type { Product } from '../productsList/model/Product'

export const INGREDIENT_UNITS = ['г', 'кг', 'мл', 'л', 'шт', 'ч. л.', 'ст. л.', 'щепотка'] as const

export type IngredientRow = {
  key: string
  product: Product | null
  unit: string
  amount: string
}

export type IngredientRowErrors = { product?: string; unit?: string; amount?: string }
export type IngredientsErrors = Record<string, IngredientRowErrors | undefined>

let counter = 0

export function createIngredientRow(): IngredientRow {
  counter += 1
  return { key: `ingredient-${counter}`, product: null, unit: INGREDIENT_UNITS[0], amount: '' }
}

/** Приводит ввод пользователя («0,5», « 250 ») к числу с точкой или возвращает null. */
export function parseAmount(raw: string): number | null {
  const value = raw.trim().replace(',', '.')
  if (!/^\d{1,5}(\.\d{1,5})?$/.test(value)) return null
  return Number(value)
}

export function validateIngredients(rows: IngredientRow[]): IngredientsErrors {
  const errors: IngredientsErrors = {}
  const seen = new Map<number, string>()

  for (const row of rows) {
    const rowErrors: IngredientRowErrors = {}

    if (!row.product) {
      rowErrors.product = 'Выберите продукт из списка'
    } else if (seen.has(row.product.id)) {
      rowErrors.product = 'Этот продукт уже добавлен в рецепт'
    } else {
      seen.set(row.product.id, row.key)
    }

    if (!(INGREDIENT_UNITS as readonly string[]).includes(row.unit)) {
      rowErrors.unit = 'Выберите единицу измерения'
    }

    if (!row.amount.trim()) {
      rowErrors.amount = 'Укажите количество'
    } else {
      const amount = parseAmount(row.amount)
      if (amount === null) rowErrors.amount = 'Введите число, например 250 или 0,5'
      else if (amount <= 0) rowErrors.amount = 'Количество должно быть больше нуля'
    }

    if (Object.keys(rowErrors).length) errors[row.key] = rowErrors
  }

  return errors
}

export function hasIngredientErrors(errors: IngredientsErrors): boolean {
  return Object.keys(errors).length > 0
}

export function toIngredientsPayload(rows: IngredientRow[]) {
  return rows.map((row) => ({
    product_id: row.product!.id,
    amount: parseAmount(row.amount)!,
    unit: row.unit,
  }))
}
