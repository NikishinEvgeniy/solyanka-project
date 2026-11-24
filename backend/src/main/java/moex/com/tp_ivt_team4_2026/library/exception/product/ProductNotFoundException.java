package moex.com.tp_ivt_team4_2026.library.exception.product;

import lombok.Getter;

@Getter
public class ProductNotFoundException extends RuntimeException {
    private static final String RECIPE_NOT_FOUND_MESSAGE = "Продукт с id=%d не был найден";
    public ProductNotFoundException(Long id) {
        super(RECIPE_NOT_FOUND_MESSAGE.formatted(id));
    }
}