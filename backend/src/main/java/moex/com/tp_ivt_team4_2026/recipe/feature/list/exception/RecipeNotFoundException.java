package moex.com.tp_ivt_team4_2026.recipe.feature.list.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
public class RecipeNotFoundException extends RuntimeException {
    private static final String RECIPE_NOT_FOUND_MESSAGE = "Рецепт с id=%d не был найден";
    public RecipeNotFoundException(Long id) {
        super(RECIPE_NOT_FOUND_MESSAGE.formatted(id));
    }
}
