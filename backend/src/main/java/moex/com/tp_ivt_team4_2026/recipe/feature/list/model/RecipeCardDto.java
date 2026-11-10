package moex.com.tp_ivt_team4_2026.recipe.feature.list.model;

/**
 * <center><b>Класс данных</b></center>
 * <p>
 *  Доменная модель.
 * </p>
 *
 * @author evgeniy
 * @since 11/11/26
 */
public record RecipeCardDto(
        long id,
        String title,
        String imageUrl
) {
}