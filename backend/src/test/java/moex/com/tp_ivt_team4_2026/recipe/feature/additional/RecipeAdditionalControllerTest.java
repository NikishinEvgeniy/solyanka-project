package moex.com.tp_ivt_team4_2026.recipe.feature.additional;

import lombok.SneakyThrows;
import moex.com.tp_ivt_team4_2026.library.AbstractIntegrationTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Проверка работоспособности домена [Recipe]")
class RecipeAdditionalControllerTest extends AbstractIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @SneakyThrows
    @DisplayName("Функционал POST [/api/v1/recipes}] успешно добавляет рецепт")
    void shouldAddRecipeWhenIncomingRequestIsMultipartRecipeAdd() {
        // Arrange
        UUID authorId = UUID.randomUUID();
        SecurityMockMvcRequestPostProcessors.JwtRequestPostProcessor jwtConfiguration = jwt()
                .jwt(builder -> builder.subject(authorId.toString()));
        MockMultipartFile imageFile = new MockMultipartFile(
                "image",
                "recipe.jpg",
                MediaType.IMAGE_JPEG_VALUE,
                "fake-image-content".getBytes()
        );
        String title = "Борщ";
        String description = "Классический рецепт";

        // Act & Assert
        mockMvc.perform(multipart("/api/v1/recipes")
                        .file(imageFile)
                        .param("title", title)
                        .param("description", description)
                        .with(jwtConfiguration))
                .andExpect(status().isCreated())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.title").value(title))
                .andExpect(jsonPath("$.description").value(description))
                .andExpect(jsonPath("$.author_id").value(authorId.toString()))
                .andExpect(jsonPath("$.created_at").exists())
                .andExpect(jsonPath("$.updated_at").exists())
                .andExpect(jsonPath("$.image_url").isEmpty());
    }
}