package moex.com.tp_ivt_team4_2026.recipe.feature.additional;

import lombok.RequiredArgsConstructor;
import moex.com.tp_ivt_team4_2026.api.RecipeAddApi;
import moex.com.tp_ivt_team4_2026.model.AddRecipeResponseV1;
import moex.com.tp_ivt_team4_2026.recipe.feature.additional.mapper.RecipeAdditionalMapper;
import moex.com.tp_ivt_team4_2026.recipe.feature.additional.model.RecipeAdditionalRequestDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.additional.model.RecipeAdditionalResponseDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.additional.service.RecipeAdditionalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class RecipeAdditionalController implements RecipeAddApi {

    private final RecipeAdditionalMapper recipeAdditionalMapper;
    private final RecipeAdditionalService recipeAdditionalService;

    @Override
    public ResponseEntity<AddRecipeResponseV1> addRecipe(String title, String description, MultipartFile image) {
        RecipeAdditionalRequestDto recipeAdditionalRequestDto = recipeAdditionalMapper.map(title, description);
        RecipeAdditionalResponseDto additionalResponseDto = recipeAdditionalService.handle(recipeAdditionalRequestDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(recipeAdditionalMapper.map(additionalResponseDto));
    }
}