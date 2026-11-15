package moex.com.tp_ivt_team4_2026.recipe.feature.edit.mapper;

import moex.com.tp_ivt_team4_2026.library.mapstruct.CurrentUserIdMapper;
import moex.com.tp_ivt_team4_2026.library.mapstruct.MapperConfiguration;
import moex.com.tp_ivt_team4_2026.model.EditRecipeResponseV1;
import moex.com.tp_ivt_team4_2026.recipe.feature.edit.model.RecipeEditRequestDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.edit.model.RecipeEditResponseDto;
import moex.com.tp_ivt_team4_2026.recipe.model.Recipe;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(config = MapperConfiguration.class, uses = CurrentUserIdMapper.class)
public interface RecipeEditMapper {

    RecipeEditRequestDto map(String title, String description);

    RecipeEditResponseDto map(Recipe recipe);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "imageUrl", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "authorId", source = ".", qualifiedByName = "currentAuthorId")
    Recipe map(RecipeEditRequestDto dto);


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "imageUrl", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "authorId", ignore = true)
    void updateEntityFromDto(RecipeEditRequestDto dto, @MappingTarget Recipe recipe);

    EditRecipeResponseV1 map(RecipeEditResponseDto EditResponseDto);
}