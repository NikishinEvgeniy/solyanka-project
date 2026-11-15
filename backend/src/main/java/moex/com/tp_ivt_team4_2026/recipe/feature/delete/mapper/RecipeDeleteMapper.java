package moex.com.tp_ivt_team4_2026.recipe.feature.delete.mapper;

import moex.com.tp_ivt_team4_2026.library.mapstruct.MapperConfiguration;
import moex.com.tp_ivt_team4_2026.model.RecipeDeleteResponseV1;
import moex.com.tp_ivt_team4_2026.recipe.feature.delete.model.RecipeDeleteResponseDto;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfiguration.class)
public interface RecipeDeleteMapper {
    RecipeDeleteResponseDto map(String message);
    RecipeDeleteResponseV1 map(RecipeDeleteResponseDto recipeDeleteResponseDto);
}