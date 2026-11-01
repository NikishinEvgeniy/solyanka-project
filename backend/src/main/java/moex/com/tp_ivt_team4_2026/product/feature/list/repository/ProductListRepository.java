package moex.com.tp_ivt_team4_2026.product.feature.list.repository;

import moex.com.tp_ivt_team4_2026.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * <center><b>Класс репозиторий</b></center>
 * <p>
 *  Данный класс является источником внешних данных.
 * </p>
 *
 * @author evgeniy
 * @since 11/1/26
 */
public interface ProductListRepository extends JpaRepository<Product, Long> {
}