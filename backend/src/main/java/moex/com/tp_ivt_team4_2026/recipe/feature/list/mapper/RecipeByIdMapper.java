package moex.com.tp_ivt_team4_2026.recipe.feature.list.mapper;

import moex.com.tp_ivt_team4_2026.library.mapstruct.MapperConfiguration;
import moex.com.tp_ivt_team4_2026.model.RecipeByIdResponseV1;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.model.RecipeDto;
import moex.com.tp_ivt_team4_2026.recipe.model.Recipe;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfiguration.class)
public interface RecipeByIdMapper {
    RecipeDto map(Recipe recipe);
    RecipeByIdResponseV1 map(RecipeDto recipeDto);
}
