package moex.com.tp_ivt_team4_2026.ingredient.feature.additional.service;

import lombok.RequiredArgsConstructor;
import moex.com.tp_ivt_team4_2026.ingredient.feature.additional.mapper.IngredientAdditionalMapper;
import moex.com.tp_ivt_team4_2026.ingredient.feature.additional.model.IngredientAdditionalRequestDto;
import moex.com.tp_ivt_team4_2026.ingredient.feature.additional.model.IngredientAdditionalResponseDto;
import moex.com.tp_ivt_team4_2026.ingredient.feature.additional.repository.IngredientAdditionalRepository;
import moex.com.tp_ivt_team4_2026.ingredient.model.Ingredient;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IngredientAdditionalServiceImpl implements IngredientAdditionalService {

    private final IngredientAdditionalMapper ingredientAdditionalMapper;
    private final IngredientAdditionalRepository ingredientAdditionalRepository;
    private static final String SUCCESS_ADDITIONAL_MESSAGE = "Ингредиент успешно добавлен";

    @Override
    public IngredientAdditionalResponseDto handle(IngredientAdditionalRequestDto ingredientAdditionalRequestDto) {
        Ingredient ingredient = ingredientAdditionalMapper.map(ingredientAdditionalRequestDto);
        ingredientAdditionalRepository.save(ingredient);

        return ingredientAdditionalMapper.map(SUCCESS_ADDITIONAL_MESSAGE);
    }
}
