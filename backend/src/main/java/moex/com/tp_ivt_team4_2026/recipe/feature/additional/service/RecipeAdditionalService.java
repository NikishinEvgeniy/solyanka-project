package moex.com.tp_ivt_team4_2026.recipe.feature.additional.service;

import moex.com.tp_ivt_team4_2026.recipe.feature.additional.model.RecipeAdditionalRequestDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.additional.model.RecipeAdditionalResponseDto;

public interface RecipeAdditionalService {
    RecipeAdditionalResponseDto handle(RecipeAdditionalRequestDto recipeAdditionalRequestDto);
}