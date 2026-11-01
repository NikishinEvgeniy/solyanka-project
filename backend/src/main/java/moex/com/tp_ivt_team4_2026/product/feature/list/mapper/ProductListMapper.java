package moex.com.tp_ivt_team4_2026.product.feature.list.mapper;

import moex.com.tp_ivt_team4_2026.library.mapstruct.MapperConfiguration;
import moex.com.tp_ivt_team4_2026.model.ProductListResponseV1;
import moex.com.tp_ivt_team4_2026.product.feature.list.model.ProductCardDto;
import moex.com.tp_ivt_team4_2026.product.feature.list.model.ProductListDto;
import moex.com.tp_ivt_team4_2026.product.model.Product;
import org.apache.commons.collections4.CollectionUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

/**
 * <center><b>Класс преобразователь</b></center>
 * <p>
 *  Данный класс преобразует сущности внутри функционала "Получение списка продуктов".
 * </p>
 *
 * @author evgeniy
 * @since 11/1/26
 */
@Mapper(config = MapperConfiguration.class)
public interface ProductListMapper {
    ProductCardDto map(Product product);
    default ProductListDto map(List<Product> products) {
        if (CollectionUtils.isEmpty(products)) {
            return new ProductListDto(List.of());
        }
        List<ProductCardDto> mapped = products
                .stream()
                .map(this::map)
                .toList();
        return new ProductListDto(mapped);
    }
    @Mapping(target = "products", source = "cards")
    ProductListResponseV1 map(ProductListDto productListDto);
}