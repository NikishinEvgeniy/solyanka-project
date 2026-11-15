package moex.com.tp_ivt_team4_2026.recipe.feature.edit;

import lombok.RequiredArgsConstructor;
import moex.com.tp_ivt_team4_2026.api.RecipeEditApi;
import moex.com.tp_ivt_team4_2026.model.EditRecipeResponseV1;
import moex.com.tp_ivt_team4_2026.recipe.feature.edit.mapper.RecipeEditMapper;
import moex.com.tp_ivt_team4_2026.recipe.feature.edit.model.RecipeEditRequestDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.edit.model.RecipeEditResponseDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.edit.service.RecipeEditService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class RecipeEditController implements RecipeEditApi {

    private final RecipeEditMapper recipeEditMapper;
    private final RecipeEditService recipeEditService;

    @Override
    public ResponseEntity<EditRecipeResponseV1> editRecipe(Long id, String title, String description, MultipartFile image) {
        RecipeEditRequestDto recipeEditRequestDto = recipeEditMapper.map(title, description);
        RecipeEditResponseDto editResponseDto = recipeEditService.handle(recipeEditRequestDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(recipeEditMapper.map(editResponseDto));
    }
}