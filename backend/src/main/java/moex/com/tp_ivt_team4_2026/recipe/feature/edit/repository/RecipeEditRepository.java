package moex.com.tp_ivt_team4_2026.recipe.feature.edit.repository;

import moex.com.tp_ivt_team4_2026.recipe.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeEditRepository extends JpaRepository<Recipe, Long> {
}