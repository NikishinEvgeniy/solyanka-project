import { useId, useState } from 'react'
import '@fontsource/brygada-1918/cyrillic-700.css'
import ProductsListModal from '../productsList/ProductsListModal'
import type { Product } from '../productsList/model/Product'
import { INGREDIENT_UNITS } from './ingredientsValidation'
import type { IngredientRow, IngredientRowErrors } from './ingredientsValidation'
import type { IngredientsFormState } from './hooks/useIngredientsForm'
import './IngredientsForm.css'

type Props = {
  /** Состояние формы из useIngredientsForm(). */
  form: IngredientsFormState
  /** Блокирует все поля (например, пока идёт сохранение). */
  disabled?: boolean
  /** Заголовок панели. */
  title?: string
  /** Дополнительный класс корневого элемента — например, для внешних отступов. */
  className?: string
}

export default function IngredientsForm({ form, disabled, title = 'Ингредиенты', className }: Props) {
  const { rows, errors, setRows, setErrors, addRow } = form
  const [pickerRowKey, setPickerRowKey] = useState<string | null>(null)
  const titleId = useId()
  const pickerRow = rows.find((row) => row.key === pickerRowKey) ?? null

  function updateRow(key: string, patch: Partial<IngredientRow>, clear: keyof IngredientRowErrors) {
    setRows(rows.map((row) => (row.key === key ? { ...row, ...patch } : row)))
    const rowErrors = errors[key]
    if (rowErrors?.[clear]) {
      const rest = { ...rowErrors }
      delete rest[clear]
      setErrors({ ...errors, [key]: Object.keys(rest).length ? rest : undefined })
    }
  }

  function removeRow(key: string) {
    setRows(rows.filter((row) => row.key !== key))
    const rest = { ...errors }
    delete rest[key]
    setErrors(rest)
  }

  function selectProduct(product: Product) {
    if (pickerRowKey) updateRow(pickerRowKey, { product }, 'product')
    setPickerRowKey(null)
  }

  return (
    <fieldset className={`ingf${className ? ` ${className}` : ''}`} disabled={disabled} aria-labelledby={titleId}>
      <h2 className="ingf__title" id={titleId}>{title}</h2>

      {rows.length > 0 ? (
        <>
          <div className="ingf__head" aria-hidden="true">
            <span>Название ингредиента *</span>
            <span>Единица измерения *</span>
            <span>Количество *</span>
            <span />
          </div>

          <ul className="ingf__rows">
            {rows.map((row, index) => {
              const rowErrors = errors[row.key] ?? {}
              const id = `${titleId}-${row.key}`
              return (
                <li className="ingf__row" key={row.key}>
                  <div className="ingf__cell">
                    <label className="ingf__label" htmlFor={`${id}-product`}>Название ингредиента *</label>
                    <button
                      type="button"
                      id={`${id}-product`}
                      className={`ingf__picker${row.product ? '' : ' is-empty'}`}
                      aria-haspopup="dialog"
                      aria-invalid={!!rowErrors.product}
                      aria-describedby={rowErrors.product ? `${id}-product-error` : undefined}
                      onClick={() => setPickerRowKey(row.key)}
                    >
                      {row.product?.title ?? 'Выбрать из списка…'}
                    </button>
                    {rowErrors.product && <p className="ingf__error" id={`${id}-product-error`} role="alert">{rowErrors.product}</p>}
                  </div>

                  <div className="ingf__cell">
                    <label className="ingf__label" htmlFor={`${id}-unit`}>Единица измерения *</label>
                    <select
                      id={`${id}-unit`}
                      className="ingf__field"
                      value={row.unit}
                      aria-invalid={!!rowErrors.unit}
                      aria-describedby={rowErrors.unit ? `${id}-unit-error` : undefined}
                      onChange={(e) => updateRow(row.key, { unit: e.target.value }, 'unit')}
                    >
                      {INGREDIENT_UNITS.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                    </select>
                    {rowErrors.unit && <p className="ingf__error" id={`${id}-unit-error`} role="alert">{rowErrors.unit}</p>}
                  </div>

                  <div className="ingf__cell">
                    <label className="ingf__label" htmlFor={`${id}-amount`}>Количество *</label>
                    <input
                      id={`${id}-amount`}
                      className="ingf__field"
                      inputMode="decimal"
                      autoComplete="off"
                      placeholder="0"
                      value={row.amount}
                      aria-invalid={!!rowErrors.amount}
                      aria-describedby={rowErrors.amount ? `${id}-amount-error` : undefined}
                      onChange={(e) => updateRow(row.key, { amount: e.target.value }, 'amount')}
                    />
                    {rowErrors.amount && <p className="ingf__error" id={`${id}-amount-error`} role="alert">{rowErrors.amount}</p>}
                  </div>

                  <button
                    type="button"
                    className="ingf__remove"
                    aria-label={`Удалить ингредиент ${index + 1}${row.product ? `: ${row.product.title}` : ''}`}
                    onClick={() => removeRow(row.key)}
                  >
                    ✕
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      ) : (
        <p className="ingf__empty">Ингредиенты пока не добавлены</p>
      )}

      <div className="ingf__footer">
        <button type="button" className="ingf__add" onClick={addRow}>Добавить ингредиент</button>
        <span className="ingf__hint">* Обязательные поля</span>
      </div>

      <ProductsListModal
        isOpen={pickerRow !== null}
        selectedId={pickerRow?.product?.id}
        onClose={() => setPickerRowKey(null)}
        onSelect={selectProduct}
      />
    </fieldset>
  )
}
