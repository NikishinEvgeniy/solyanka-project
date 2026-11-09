package moex.com.tp_ivt_team4_2026.recipe.feature.list.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(HttpStatus.NOT_FOUND)
public class RecipeNotFoundException extends RuntimeException {
    private final Long id;

    public RecipeNotFoundException(Long id) {
        super("Recipe with id=" + id + " not found");
        this.id = id;
    }
}
