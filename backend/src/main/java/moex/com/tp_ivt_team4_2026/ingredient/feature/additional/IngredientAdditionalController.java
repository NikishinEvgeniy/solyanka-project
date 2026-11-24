package moex.com.tp_ivt_team4_2026.ingredient.feature.additional;

import lombok.RequiredArgsConstructor;
import moex.com.tp_ivt_team4_2026.api.IngredientAddApi;
import moex.com.tp_ivt_team4_2026.ingredient.feature.additional.mapper.IngredientAdditionalMapper;
import moex.com.tp_ivt_team4_2026.ingredient.feature.additional.model.IngredientAdditionalRequestDto;
import moex.com.tp_ivt_team4_2026.ingredient.feature.additional.model.IngredientAdditionalResponseDto;
import moex.com.tp_ivt_team4_2026.ingredient.feature.additional.service.IngredientAdditionalService;
import moex.com.tp_ivt_team4_2026.model.AddIngredientResponseV1;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@RestController
@RequiredArgsConstructor
public class IngredientAdditionalController implements IngredientAddApi {
    private final IngredientAdditionalMapper ingredientAdditionalMapper;
    private final IngredientAdditionalService ingredientAdditionalService;

    @Override
    public ResponseEntity<AddIngredientResponseV1> addIngredient(Long recipeId,
                                                                 Long productId,
                                                                 Double amount,
                                                                 String unit){
        IngredientAdditionalRequestDto ingredientAdditionalRequestDto = ingredientAdditionalMapper.map(recipeId, productId, BigDecimal.valueOf(amount), unit);
        IngredientAdditionalResponseDto ingredientAdditionalResponseDto = ingredientAdditionalService.handle(ingredientAdditionalRequestDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ingredientAdditionalMapper.map(ingredientAdditionalResponseDto));

    }
}
