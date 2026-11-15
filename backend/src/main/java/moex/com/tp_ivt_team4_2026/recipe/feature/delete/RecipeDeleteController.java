package moex.com.tp_ivt_team4_2026.recipe.feature.delete;

import lombok.RequiredArgsConstructor;
import moex.com.tp_ivt_team4_2026.api.DeleteRecipeApi;
import moex.com.tp_ivt_team4_2026.model.RecipeDeleteResponseV1;
import moex.com.tp_ivt_team4_2026.recipe.feature.delete.mapper.RecipeDeleteMapper;
import moex.com.tp_ivt_team4_2026.recipe.feature.delete.model.RecipeDeleteResponseDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.delete.service.RecipeDeleteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RecipeDeleteController implements DeleteRecipeApi {

    private final RecipeDeleteMapper recipeDeleteMapper;
    private final RecipeDeleteService recipeDeleteService;


    @Override
    public ResponseEntity<RecipeDeleteResponseV1> deleteById(Long id) {
        RecipeDeleteResponseDto response = recipeDeleteService.handle(id);
        return ResponseEntity.ok(recipeDeleteMapper.map(response));
    }
}