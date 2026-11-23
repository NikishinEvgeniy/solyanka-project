import { useCallback, useState } from 'react'
import {
  createIngredientRow,
  hasIngredientErrors,
  toIngredientsPayload,
  validateIngredients,
} from '../ingredientsValidation'
import type { IngredientRow, IngredientsErrors } from '../ingredientsValidation'

/**
 * Состояние формы ингредиентов. Хук держит страница, а компонент <IngredientsForm form={...} />
 * только отображает его — так страница может вызвать validate() и toPayload() при сохранении.
 */
export function useIngredientsForm(initialRows: IngredientRow[] = []) {
  const [rows, setRows] = useState<IngredientRow[]>(initialRows)
  const [errors, setErrors] = useState<IngredientsErrors>({})

  /** Проверяет все строки, показывает ошибки и возвращает true, если всё заполнено верно. */
  const validate = useCallback(() => {
    const result = validateIngredients(rows)
    setErrors(result)
    return !hasIngredientErrors(result)
  }, [rows])

  /** Данные для отправки на сервер: [{ product_id, amount, unit }]. */
  const toPayload = useCallback(() => toIngredientsPayload(rows), [rows])

  const reset = useCallback(() => {
    setRows([])
    setErrors({})
  }, [])

  const addRow = useCallback(() => setRows((current) => [...current, createIngredientRow()]), [])

  return { rows, errors, setRows, setErrors, addRow, validate, toPayload, reset }
}

export type IngredientsFormState = ReturnType<typeof useIngredientsForm>
