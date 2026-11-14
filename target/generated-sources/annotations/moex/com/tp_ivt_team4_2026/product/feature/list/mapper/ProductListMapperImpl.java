package moex.com.tp_ivt_team4_2026.product.feature.list.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import moex.com.tp_ivt_team4_2026.model.ProductCardResponseV1;
import moex.com.tp_ivt_team4_2026.model.ProductListResponseV1;
import moex.com.tp_ivt_team4_2026.product.feature.list.model.ProductCardDto;
import moex.com.tp_ivt_team4_2026.product.feature.list.model.ProductListDto;
import moex.com.tp_ivt_team4_2026.product.model.Product;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-11-14T20:17:56+0300",
    comments = "version: 1.6.3, compiler: javac, environment: Java 22.0.2 (Eclipse Adoptium)"
)
@Component
public class ProductListMapperImpl implements ProductListMapper {

    @Override
    public ProductCardDto map(Product product) {
        if ( product == null ) {
            return null;
        }

        Long id = null;
        String title = null;
        String imageUrl = null;

        id = product.getId();
        title = product.getTitle();
        imageUrl = product.getImageUrl();

        ProductCardDto productCardDto = new ProductCardDto( id, title, imageUrl );

        return productCardDto;
    }

    @Override
    public ProductListResponseV1 map(ProductListDto productListDto) {
        if ( productListDto == null ) {
            return null;
        }

        ProductListResponseV1 productListResponseV1 = new ProductListResponseV1();

        productListResponseV1.setProducts( productCardDtoListToProductCardResponseV1List( productListDto.cards() ) );

        return productListResponseV1;
    }

    protected ProductCardResponseV1 productCardDtoToProductCardResponseV1(ProductCardDto productCardDto) {
        if ( productCardDto == null ) {
            return null;
        }

        ProductCardResponseV1 productCardResponseV1 = new ProductCardResponseV1();

        productCardResponseV1.setId( productCardDto.id() );
        productCardResponseV1.setTitle( productCardDto.title() );
        productCardResponseV1.setImageUrl( productCardDto.imageUrl() );

        return productCardResponseV1;
    }

    protected List<ProductCardResponseV1> productCardDtoListToProductCardResponseV1List(List<ProductCardDto> list) {
        if ( list == null ) {
            return null;
        }

        List<ProductCardResponseV1> list1 = new ArrayList<ProductCardResponseV1>( list.size() );
        for ( ProductCardDto productCardDto : list ) {
            list1.add( productCardDtoToProductCardResponseV1( productCardDto ) );
        }

        return list1;
    }
}
