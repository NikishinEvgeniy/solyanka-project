package moex.com.tp_ivt_team4_2026.recipe.feature.edit.service;

import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import moex.com.tp_ivt_team4_2026.recipe.feature.edit.mapper.RecipeEditMapper;
import moex.com.tp_ivt_team4_2026.recipe.feature.edit.model.RecipeEditRequestDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.edit.model.RecipeEditResponseDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.edit.repository.RecipeEditRepository;
import moex.com.tp_ivt_team4_2026.library.exception.recipe.RecipeNotFoundException;
import moex.com.tp_ivt_team4_2026.recipe.model.Recipe;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class RecipeEditServiceImpl implements RecipeEditService {

    private final RecipeEditMapper recipeEditMapper;
    private final RecipeEditRepository recipeEditRepository;

    @Override
    public RecipeEditResponseDto handle(Long id, RecipeEditRequestDto recipeEditRequestDto) {
        Recipe recipe = recipeEditRepository.findById(id)
                .orElseThrow(() -> new RecipeNotFoundException(id));

        recipeEditMapper.updateEntityFromDto(recipeEditRequestDto, recipe);

        Recipe saved = recipeEditRepository.save(recipe);
        return recipeEditMapper.map(saved);
    }
}