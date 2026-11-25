package moex.com.tp_ivt_team4_2026.ingredient.feature.delete.service;

import lombok.RequiredArgsConstructor;
import moex.com.tp_ivt_team4_2026.ingredient.feature.delete.mapper.IngredientDeleteMapper;
import moex.com.tp_ivt_team4_2026.ingredient.feature.delete.model.IngredientDeleteResponseDtoV1;
import moex.com.tp_ivt_team4_2026.ingredient.feature.delete.repository.IngredientDeleteRepository;
import org.springframework.stereotype.Service;

/**
 * <center><b>Класс сервис</b></center>
 * <p>
 *  Данный класс обрабатывает входящие данные для удаления ингредиента.
 * </p>
 *
 * @author evgeniy
 * @since 11/25/26
 */
@Service
@RequiredArgsConstructor
public class IngredientDeleteServiceImpl implements IngredientDeleteService {

    private final IngredientDeleteMapper ingredientDeleteMapper;
    private final IngredientDeleteRepository ingredientDeleteRepository;
    private static final String SUCCESS_DELETE_MESSAGE = "Ингредиент успешно удалён";

    @Override
    public IngredientDeleteResponseDtoV1 handle(Long id) {
        ingredientDeleteRepository.deleteById(id);
        return ingredientDeleteMapper.map(SUCCESS_DELETE_MESSAGE);
    }
}