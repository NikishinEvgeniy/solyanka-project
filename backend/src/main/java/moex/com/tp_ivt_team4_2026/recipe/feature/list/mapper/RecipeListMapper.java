package moex.com.tp_ivt_team4_2026.recipe.feature.list.mapper;

import moex.com.tp_ivt_team4_2026.library.mapstruct.MapperConfiguration;
import moex.com.tp_ivt_team4_2026.model.RecipeListResponseV1;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.model.RecipeCardDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.model.RecipeListDto;
import moex.com.tp_ivt_team4_2026.recipe.model.Recipe;
import org.apache.commons.collections4.CollectionUtils;
import org.mapstruct.Mapper;

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

    default RecipeListDto map(List<Recipe> recipes) {
        if (CollectionUtils.isEmpty(recipes)) {
            return new RecipeListDto(List.of());
        }
        List<RecipeCardDto> mapped = recipes
                .stream()
                .map(this::map)
                .toList();
        return new RecipeListDto(mapped);
    }

    RecipeListResponseV1 map(RecipeListDto recipeListDto);
}