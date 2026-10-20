package moex.com.tp_ivt_team4_2026;

import com.solyanka.products.api.ProductsApi;
import com.solyanka.products.model.CreateProductRequest;
import com.solyanka.products.model.ProductDto;
import com.solyanka.products.model.UpdateProductRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.List;

@RestController
public class ProductsController implements ProductsApi {
    @Override
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        ProductDto dummyProduct = new ProductDto(1L, "Солянка", OffsetDateTime.now());
        dummyProduct.setDescription("Острый суп");
        dummyProduct.setUnit("порция");
        return ResponseEntity.ok(List.of(dummyProduct));
    }

    @Override
    public ResponseEntity<ProductDto> createProduct(CreateProductRequest request) {
        ProductDto dummyProduct = new ProductDto(2L, request.getTitle(), OffsetDateTime.now());
        dummyProduct.setDescription(request.getDescription());
        dummyProduct.setUnit(request.getUnit());
        return ResponseEntity.status(201).body(dummyProduct);
    }

    @Override
    public ResponseEntity<ProductDto> getProductById(Long id) {
        ProductDto dummyProduct = new ProductDto(id, "Солянка", OffsetDateTime.now());
        dummyProduct.setDescription("Острый суп");
        dummyProduct.setUnit("порция");
        return ResponseEntity.ok(dummyProduct);
    }

    @Override
    public ResponseEntity<ProductDto> updateProduct(Long id, UpdateProductRequest request) {
        ProductDto dummyProduct = new ProductDto(id, request.getTitle(), OffsetDateTime.now());
        dummyProduct.setDescription(request.getDescription());
        dummyProduct.setUnit(request.getUnit());
        return ResponseEntity.ok(dummyProduct);
    }

    @Override
    public ResponseEntity<Void> deleteProduct(Long id) {
        return ResponseEntity.noContent().build();
    }
}
