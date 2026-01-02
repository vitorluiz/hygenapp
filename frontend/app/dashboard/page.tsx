'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '../components/ui/Card';

export default function DashboardPage() {
    const router = useRouter();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            router.push('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const apiUrl = 'http://localhost:8000/api/v1';
                const res = await fetch(`${apiUrl}/dashboard/stats/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (res.status === 401) {
                    router.push('/login');
                    return;
                }

                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [router]);

    if (loading) return <div className="text-gray-400">Carregando dados...</div>;
    if (!stats) return <div className="text-red-400">Erro ao carregar dados. Verifique sua conexão.</div>;

    return (
        <div>
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{stats.property_name}</h3>
                <p className="text-gray-400">Resumo de hoje</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card title="Ocupação">
                    <div className="flex items-end space-x-2">
                        <span className="text-4xl font-bold text-white">{stats.occupancy_rate}%</span>
                        <span className="text-sm text-green-500 mb-1">↗ +5%</span>
                    </div>
                </Card>

                <Card title="Check-ins Hoje">
                    <div className="text-4xl font-bold text-white">{stats.checkins_today}</div>
                </Card>

                <Card title="Check-outs Hoje">
                    <div className="text-4xl font-bold text-white">{stats.checkouts_today}</div>
                </Card>

                <Card title="Receita (Mês)">
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-brand-gradient">
                        R$ {stats.revenue_month.toLocaleString('pt-BR')}
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2" title="Últimas Reservas">
                    <div className="text-center py-10 text-gray-500 bg-white/5 rounded-xl border border-dashed border-white/10">
                        Em breve: Lista de reservas recentes aqui.
                    </div>
                </Card>

                <Card title="Avisos">
                    <div className="space-y-4">
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <p className="text-sm text-blue-300">👋 Bem-vindo ao novo painel Hyfen!</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
