package moex.com.tp_ivt_team4_2026.ingredient.feature.delete.mapper;

import moex.com.tp_ivt_team4_2026.ingredient.feature.delete.model.IngredientDeleteResponseDtoV1;
import moex.com.tp_ivt_team4_2026.library.mapstruct.MapperConfiguration;
import moex.com.tp_ivt_team4_2026.model.IngredientDeleteResponseV1;
import org.mapstruct.Mapper;

/**
 * <center><b>Интерфейс преобразователь</b></center>
 * <p>
 *  Данный интерфейс задает контракт для преобразования данных внутри функционала "Удаление ингредиента".
 * </p>
 *
 * @author evgeniy
 * @since 11/25/26
 */
@Mapper(config = MapperConfiguration.class)
public interface IngredientDeleteMapper {
    IngredientDeleteResponseDtoV1 map(String message);
    IngredientDeleteResponseV1 map(IngredientDeleteResponseDtoV1 dto);
}