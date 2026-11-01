package moex.com.tp_ivt_team4_2026.product.feature.list.service;

import moex.com.tp_ivt_team4_2026.product.feature.list.model.ProductListDto;

/**
 * <center><b>Интерфейс сервис</b></center>
 * <p>
 *  Данный интерфейс задает контракт для обработки данных внутри функционала "Получение списка продуктов".
 * </p>
 *
 * @author evgeniy
 * @since 11/1/26
 */
public interface ProductListService {
    ProductListDto handle();
}