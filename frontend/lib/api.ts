export async function getTenant(host: string) {
    // SSR: usa url interna do docker network
    const apiUrl = process.env.INTERNAL_API_URL || 'http://backend:8000/api/v1';
    try {
        const res = await fetch(`${apiUrl}/pousada/`, {
            headers: { 'X-Tenant-Host': host },
            cache: 'no-store',
        });
        if (!res.ok) return null;
        return res.json();
    } catch (e) {
        console.error("Erro ao buscar tenant:", e);
        return null;
    }
}
