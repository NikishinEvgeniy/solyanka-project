package moex.com.tp_ivt_team4_2026.ingredient.feature.delete.repository;

import moex.com.tp_ivt_team4_2026.ingredient.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * <center><b>Интерфейс репозиторий</b></center>
 * <p>
 *  Данный интерфейс задает контракт для оперирования данными внутри функционала "Удаление ингредиента".
 * </p>
 *
 * @author evgeniy
 * @since 11/25/26
 */
public interface IngredientDeleteRepository extends JpaRepository<Ingredient, Long> {
}