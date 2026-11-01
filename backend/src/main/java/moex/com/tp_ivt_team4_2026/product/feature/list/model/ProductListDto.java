package moex.com.tp_ivt_team4_2026.product.feature.list.model;

import java.util.List;

/**
 * <center><b>Класс данных</b></center>
 * <p>
 *  Доменная модель.
 * </p>
 *
 * @author evgeniy
 * @since 11/1/26
 */
public record ProductListDto(
        List<ProductCardDto> cards
) {
}