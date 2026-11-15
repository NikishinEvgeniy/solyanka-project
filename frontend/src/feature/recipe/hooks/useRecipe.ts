import { useQuery } from '@tanstack/react-query';
import { useKeycloak } from '@react-keycloak/web';
import type { RecipeData } from '../model/Recipe';

type ErrorResponseV1 = { message: string };

const extractErrorMessage = async (response: Response): Promise<string> => {
    try {
        const body: Partial<ErrorResponseV1> = await response.json();
        return body.message ?? `HTTP ${response.status}`;
    } catch {
        return `HTTP ${response.status}`;
    }
};

export const useRecipe = (id?: string) => {
    const { keycloak } = useKeycloak();

    return useQuery({
        queryKey: ['recipe', id],
        enabled: !!id && keycloak.authenticated && !!keycloak.token,
        queryFn: async ({ signal }) => {
            await keycloak.updateToken(30);

            const token = keycloak.token;
            if (!token) throw new Error('No token');
            const response = await fetch(`http://localhost:8080/api/v1/recipes/${id}`, {
                signal,
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                throw new Error(await extractErrorMessage(response));
            }
            return response.json() as Promise<RecipeData>;
        },
    });
};