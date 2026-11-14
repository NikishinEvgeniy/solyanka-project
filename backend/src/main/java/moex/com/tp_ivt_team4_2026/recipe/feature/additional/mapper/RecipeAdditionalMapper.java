package moex.com.tp_ivt_team4_2026.recipe.feature.additional.mapper;

import moex.com.tp_ivt_team4_2026.library.mapstruct.CurrentUserIdMapper;
import moex.com.tp_ivt_team4_2026.library.mapstruct.MapperConfiguration;
import moex.com.tp_ivt_team4_2026.model.AddRecipeResponseV1;
import moex.com.tp_ivt_team4_2026.recipe.feature.additional.model.RecipeAdditionalRequestDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.additional.model.RecipeAdditionalResponseDto;
import moex.com.tp_ivt_team4_2026.recipe.model.Recipe;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapperConfiguration.class, uses = CurrentUserIdMapper.class)
public interface RecipeAdditionalMapper {

    RecipeAdditionalRequestDto map(String title, String description);

    RecipeAdditionalResponseDto map(Recipe recipe);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "imageUrl", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "authorId", source = "recipeAdditionalRequestDto", qualifiedByName = "currentAuthorId")
    Recipe map(RecipeAdditionalRequestDto recipeAdditionalRequestDto);

    AddRecipeResponseV1 map(RecipeAdditionalResponseDto additionalResponseDto);
}