package moex.com.tp_ivt_team4_2026.ingredient.feature.delete;

import lombok.SneakyThrows;
import moex.com.tp_ivt_team4_2026.ingredient.feature.delete.repository.IngredientDeleteRepository;
import moex.com.tp_ivt_team4_2026.ingredient.model.Ingredient;
import moex.com.tp_ivt_team4_2026.library.AbstractIntegrationTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Sql("/mock-ingredients.sql")
@DisplayName("Проверка работоспособности домена [Ingredient]")
class IngredientDeleteControllerTest extends AbstractIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private IngredientDeleteRepository repository;

    @Test
    @SneakyThrows
    @DisplayName("Функционал DELETE [/api/v1/recipes/{recipe_id}/ingredients/{ingredient_id}] успешно удаляет ингредиент")
    void shouldSuccessfullyDeleteIngredientWhenIncomingRequestIsIngredientDelete() {
        // Arrange
        final Long INGREDIENT_ID = 1L;
        final String EXPECTED_RESULT_MESSAGE = "Ингредиент успешно удалён";

        // Act && Assert
        Optional<Ingredient> existing = repository.findById(INGREDIENT_ID);
        mockMvc.perform(delete("/api/v1/recipes/{recipe_id}/ingredients/{ingredient_id}", 1L, INGREDIENT_ID).with(jwt()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(EXPECTED_RESULT_MESSAGE));
        Optional<Ingredient> deleted = repository.findById(INGREDIENT_ID);

        // Assert
        assertAll(() -> {
            assertThat(existing).isPresent();
            assertThat(deleted).isNotPresent();
        });
    }
}