package moex.com.tp_ivt_team4_2026.recipe.feature.list.service;

import lombok.RequiredArgsConstructor;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.mapper.RecipeListMapper;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.model.RecipeListDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.repository.RecipeListRepository;
import moex.com.tp_ivt_team4_2026.recipe.model.Recipe;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <center><b>Класс сервис</b></center>
 * <p>
 *  Данный класс является агрегатором для логики преобразования между слоями.
 * </p>
 *
 * @author evgeniy
 * @since 11/11/26
 */
@Service
@RequiredArgsConstructor
public class RecipeListServiceImpl implements RecipeListService {

    private final RecipeListMapper recipeListMapper;
    private final RecipeListRepository recipeListRepository;

    @Override
    public RecipeListDto handle() {
        List<Recipe> recipes = recipeListRepository.findAll();
        return recipeListMapper.map(recipes);
    }
}