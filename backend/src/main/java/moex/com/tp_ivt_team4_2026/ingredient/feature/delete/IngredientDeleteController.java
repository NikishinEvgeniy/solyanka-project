package moex.com.tp_ivt_team4_2026.ingredient.feature.delete;

import lombok.RequiredArgsConstructor;
import moex.com.tp_ivt_team4_2026.api.DeleteIngredientApi;
import moex.com.tp_ivt_team4_2026.ingredient.feature.delete.mapper.IngredientDeleteMapper;
import moex.com.tp_ivt_team4_2026.ingredient.feature.delete.model.IngredientDeleteResponseDtoV1;
import moex.com.tp_ivt_team4_2026.ingredient.feature.delete.service.IngredientDeleteService;
import moex.com.tp_ivt_team4_2026.model.IngredientDeleteResponseV1;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

/**
 * <center><b>Класс контроллер</b></center>
 * <p>
 *  Данный класс прослушивает HTTP запрос /api/v1/recipes/{recipe_id}/ingredients/{ingredient_id}.
 * </p>
 *
 * @author evgeniy
 * @since 11/25/26
 */
@RestController
@RequiredArgsConstructor
public class IngredientDeleteController implements DeleteIngredientApi {

    private final IngredientDeleteMapper ingredientDeleteMapper;
    private final IngredientDeleteService ingredientDeleteService;

    @Override
    public ResponseEntity<IngredientDeleteResponseV1> deleteById(Long recipeId, Long ingredientId) {
        IngredientDeleteResponseDtoV1 handled = ingredientDeleteService.handle(ingredientId);
        return ResponseEntity.ok(ingredientDeleteMapper.map(handled));
    }
}