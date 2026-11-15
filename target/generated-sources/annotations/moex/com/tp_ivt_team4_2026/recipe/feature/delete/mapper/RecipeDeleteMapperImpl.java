package moex.com.tp_ivt_team4_2026.recipe.feature.delete.mapper;

import javax.annotation.processing.Generated;
import moex.com.tp_ivt_team4_2026.model.RecipeDeleteResponseV1;
import moex.com.tp_ivt_team4_2026.recipe.feature.delete.model.RecipeDeleteResponseDto;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-11-15T12:59:33+0300",
    comments = "version: 1.6.3, compiler: javac, environment: Java 22.0.2 (Eclipse Adoptium)"
)
@Component
public class RecipeDeleteMapperImpl implements RecipeDeleteMapper {

    @Override
    public RecipeDeleteResponseDto map(String message) {
        if ( message == null ) {
            return null;
        }

        String message1 = null;

        message1 = message;

        RecipeDeleteResponseDto recipeDeleteResponseDto = new RecipeDeleteResponseDto( message1 );

        return recipeDeleteResponseDto;
    }

    @Override
    public RecipeDeleteResponseV1 map(RecipeDeleteResponseDto recipeDeleteResponseDto) {
        if ( recipeDeleteResponseDto == null ) {
            return null;
        }

        RecipeDeleteResponseV1 recipeDeleteResponseV1 = new RecipeDeleteResponseV1();

        recipeDeleteResponseV1.setMessage( recipeDeleteResponseDto.message() );

        return recipeDeleteResponseV1;
    }
}
