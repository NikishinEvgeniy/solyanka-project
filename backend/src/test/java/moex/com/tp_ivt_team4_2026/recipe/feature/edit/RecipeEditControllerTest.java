package moex.com.tp_ivt_team4_2026.recipe.feature.edit;

import lombok.SneakyThrows;
import moex.com.tp_ivt_team4_2026.library.AbstractIntegrationTest;
import org.hibernate.annotations.processing.SQL;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;

@SQL("mock-recipes.sql")
@DisplayName("Функционал PUT [/api/v1/recipes}] успешно изменяет рецепт")
public class RecipeEditControllerTest extends AbstractIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    @SneakyThrows
    void shouldAddRecipeWhenIncomingRequestIsMultipartRecipePut(){

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
    }
}
