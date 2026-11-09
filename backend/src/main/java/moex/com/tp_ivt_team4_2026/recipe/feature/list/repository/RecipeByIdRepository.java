package moex.com.tp_ivt_team4_2026.recipe.feature.list.repository;

import moex.com.tp_ivt_team4_2026.recipe.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeByIdRepository extends JpaRepository<Recipe, Long> {
}

