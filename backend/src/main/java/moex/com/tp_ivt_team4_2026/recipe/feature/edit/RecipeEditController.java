package moex.com.tp_ivt_team4_2026.recipe.feature.edit;

import lombok.RequiredArgsConstructor;
import moex.com.tp_ivt_team4_2026.api.RecipeEditApi;
import moex.com.tp_ivt_team4_2026.model.EditRecipeResponseV1;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class RecipeEditController implements RecipeEditApi {
    private final RecipeEditService service;

    @Override
    public ResponseEntity<EditRecipeResponseV1> editRecipe(Long id, String title, String description, MultipartFile image) {
        var recipe = service.update(id, title, description);
        return ResponseEntity.ok(new EditRecipeResponseV1()
                .id(recipe.getId()).title(recipe.getTitle()).description(recipe.getDescription())
                .imageUrl(recipe.getImageUrl()).authorId(recipe.getAuthorId())
                .createdAt(recipe.getCreatedAt()).updatedAt(recipe.getUpdatedAt()));
    }
}
