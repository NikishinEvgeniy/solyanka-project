import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './feature/home/HomePage'
import RecipePage from './feature/recipe/RecipePage'

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<div>Все рецепты</div>} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="/my-recipes" element={<div>Мои рецепты</div>} />
        <Route path="/favorites" element={<div>Избранное</div>} />
        <Route path="/profile" element={<div>Профиль</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  )
}

export default App