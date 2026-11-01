package moex.com.tp_ivt_team4_2026.product.feature.list;

import lombok.RequiredArgsConstructor;
import moex.com.tp_ivt_team4_2026.api.ProductListApi;
import moex.com.tp_ivt_team4_2026.model.ProductListResponseV1;
import moex.com.tp_ivt_team4_2026.product.feature.list.mapper.ProductListMapper;
import moex.com.tp_ivt_team4_2026.product.feature.list.model.ProductListDto;
import moex.com.tp_ivt_team4_2026.product.feature.list.service.ProductListService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

/**
 * <center><b>Класс контроллер</b></center>
 * <p>
 *  Данный класс является входной точкой для функционала "Получение списка продуктов".
 * </p>
 *
 * @author evgeniy
 * @since 10/24/26
 */
@RestController
@RequiredArgsConstructor
public class ProductListController implements ProductListApi {

    private final ProductListMapper productListMapper;
    private final ProductListService productListService;

    @Override
    public ResponseEntity<ProductListResponseV1> getProducts() {
        ProductListDto productList = productListService.handle();
        return ResponseEntity.ok(productListMapper.map(productList));
    }
}