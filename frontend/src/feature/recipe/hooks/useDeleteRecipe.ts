import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useKeycloak } from '@react-keycloak/web';
import { deleteRecipe } from '../api/delete';

export const useDeleteRecipe = (onSuccess?: () => void) => {
    const { keycloak } = useKeycloak();
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            await keycloak.updateToken(30);
            const token = keycloak.token;
            if (!token) throw new Error('No token');
            return deleteRecipe(id, token);
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['recipes'] });
            onSuccess?.();
        },
    });
};