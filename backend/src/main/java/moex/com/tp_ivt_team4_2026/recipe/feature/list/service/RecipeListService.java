package moex.com.tp_ivt_team4_2026.recipe.feature.list.service;

import moex.com.tp_ivt_team4_2026.recipe.feature.list.model.RecipeListDto;

/**
 * <center><b>Интерфейс сервис</b></center>
 * <p>
 *  Данный интерфейс задает контракт для обработки данных внутри функционала "Получение списка рецептов".
 * </p>
 *
 * @author evgeniy
 * @since 11/11/26
 */
public interface RecipeListService {
    RecipeListDto handle();
}