import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './feature/home/HomePage'
import RecipePage from './feature/recipe/RecipePage'
import RecipesListPage from './feature/recipesList/RecipesListPage'
import RecipeCreatePage from './feature/recipe-create/RecipeCreatePage'
import RecipeEditPage from './feature/recipe-edit/RecipeEditPage'
import TestModalPage from './feature/productsList/TestModalPage'
function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipesListPage />} />
        <Route path="/recipes/new" element={<RecipeCreatePage />} />
        <Route path="/recipes/:id/edit" element={<RecipeEditPage />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="/my-recipes" element={<div>Мои рецепты</div>} />
        <Route path="/favorites" element={<div>Избранное</div>} />
        <Route path="/profile" element={<div>Профиль</div>} />
        <Route path="/products" element={<TestModalPage/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  )
}

export default App
