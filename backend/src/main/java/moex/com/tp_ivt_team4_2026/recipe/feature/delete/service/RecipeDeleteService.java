package moex.com.tp_ivt_team4_2026.recipe.feature.delete.service;

import moex.com.tp_ivt_team4_2026.recipe.feature.delete.model.RecipeDeleteResponseDto;

public interface RecipeDeleteService {
    RecipeDeleteResponseDto handle(Long id);
}