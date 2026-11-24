package moex.com.tp_ivt_team4_2026.ingredient.feature.additional.mapper;

import moex.com.tp_ivt_team4_2026.ingredient.feature.additional.model.IngredientAdditionalRequestDto;
import moex.com.tp_ivt_team4_2026.ingredient.feature.additional.model.IngredientAdditionalResponseDto;
import moex.com.tp_ivt_team4_2026.ingredient.model.Ingredient;
import moex.com.tp_ivt_team4_2026.library.mapstruct.MapperConfiguration;
import moex.com.tp_ivt_team4_2026.model.AddIngredientResponseV1;
import moex.com.tp_ivt_team4_2026.product.model.Product;
import moex.com.tp_ivt_team4_2026.recipe.model.Recipe;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.math.BigDecimal;

@Mapper(config = MapperConfiguration.class)
public interface IngredientAdditionalMapper {

    IngredientAdditionalRequestDto map(Long recipeId, Long productId, BigDecimal amount, String unit);

    IngredientAdditionalResponseDto map(String message);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "recipeId", source = "recipeId")
    @Mapping(target = "productId", source = "productId")
    Ingredient map(IngredientAdditionalRequestDto dto);

    @Mapping(target = "message", source = "message")
    AddIngredientResponseV1 map(IngredientAdditionalResponseDto dto);
}