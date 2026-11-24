package moex.com.tp_ivt_team4_2026.recipe.feature.list.service;

import lombok.RequiredArgsConstructor;
import moex.com.tp_ivt_team4_2026.library.paging.model.PageDataDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.mapper.RecipeListMapper;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.model.RecipeCardDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.model.RecipeListDto;
import moex.com.tp_ivt_team4_2026.recipe.feature.list.repository.RecipeListRepository;
import moex.com.tp_ivt_team4_2026.recipe.model.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <center><b>Класс сервис</b></center>
 * <p>
 *  Данный класс является агрегатором для логики преобразования между слоями.
 * </p>
 *
 * @author evgeniy
 * @since 11/11/26
 */
@Service
@RequiredArgsConstructor
public class RecipeListServiceImpl implements RecipeListService {

    private final RecipeListMapper recipeListMapper;
    private final RecipeListRepository recipeListRepository;

    @Override
    public RecipeListDto handle(Pageable pageable) {
        Page<Recipe> page = recipeListRepository.findAll(pageable);

        List<RecipeCardDto> recipes = page.getContent().stream()
                .map(recipeListMapper::map)
                .toList();

        PageDataDto pageData = new PageDataDto(
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );

        return new RecipeListDto(recipes, pageData);
    }
}