package moex.com.tp_ivt_team4_2026.product.feature.list;

import lombok.SneakyThrows;
import moex.com.tp_ivt_team4_2026.library.AbstractIntegrationTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@DisplayName("Проверка работоспособности домена [Products]")
class ProductListControllerTest extends AbstractIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @SneakyThrows
    @DisplayName("Функционал GET [/api/v1/products] успешно возвращает список продуктов")
    void shouldReturnProductCardsWhenIncomingRequestIsApiProductsGet() {
        // Arrange (migration)
        final int PRODUCT_COUNT_IN_DATABASE = 50;

        // Act && Assert
        mockMvc.perform(get("/api/v1/products").with(jwt()))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.products").isArray())
                .andExpect(jsonPath("$.products.length()").value(PRODUCT_COUNT_IN_DATABASE));

    }
}