package moex.com.tp_ivt_team4_2026.ingredient.feature.additional.repository;

import moex.com.tp_ivt_team4_2026.recipe.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}
