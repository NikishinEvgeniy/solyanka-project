package moex.com.tp_ivt_team4_2026.ingredient.additional;

import lombok.SneakyThrows;
import moex.com.tp_ivt_team4_2026.library.AbstractIntegrationTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.UUID;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@Sql("/mock-recipes.sql")
@DisplayName("Проверка работоспособности домена [Ingredient] ")
public class IngredientAdditionalControllerTest extends AbstractIntegrationTest {
    @Autowired
    private MockMvc mockMvc;
    private static final String SUCCESS_ADDITIONAL_MESSAGE = "Ингредиент успешно добавлен";
    @Test
    @SneakyThrows
    @DisplayName("Функционал POST [/api/v1/recipes/{id}/ingredient}] успешно добавляет рецепт")
    void shouldAddIngredientWhenIncomingRequestIsIngredientAdd() {
        UUID authorId = UUID.randomUUID();
        SecurityMockMvcRequestPostProcessors.JwtRequestPostProcessor jwtConfiguration = jwt()
                .jwt(builder -> builder.subject(authorId.toString()));
        Long recipeId = 1L;
        Long productId = 1L;
        BigDecimal amount = BigDecimal.valueOf(1);
        String unit = "грамм";
        // Act & Assert
        mockMvc.perform(post("/api/v1/recipes/{id}/ingredients", recipeId)
                        .param("product_id", productId.toString())
                        .param("amount", amount.toString())
                        .param("unit", unit)
                        .with(jwtConfiguration))
                .andExpect(status().isCreated())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.message").value(SUCCESS_ADDITIONAL_MESSAGE));
    }
}
