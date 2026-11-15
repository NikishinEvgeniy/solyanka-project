package moex.com.tp_ivt_team4_2026.recipe.feature.edit;

import lombok.RequiredArgsConstructor;
import moex.com.tp_ivt_team4_2026.recipe.feature.byid.exception.RecipeNotFoundException;
import moex.com.tp_ivt_team4_2026.recipe.feature.byid.repository.RecipeByIdRepository;
import moex.com.tp_ivt_team4_2026.recipe.model.Recipe;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class RecipeEditService {
    private final RecipeByIdRepository repository;

    @Transactional
    public Recipe update(Long id, String title, String description) {
        var recipe = repository.findById(id).orElseThrow(() -> new RecipeNotFoundException(id));
        if (title == null || title.isBlank() || title.trim().length() > 100 || description == null || description.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Проверьте название и описание рецепта");
        }
        recipe.setTitle(title.trim());
        recipe.setDescription(description.trim());
        return repository.saveAndFlush(recipe);
    }
}
