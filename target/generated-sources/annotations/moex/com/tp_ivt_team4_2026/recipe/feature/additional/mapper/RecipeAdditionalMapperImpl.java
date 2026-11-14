package moex.com.tp_ivt_team4_2026.recipe.feature.additional.mapper;

import java.time.OffsetDateTime;
import java.util.UUID;
import javax.annotation.processing.Generated;
import moex.com.tp_ivt_team4_2026.library.mapstruct.CurrentUserIdMapper;
import moex.com.tp_ivt_team4_2026.model.AddRecipeResponseV1;
import moex.com.tp_ivt_team4_2026.recipe.feature.additional.model.RecipeAdditionalRequestDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.additional.model.RecipeAdditionalResponseDto;
import moex.com.tp_ivt_team4_2026.recipe.model.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-11-14T20:24:35+0300",
    comments = "version: 1.6.3, compiler: javac, environment: Java 22.0.2 (Eclipse Adoptium)"
)
@Component
public class RecipeAdditionalMapperImpl implements RecipeAdditionalMapper {

    @Autowired
    private CurrentUserIdMapper currentUserIdMapper;

    @Override
    public RecipeAdditionalRequestDto map(String title, String description) {
        if ( title == null && description == null ) {
            return null;
        }

        String title1 = null;
        title1 = title;
        String description1 = null;
        description1 = description;

        RecipeAdditionalRequestDto recipeAdditionalRequestDto = new RecipeAdditionalRequestDto( title1, description1 );

        return recipeAdditionalRequestDto;
    }

    @Override
    public RecipeAdditionalResponseDto map(Recipe recipe) {
        if ( recipe == null ) {
            return null;
        }

        Long id = null;
        String title = null;
        String description = null;
        String imageUrl = null;
        UUID authorId = null;
        OffsetDateTime createdAt = null;
        OffsetDateTime updatedAt = null;

        id = recipe.getId();
        title = recipe.getTitle();
        description = recipe.getDescription();
        imageUrl = recipe.getImageUrl();
        authorId = recipe.getAuthorId();
        createdAt = recipe.getCreatedAt();
        updatedAt = recipe.getUpdatedAt();

        RecipeAdditionalResponseDto recipeAdditionalResponseDto = new RecipeAdditionalResponseDto( id, title, description, imageUrl, authorId, createdAt, updatedAt );

        return recipeAdditionalResponseDto;
    }

    @Override
    public Recipe map(RecipeAdditionalRequestDto recipeAdditionalRequestDto) {
        if ( recipeAdditionalRequestDto == null ) {
            return null;
        }

        Recipe.RecipeBuilder recipe = Recipe.builder();

        recipe.authorId( currentUserIdMapper.getCurrentUserId( recipeAdditionalRequestDto ) );
        recipe.title( recipeAdditionalRequestDto.title() );
        recipe.description( recipeAdditionalRequestDto.description() );

        return recipe.build();
    }

    @Override
    public AddRecipeResponseV1 map(RecipeAdditionalResponseDto additionalResponseDto) {
        if ( additionalResponseDto == null ) {
            return null;
        }

        AddRecipeResponseV1 addRecipeResponseV1 = new AddRecipeResponseV1();

        addRecipeResponseV1.setId( additionalResponseDto.id() );
        addRecipeResponseV1.setTitle( additionalResponseDto.title() );
        addRecipeResponseV1.setDescription( additionalResponseDto.description() );
        addRecipeResponseV1.setImageUrl( additionalResponseDto.imageUrl() );
        addRecipeResponseV1.setAuthorId( additionalResponseDto.authorId() );
        addRecipeResponseV1.setCreatedAt( additionalResponseDto.createdAt() );
        addRecipeResponseV1.setUpdatedAt( additionalResponseDto.updatedAt() );

        return addRecipeResponseV1;
    }
}
