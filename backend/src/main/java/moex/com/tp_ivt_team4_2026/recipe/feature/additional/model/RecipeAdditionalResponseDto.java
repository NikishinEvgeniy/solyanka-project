package moex.com.tp_ivt_team4_2026.recipe.feature.additional.model;

import java.time.OffsetDateTime;
import java.util.UUID;

public record RecipeAdditionalResponseDto(
        Long id,
        String title,
        String description,
        String imageUrl,
        UUID authorId,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {
}