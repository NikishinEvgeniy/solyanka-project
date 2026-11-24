package moex.com.tp_ivt_team4_2026.recipe.feature.list;

import lombok.SneakyThrows;
import moex.com.tp_ivt_team4_2026.library.AbstractIntegrationTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@DisplayName("Проверка работоспособности домена [Recipes]")
class RecipeListControllerTest extends AbstractIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @SneakyThrows
    @DisplayName("Функционал GET [/api/v1/recipes] успешно возвращает список рецептов")
    void shouldReturnRecipeCardsWhenIncomingRequestIsApiRecipesGet() {
        // Arrange (migration)
        final int RECIPES_COUNT_IN_DATABASE = 5;
        final int PAGE = 0;
        final int LIMIT = 4;
        // Act && Assert
        mockMvc.perform(get("/api/v1/recipes?page={page}&limit={limit}", PAGE, LIMIT).with(jwt()))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.recipes").isArray())
                .andExpect(jsonPath("$.recipes.length()").value(LIMIT))
                .andExpect(jsonPath("$.page").exists())
                .andExpect(jsonPath("$.size").exists())
                .andExpect(jsonPath("$.totalElements").value(RECIPES_COUNT_IN_DATABASE))
                .andExpect(jsonPath("$.totalPages").exists())
                .andExpect(jsonPath("$.last").exists());
    }
}