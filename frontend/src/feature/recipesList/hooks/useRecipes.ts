import { recipeApiBase } from '../../../library/api/recipeApiBase';
import { useQuery } from '@tanstack/react-query';
import { useKeycloak } from '@react-keycloak/web';

type ServerRecipe = {
  id: number;
  title: string;
  image_url: string;
};

type RecipesResponse = {
  recipes: ServerRecipe[];
};

const extractErrorMessage = async (response: Response): Promise<string> => {
  try {
    const body: { message?: string } = await response.json();
    return body.message ?? `HTTP ${response.status}`;
  } catch {
    return `HTTP ${response.status}`;
  }
};

export async function fetchRecipes(token: string, signal?: AbortSignal) {
  const response = await fetch(`${recipeApiBase}/api/v1/recipes`, {
    signal,
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(await extractErrorMessage(response));
  }

  const data = (await response.json()) as RecipesResponse;

  // Преобразуем данные для удобства фронтенда
  return data.recipes.map((item) => ({
    id: item.id,
    title: item.title,
    imageUrl: item.image_url,
  }));
}

export const useRecipes = () => {
  const { keycloak } = useKeycloak();

  return useQuery({
    queryKey: ['recipes'],
    enabled: keycloak.authenticated && !!keycloak.token,
    queryFn: async ({ signal }) => {
      await keycloak.updateToken(30);
      const token = keycloak.token;
      if (!token) throw new Error('No token');

      return fetchRecipes(token, signal);
    },
  });
};