package moex.com.tp_ivt_team4_2026.recipe.feature.list.mapper;

import moex.com.tp_ivt_team4_2026.library.mapstruct.MapperConfiguration;
import moex.com.tp_ivt_team4_2026.library.paging.model.PageDataDto;
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

    default RecipeListDto map(Page<Recipe> page) {
        List<RecipeCardDto> mapped = page.getContent()
                .stream()
                .map(this::map)
                .toList();
        PageDataDto pageData = new PageDataDto(
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
        return new RecipeListDto(mapped, pageData);
    }

    default RecipeListResponseV1 map(RecipeListDto dto) {
        return new RecipeListResponseV1(
                dto.pageData().page(),
                dto.pageData().size(),
                dto.pageData().totalElements(),
                dto.pageData().totalPages(),
                dto.pageData().last(),
                dto.recipes().stream().map(this::map).toList()
        );
    }
}