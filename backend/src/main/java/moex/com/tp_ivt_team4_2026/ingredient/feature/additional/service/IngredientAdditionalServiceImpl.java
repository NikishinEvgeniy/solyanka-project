package moex.com.tp_ivt_team4_2026.ingredient.feature.additional.service;

import lombok.RequiredArgsConstructor;
import moex.com.tp_ivt_team4_2026.ingredient.feature.additional.mapper.IngredientAdditionalMapper;
import moex.com.tp_ivt_team4_2026.ingredient.feature.additional.model.IngredientAdditionalRequestDto;
import moex.com.tp_ivt_team4_2026.ingredient.feature.additional.model.IngredientAdditionalResponseDto;
import moex.com.tp_ivt_team4_2026.ingredient.feature.additional.repository.IngredientAdditionalRepository;
import moex.com.tp_ivt_team4_2026.ingredient.feature.additional.repository.ProductRepository;
import moex.com.tp_ivt_team4_2026.ingredient.feature.additional.repository.RecipeRepository;
import moex.com.tp_ivt_team4_2026.ingredient.model.Ingredient;
import moex.com.tp_ivt_team4_2026.library.exception.product.ProductNotFoundException;
import moex.com.tp_ivt_team4_2026.library.exception.recipe.RecipeNotFoundException;
import moex.com.tp_ivt_team4_2026.product.model.Product;
import moex.com.tp_ivt_team4_2026.recipe.model.Recipe;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IngredientAdditionalServiceImpl implements IngredientAdditionalService {

    private final IngredientAdditionalMapper ingredientAdditionalMapper;
    private final IngredientAdditionalRepository ingredientAdditionalRepository;
    private final RecipeRepository recipeRepository;
    private final ProductRepository productRepository;
    private static final String SUCCESS_ADDITIONAL_MESSAGE = "Ингредиент успешно добавлен";

    @Override
    public IngredientAdditionalResponseDto handle(IngredientAdditionalRequestDto ingredientAdditionalRequestDto) {
        Recipe recipe = recipeRepository.findById(ingredientAdditionalRequestDto.recipeId())
                .orElseThrow(() -> new RecipeNotFoundException(ingredientAdditionalRequestDto.recipeId()));
        Product product = productRepository.findById(ingredientAdditionalRequestDto.productId())
                .orElseThrow(() -> new ProductNotFoundException(ingredientAdditionalRequestDto.productId()));

        Ingredient ingredient = ingredientAdditionalMapper.map(ingredientAdditionalRequestDto, recipe, product);
        Ingredient saved = ingredientAdditionalRepository.save(ingredient);

        return ingredientAdditionalMapper.map(SUCCESS_ADDITIONAL_MESSAGE);
    }
}
