package moex.com.tp_ivt_team4_2026.recipe.feature.edit.service;

import moex.com.tp_ivt_team4_2026.recipe.feature.edit.model.RecipeEditRequestDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.edit.model.RecipeEditResponseDto;

public interface RecipeEditService {
    RecipeEditResponseDto handle(RecipeEditRequestDto recipeEditRequestDto);
}