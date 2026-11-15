package moex.com.tp_ivt_team4_2026.recipe.feature.edit;

import lombok.SneakyThrows;
import moex.com.tp_ivt_team4_2026.library.AbstractIntegrationTest;
import moex.com.tp_ivt_team4_2026.recipe.feature.edit.repository.RecipeEditRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import java.util.UUID;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Sql("/mock-recipes.sql")
@DisplayName("Функционал PUT [/api/v1/recipes/{id}}] успешно изменяет рецепт")
public class RecipeEditControllerTest extends AbstractIntegrationTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private RecipeEditRepository recipeEditRepository;

    @Test
    @SneakyThrows
    void shouldEditRecipeWhenIncomingRequestIsMultipartRecipePut(){
        Long id = 1L;

        UUID authorId = UUID.randomUUID();
        SecurityMockMvcRequestPostProcessors.JwtRequestPostProcessor jwtConfiguration = jwt()
                .jwt(builder -> builder.subject(authorId.toString()));
        MockMultipartFile imageFile = new MockMultipartFile(
                "image",
                "recipe.jpg",
                MediaType.IMAGE_JPEG_VALUE,
                "fake-image-content".getBytes()
        );
        String title = "Название1";
        String description = "Описание1";

        mockMvc.perform(multipart(HttpMethod.PUT, "/api/v1/recipes/{id}", id)
                        .file(imageFile)
                        .param("title", title)
                        .param("description", description)
                        .with(jwtConfiguration)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.title").value(title))
                .andExpect(jsonPath("$.description").value(description))
                .andExpect(jsonPath("$.image_url").isNotEmpty());

        mockMvc.perform(get("/api/v1/recipes/{id}", id).with(jwtConfiguration))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.title").value(title))
                .andExpect(jsonPath("$.description").value(description))
                .andExpect(jsonPath("$.image_url").isNotEmpty());
    }
}
