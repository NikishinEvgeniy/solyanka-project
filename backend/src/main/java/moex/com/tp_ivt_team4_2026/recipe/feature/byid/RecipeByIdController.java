package moex.com.tp_ivt_team4_2026.recipe.feature.byid;

import lombok.RequiredArgsConstructor;
import moex.com.tp_ivt_team4_2026.api.RecipeByIdApi;
import moex.com.tp_ivt_team4_2026.model.RecipeByIdResponseV1;
import moex.com.tp_ivt_team4_2026.recipe.feature.byid.model.RecipeDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.byid.mapper.RecipeByIdMapper;
import moex.com.tp_ivt_team4_2026.recipe.feature.byid.service.RecipeByIdService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RecipeByIdController implements RecipeByIdApi {
    private final RecipeByIdMapper recipeByIdMapper;
    private final RecipeByIdService recipeByIdService;
    @Override
    public ResponseEntity<RecipeByIdResponseV1> getRecipeById(Long id){
        RecipeDto recipe = recipeByIdService.handle(id);
        return ResponseEntity.ok(recipeByIdMapper.map(recipe));
    }
}