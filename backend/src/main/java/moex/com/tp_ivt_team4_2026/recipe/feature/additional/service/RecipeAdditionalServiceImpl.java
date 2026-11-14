package moex.com.tp_ivt_team4_2026.recipe.feature.additional.service;

import lombok.RequiredArgsConstructor;
import moex.com.tp_ivt_team4_2026.recipe.feature.additional.mapper.RecipeAdditionalMapper;
import moex.com.tp_ivt_team4_2026.recipe.feature.additional.model.RecipeAdditionalRequestDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.additional.model.RecipeAdditionalResponseDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.additional.repository.RecipeAdditionalRepository;
import moex.com.tp_ivt_team4_2026.recipe.model.Recipe;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecipeAdditionalServiceImpl implements RecipeAdditionalService {

    private final RecipeAdditionalMapper recipeAdditionalMapper;
    private final RecipeAdditionalRepository recipeAdditionalRepository;

    @Override
    public RecipeAdditionalResponseDto handle(RecipeAdditionalRequestDto recipeAdditionalRequestDto) {
        Recipe recipe = recipeAdditionalMapper.map(recipeAdditionalRequestDto);
        Recipe saved = recipeAdditionalRepository.save(recipe);
        return recipeAdditionalMapper.map(saved);
    }
}