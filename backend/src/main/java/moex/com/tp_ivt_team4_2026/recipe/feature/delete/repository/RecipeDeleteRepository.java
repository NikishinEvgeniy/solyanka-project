package moex.com.tp_ivt_team4_2026.recipe.feature.delete.repository;

import moex.com.tp_ivt_team4_2026.recipe.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeDeleteRepository extends JpaRepository<Recipe, Long> {
}