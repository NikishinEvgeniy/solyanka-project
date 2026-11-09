package moex.com.tp_ivt_team4_2026.recipe.feature.list.service;

import lombok.RequiredArgsConstructor;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.exception.RecipeNotFoundException;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.mapper.RecipeByIdMapper;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.model.RecipeDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.repository.RecipeByIdRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecipeByIdImpl implements RecipeByIdService{

    private final RecipeByIdRepository recipeByIdRepository;
    private final RecipeByIdMapper recipeByIdMapper;
    @Override
    public RecipeDto handle(Long id){
        return recipeByIdRepository.findById(id)
                .map(recipeByIdMapper::map)
                .orElseThrow(() -> new RecipeNotFoundException(id));
    }
}
