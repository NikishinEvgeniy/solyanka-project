package moex.com.tp_ivt_team4_2026.recipe.feature.byid.mapper;

import javax.annotation.processing.Generated;
import moex.com.tp_ivt_team4_2026.model.RecipeByIdResponseV1;
import moex.com.tp_ivt_team4_2026.recipe.feature.byid.model.RecipeDto;
import moex.com.tp_ivt_team4_2026.recipe.model.Recipe;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-11-15T12:59:32+0300",
    comments = "version: 1.6.3, compiler: javac, environment: Java 22.0.2 (Eclipse Adoptium)"
)
@Component
public class RecipeByIdMapperImpl implements RecipeByIdMapper {

    @Override
    public RecipeDto map(Recipe recipe) {
        if ( recipe == null ) {
            return null;
        }

        Long id = null;
        String title = null;
        String imageUrl = null;
        String description = null;

        id = recipe.getId();
        title = recipe.getTitle();
        imageUrl = recipe.getImageUrl();
        description = recipe.getDescription();

        RecipeDto recipeDto = new RecipeDto( id, title, imageUrl, description );

        return recipeDto;
    }

    @Override
    public RecipeByIdResponseV1 map(RecipeDto recipeDto) {
        if ( recipeDto == null ) {
            return null;
        }

        RecipeByIdResponseV1 recipeByIdResponseV1 = new RecipeByIdResponseV1();

        recipeByIdResponseV1.setId( recipeDto.id() );
        recipeByIdResponseV1.setTitle( recipeDto.title() );
        recipeByIdResponseV1.setImageUrl( recipeDto.imageUrl() );
        recipeByIdResponseV1.setDescription( recipeDto.description() );

        return recipeByIdResponseV1;
    }
}
