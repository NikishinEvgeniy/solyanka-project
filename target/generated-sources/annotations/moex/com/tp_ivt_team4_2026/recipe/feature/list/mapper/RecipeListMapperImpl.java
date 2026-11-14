package moex.com.tp_ivt_team4_2026.recipe.feature.list.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import moex.com.tp_ivt_team4_2026.model.RecipeCardResponseV1;
import moex.com.tp_ivt_team4_2026.model.RecipeListResponseV1;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.model.RecipeCardDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.model.RecipeListDto;
import moex.com.tp_ivt_team4_2026.recipe.model.Recipe;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-11-14T20:17:56+0300",
    comments = "version: 1.6.3, compiler: javac, environment: Java 22.0.2 (Eclipse Adoptium)"
)
@Component
public class RecipeListMapperImpl implements RecipeListMapper {

    @Override
    public RecipeCardDto map(Recipe recipe) {
        if ( recipe == null ) {
            return null;
        }

        long id = 0L;
        String title = null;
        String imageUrl = null;

        if ( recipe.getId() != null ) {
            id = recipe.getId();
        }
        title = recipe.getTitle();
        imageUrl = recipe.getImageUrl();

        RecipeCardDto recipeCardDto = new RecipeCardDto( id, title, imageUrl );

        return recipeCardDto;
    }

    @Override
    public RecipeListResponseV1 map(RecipeListDto recipeListDto) {
        if ( recipeListDto == null ) {
            return null;
        }

        RecipeListResponseV1 recipeListResponseV1 = new RecipeListResponseV1();

        recipeListResponseV1.setRecipes( recipeCardDtoListToRecipeCardResponseV1List( recipeListDto.recipes() ) );

        return recipeListResponseV1;
    }

    protected RecipeCardResponseV1 recipeCardDtoToRecipeCardResponseV1(RecipeCardDto recipeCardDto) {
        if ( recipeCardDto == null ) {
            return null;
        }

        RecipeCardResponseV1 recipeCardResponseV1 = new RecipeCardResponseV1();

        recipeCardResponseV1.setId( recipeCardDto.id() );
        recipeCardResponseV1.setTitle( recipeCardDto.title() );
        recipeCardResponseV1.setImageUrl( recipeCardDto.imageUrl() );

        return recipeCardResponseV1;
    }

    protected List<RecipeCardResponseV1> recipeCardDtoListToRecipeCardResponseV1List(List<RecipeCardDto> list) {
        if ( list == null ) {
            return null;
        }

        List<RecipeCardResponseV1> list1 = new ArrayList<RecipeCardResponseV1>( list.size() );
        for ( RecipeCardDto recipeCardDto : list ) {
            list1.add( recipeCardDtoToRecipeCardResponseV1( recipeCardDto ) );
        }

        return list1;
    }
}
