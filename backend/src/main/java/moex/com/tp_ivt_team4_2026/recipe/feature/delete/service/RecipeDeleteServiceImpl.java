package moex.com.tp_ivt_team4_2026.recipe.feature.delete.service;

import lombok.RequiredArgsConstructor;
import moex.com.tp_ivt_team4_2026.recipe.feature.delete.mapper.RecipeDeleteMapper;
import moex.com.tp_ivt_team4_2026.recipe.feature.delete.model.RecipeDeleteResponseDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.delete.repository.RecipeDeleteRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecipeDeleteServiceImpl implements RecipeDeleteService {

    private final RecipeDeleteMapper recipeDeleteMapper;
    private final RecipeDeleteRepository recipeDeleteRepository;
    private static final String SUCCESS_DELETE_MESSAGE = "Рецепт успешно удалён";

    @Override
    public RecipeDeleteResponseDto handle(Long id) {
        recipeDeleteRepository.deleteById(id);
        return recipeDeleteMapper.map(SUCCESS_DELETE_MESSAGE);
    }
}