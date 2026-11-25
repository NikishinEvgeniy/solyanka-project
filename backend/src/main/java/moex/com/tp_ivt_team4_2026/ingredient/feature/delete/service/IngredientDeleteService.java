package moex.com.tp_ivt_team4_2026.ingredient.feature.delete.service;

import moex.com.tp_ivt_team4_2026.ingredient.feature.delete.model.IngredientDeleteResponseDtoV1;

/**
 * <center><b>Интерфейс сервис</b></center>
 * <p>
 *  Данный интерфейс задает контракт для обработки данных.
 * </p>
 *
 * @author evgeniy
 * @since 11/25/26
 */
public interface IngredientDeleteService {
    IngredientDeleteResponseDtoV1 handle(Long id);
}