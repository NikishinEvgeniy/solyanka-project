package moex.com.tp_ivt_team4_2026.recipe.feature.byid;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.repository.RecipeByIdRepository;
import lombok.SneakyThrows;
import moex.com.tp_ivt_team4_2026.library.AbstractIntegrationTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.containsString;
import org.springframework.http.MediaType;
@DisplayName("Проверка работоспособности домена [Recipe]")
class RecipeByIdControllerTest extends AbstractIntegrationTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private RecipeByIdRepository recipeByIdRepository;

    @Test
    @SneakyThrows
    @DisplayName("Функционал GET [/api/v1/recipes/{id}] успешно возвращает рецепт")
    void shouldReturnRecipeWhenIncomingRequestIsApiRecipesGetById() {
        // Arrange
        final long RECIPE_ID_IN_DATABASE = recipeByIdRepository.findAll().get(0).getId();

        // Act && Assert
        mockMvc.perform(get("/api/v1/recipes/{id}", RECIPE_ID_IN_DATABASE).with(jwt()))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(RECIPE_ID_IN_DATABASE))
                .andExpect(jsonPath("$.title").isNotEmpty())
                .andExpect(jsonPath("$.description").isNotEmpty())
                .andExpect(jsonPath("$.image_url").hasJsonPath());
    }

    @Test
    @SneakyThrows
    @DisplayName("Функционал GET [/api/v1/recipes/{id}] возвращает 404 для несуществующего рецепта")
    void shouldReturn404WhenRecipeNotFound() {
        // Arrange
        final long NON_EXISTENT_RECIPE_ID = Long.MAX_VALUE;

        // Act && Assert
        mockMvc.perform(get("/api/v1/recipes/{id}", NON_EXISTENT_RECIPE_ID).with(jwt()))
                .andExpect(status().isNotFound())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.message")
                        .value(containsString(String.valueOf(NON_EXISTENT_RECIPE_ID))));
    }
}
