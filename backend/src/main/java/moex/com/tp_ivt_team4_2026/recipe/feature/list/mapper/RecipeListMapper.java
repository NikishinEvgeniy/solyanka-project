package moex.com.tp_ivt_team4_2026.recipe.feature.list.mapper;

import moex.com.tp_ivt_team4_2026.library.mapstruct.MapperConfiguration;
import moex.com.tp_ivt_team4_2026.model.RecipeCardResponseV1;
import moex.com.tp_ivt_team4_2026.model.RecipeListResponseV1;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.model.RecipeCardDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.model.RecipeListDto;
import moex.com.tp_ivt_team4_2026.recipe.model.Recipe;
import org.apache.commons.collections4.CollectionUtils;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * <center><b>Класс преобразователь</b></center>
 * <p>
 *  Данный класс преобразует данные внутри функционала "Получение списка рецептов".
 * </p>
 *
 * @author evgeniy
 * @since 11/11/26
 */
@Mapper(config = MapperConfiguration.class)
public interface RecipeListMapper {
    RecipeCardDto map(Recipe recipe);

    RecipeCardResponseV1 map(RecipeCardDto recipeCardDto);

    // Промежуточный DTO теперь тоже хранит метаданные пагинации
    default RecipeListDto map(Page<Recipe> page) {
        List<RecipeCardDto> mapped = page.getContent()
                .stream()
                .map(this::map)
                .toList();
        return new RecipeListDto(
                mapped,
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }

    // MapStruct сам замапит поля по именам (recipes, page, size, ...)
    RecipeListResponseV1 map(RecipeListDto recipeListDto);

}