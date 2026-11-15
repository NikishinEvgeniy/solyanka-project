package moex.com.tp_ivt_team4_2026.recipe.feature.edit.service;

import lombok.RequiredArgsConstructor;
import moex.com.tp_ivt_team4_2026.recipe.feature.edit.mapper.RecipeEditMapper;
import moex.com.tp_ivt_team4_2026.recipe.feature.edit.model.RecipeEditRequestDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.edit.model.RecipeEditResponseDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.edit.repository.RecipeEditRepository;
import moex.com.tp_ivt_team4_2026.recipe.model.Recipe;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecipeEditServiceImpl implements RecipeEditService {

    private final RecipeEditMapper recipeEditMapper;
    private final RecipeEditRepository recipeEditRepository;

    @Override
    public RecipeEditResponseDto handle(RecipeEditRequestDto recipeEditRequestDto) {
        Recipe recipe = recipeEditRepository.findById(recipeEditRepository.getId())
                .orElseThrow(() -> new RecipeNotFoundException(dto.getId()));

        recipeEditMapper.handle(dto, recipe);
        Recipe saved = recipeEditRepository.save(recipe);
        return recipeEditMapper.map(saved);
    }
}