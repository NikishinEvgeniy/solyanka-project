package moex.com.tp_ivt_team4_2026.recipe.feature.list;

import lombok.RequiredArgsConstructor;
import moex.com.tp_ivt_team4_2026.api.RecipeListApi;
import moex.com.tp_ivt_team4_2026.model.RecipeListResponseV1;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.mapper.RecipeListMapper;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.model.RecipeListDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.service.RecipeListService;
import moex.com.tp_ivt_team4_2026.recipe.model.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

/**
 * <center><b>Класс контроллер</b></center>
 * <p>
 *  Данный класс является входной точкой для функционала "Получение списка рецептов".
 * </p>
 *
 * @author evgeniy
 * @since 11/11/26
 */
@RestController
@RequiredArgsConstructor
public class RecipeListController implements RecipeListApi {

    private final RecipeListMapper recipeListMapper;
    private final RecipeListService recipeListService;

    @Override
    public ResponseEntity<RecipeListResponseV1> getRecipes(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        RecipeListDto dto = recipeListService.handle(pageable);
        return ResponseEntity.ok(recipeListMapper.map(dto));
    }
}