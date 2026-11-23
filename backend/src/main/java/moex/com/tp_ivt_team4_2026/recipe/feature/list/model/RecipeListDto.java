package moex.com.tp_ivt_team4_2026.recipe.feature.list.model;

import java.util.List;

/**
 * <center><b>Класс данных</b></center>
 * <p>
 *  Доменная модель.
 * </p>
 *
 * @author evgeniy
 * @since 11/11/26
 */
public record RecipeListDto(
        List<RecipeCardDto> recipes,
        int page,
        int size,
        long totalElements,
        int totalPages,
        boolean last
) {}