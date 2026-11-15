export const deleteRecipe = async (id: number, token: string): Promise<void> => {
    const res = await fetch(`http://localhost:8080/api/v1/recipes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
};