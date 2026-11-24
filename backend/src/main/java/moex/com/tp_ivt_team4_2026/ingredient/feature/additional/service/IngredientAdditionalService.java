package moex.com.tp_ivt_team4_2026.ingredient.feature.additional.service;

import moex.com.tp_ivt_team4_2026.ingredient.feature.additional.model.IngredientAdditionalRequestDto;
import moex.com.tp_ivt_team4_2026.ingredient.feature.additional.model.IngredientAdditionalResponseDto;

public interface IngredientAdditionalService {
    IngredientAdditionalResponseDto handle(IngredientAdditionalRequestDto ingredientAdditionalRequestDto);
}
