package moex.com.tp_ivt_team4_2026.recipe.feature.delete;

import lombok.SneakyThrows;
import moex.com.tp_ivt_team4_2026.library.AbstractIntegrationTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Sql("/mock-recipes.sql")
@DisplayName("Проверка работоспособности домена [Recipe]")
class RecipeDeleteControllerTest extends AbstractIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    @SneakyThrows
    @DisplayName("Функционал DELETE [/api/v1/recipes/{id}] успешно удаляет рецепт")
    void shouldDeleteRecipeWhenIncomingRequestIsApiRecipeDelete() {
        // Arrange (migration)
        final long RECIPE_ID = 1;

        // Act && Assert
        mockMvc.perform(delete("/api/v1/recipes/{id}", RECIPE_ID).with(jwt()))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.message").value("Рецепт успешно удалён"));

    }
}