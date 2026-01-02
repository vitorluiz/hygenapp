'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState<any>(null);
    const [clients, setClients] = useState<any[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            router.push('/admin/login');
            return;
        }

        const fetchData = async () => {
            try {
                const apiUrl = 'http://localhost:8000/api/v1';

                // Fetch Stats
                const resStats = await fetch(`${apiUrl}/saas/stats/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (resStats.ok) setStats(await resStats.json());

                // Fetch Clients
                const resClients = await fetch(`${apiUrl}/saas/clients/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (resClients.ok) setClients(await resClients.json());

            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [router]);

    if (!stats) return <div className="p-8 text-center text-gray-500">Carregando Dashboard...</div>;

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <nav className="bg-white shadow p-4 mb-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold text-slate-800">Hyfen Admin</h1>
                    <button
                        onClick={() => { localStorage.removeItem('admin_token'); router.push('/admin/login') }}
                        className="text-red-500 hover:text-red-700 text-sm font-semibold"
                    >
                        Sair
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                        <p className="text-gray-500 text-sm font-bold uppercase">MRR (Mensal)</p>
                        <p className="text-3xl font-extrabold text-gray-800">R$ {stats.mrr.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                        <p className="text-gray-500 text-sm font-bold uppercase">Clientes Ativos</p>
                        <p className="text-3xl font-extrabold text-gray-800">{stats.active_subscriptions}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
                        <p className="text-gray-500 text-sm font-bold uppercase">Total Pousadas</p>
                        <p className="text-3xl font-extrabold text-gray-800">{stats.total_clients}</p>
                    </div>
                </div>

                {/* Clients Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-bold text-gray-800">Lista de Pousadas</h2>
                    </div>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-sm uppercase">
                                <th className="px-6 py-3 font-medium">Nome</th>
                                <th className="px-6 py-3 font-medium">Domínio</th>
                                <th className="px-6 py-3 font-medium">Plano</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {clients.map((client) => (
                                <tr key={client.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{client.name}</td>
                                    <td className="px-6 py-4 text-gray-600 font-mono text-sm">{client.domain}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">{client.plan}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {client.status === 'Ativo' ? (
                                            <span className="text-green-600 font-bold text-sm">● Ativo</span>
                                        ) : (
                                            <span className="text-red-500 font-bold text-sm">● Inativo</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {clients.length === 0 && <div className="p-8 text-center text-gray-500">Nenhum cliente encontrado.</div>}
                </div>
            </div>
        </div>
    );
}
