package moex.com.tp_ivt_team4_2026.product.feature.list.service;

import lombok.RequiredArgsConstructor;
import moex.com.tp_ivt_team4_2026.product.feature.list.mapper.ProductListMapper;
import moex.com.tp_ivt_team4_2026.product.feature.list.model.ProductListDto;
import moex.com.tp_ivt_team4_2026.product.feature.list.repository.ProductListRepository;
import moex.com.tp_ivt_team4_2026.product.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <center><b>Класс сервис</b></center>
 * <p>
 *     Данный класс является агрегатором для логики преобразования между слоями.
 * </p>теу
 *
 * @author evgeniy
 * @since 11/1/26
 */
@Service
@RequiredArgsConstructor
public class ProductListServiceImpl implements ProductListService {

    private final ProductListMapper productListMapper;
    private final ProductListRepository productListRepository;

    @Override
    public ProductListDto handle() {
        List<Product> products = productListRepository.findAll();
        return productListMapper.map(products);
    }
}