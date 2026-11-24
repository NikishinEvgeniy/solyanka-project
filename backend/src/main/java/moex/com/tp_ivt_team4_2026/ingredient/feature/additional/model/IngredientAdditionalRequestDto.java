package moex.com.tp_ivt_team4_2026.ingredient.feature.additional.model;

import java.math.BigDecimal;

public record IngredientAdditionalRequestDto(
        Long recipeId,
        Long productId,
        BigDecimal amount,
        String unit) {
}