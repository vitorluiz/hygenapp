'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Property {
    id: string;
    name: string;
    city: string;
    state: string;
    country: string;
    is_active: boolean;
    created_at: string;
    accommodations_count: number;
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            router.push('/login');
            return;
        }

        setUser(JSON.parse(userData));
        fetchProperties(token);
    }, [router]);

    const fetchProperties = async (token: string) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/api/v1/properties/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 401) {
                // Token expirado - redirecionar para login
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('user');
                router.push('/login');
                return;
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || 'Erro ao carregar propriedades');
            }

            const data = await response.json();
            setProperties(data.results || data);
        } catch (err: any) {
            console.error('Erro ao buscar propriedades:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        router.push('/');
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-8 h-8">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.92157L16.25 7.75M4.92157 19.0784L7.75 16.25M4.92157 4.92157L7.75 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} glass-strong border-r border-border transition-all duration-300 flex flex-col`}>
                {/* Logo */}
                <div className="p-6 border-b border-border">
                    <h1 className={`font-bold gradient-text ${sidebarOpen ? 'text-2xl' : 'text-xl text-center'}`}>
                        {sidebarOpen ? 'Hy-fen' : 'Hy'}
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {sidebarOpen && <span className="font-medium">Dashboard</span>}
                    </Link>

                    <Link href="/dashboard/properties" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-surface hover:text-text-primary transition-colors">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {sidebarOpen && <span className="font-medium">Propriedades</span>}
                    </Link>

                    <Link href="/bookings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-surface hover:text-text-primary transition-colors">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {sidebarOpen && <span className="font-medium">Reservas</span>}
                    </Link>

                    <Link href="/reports" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-surface hover:text-text-primary transition-colors">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3V21H21M7 16L12 11L16 15L21 10M21 10V14M21 10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {sidebarOpen && <span className="font-medium">Relatórios</span>}
                    </Link>
                </nav>

                {/* Toggle button */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-4 border-t border-border hover:bg-surface transition-colors"
                >
                    <svg className={`w-5 h-5 transition-transform ${!sidebarOpen && 'rotate-180'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="glass border-b border-border p-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold">Dashboard</h2>
                        <p className="text-text-secondary text-sm">Bem-vindo, {user.first_name || user.username}!</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* User menu */}
                        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-surface">
                            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                                {(user.first_name?.[0] || user.username[0]).toUpperCase()}
                            </div>
                            <div className="text-sm">
                                <p className="font-medium">{user.first_name || user.username}</p>
                                <p className="text-text-muted text-xs">{user.email}</p>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-lg hover:bg-surface transition-colors text-text-secondary hover:text-error"
                            title="Sair"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-8 overflow-auto">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="glass-strong p-6 rounded-lg hover:scale-[1.02] transition-transform">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-text-secondary text-sm font-medium">Propriedades</h3>
                                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-4xl font-bold gradient-text mb-2">{properties.length}</p>
                            <p className="text-text-muted text-sm mb-4">
                                {properties.length === 0 ? 'Nenhuma cadastrada' : `${properties.length === 1 ? 'propriedade' : 'propriedades'}`}
                            </p>
                            <div className="flex gap-2">
                                <Link href="/dashboard/properties" className="flex-1 text-center py-2 px-3 rounded-lg glass hover:glass-strong transition-all text-xs font-medium">
                                    Ver Todas
                                </Link>
                                <Link href="/dashboard/properties/new" className="flex-1 text-center py-2 px-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all text-xs font-medium">
                                    + Nova
                                </Link>
                            </div>
                        </div>

                        <div className="glass-strong p-6 rounded-lg hover:scale-[1.02] transition-transform">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-text-secondary text-sm font-medium">Acomodações</h3>
                                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7M3 7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7M3 7H21M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-4xl font-bold mb-2">{Array.isArray(properties) ? properties.reduce((sum, p) => sum + p.accommodations_count, 0) : 0}</p>
                            <p className="text-text-muted text-sm">Total de acomodações</p>
                        </div>

                        <div className="glass-strong p-6 rounded-lg hover:scale-[1.02] transition-transform">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-text-secondary text-sm font-medium">Reservas Ativas</h3>
                                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-4xl font-bold mb-2">0</p>
                            <p className="text-text-muted text-sm">Em breve</p>
                        </div>

                        <div className="glass-strong p-6 rounded-lg hover:scale-[1.02] transition-transform">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-text-secondary text-sm font-medium">Receita Mensal</h3>
                                <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-success" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-4xl font-bold mb-2">R$ 0</p>
                            <p className="text-text-muted text-sm">Em breve</p>
                        </div>
                    </div>

                    {/* Properties List or Welcome Card */}
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin w-8 h-8">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.92157L16.25 7.75M4.92157 19.0784L7.75 16.25M4.92157 4.92157L7.75 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="glass-strong p-6 rounded-lg text-center">
                            <p className="text-error">{error}</p>
                        </div>
                    ) : properties.length > 0 ? (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold">Minhas Propriedades</h3>
                                <Link
                                    href="/dashboard/properties/new"
                                    className="gradient-primary text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity shadow-glow inline-flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Nova Propriedade
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {properties.map((property) => (
                                    <div key={property.id} className="glass p-6 rounded-lg hover:glass-strong transition-all">
                                        <h4 className="text-lg font-semibold mb-2">{property.name}</h4>
                                        <p className="text-text-secondary text-sm mb-4">
                                            {property.city}, {property.state} - {property.country}
                                        </p>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-text-muted">
                                                {property.accommodations_count} {property.accommodations_count === 1 ? 'acomodação' : 'acomodações'}
                                            </span>
                                            <Link
                                                href={`/dashboard/properties/${property.id}`}
                                                className="text-primary hover:text-primary-hover"
                                            >
                                                Ver detalhes →
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="glass-strong p-8 rounded-lg text-center max-w-2xl mx-auto">
                            <div className="w-16 h-16 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">Bem-vindo ao Hyfen!</h3>
                            <p className="text-text-secondary mb-6">
                                Você ainda não cadastrou nenhuma propriedade. Comece agora para gerenciar suas hospedagens.
                            </p>
                            <Link
                                href="/dashboard/properties/new"
                                className="gradient-primary text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity shadow-glow inline-flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Cadastrar Primeira Propriedade
                            </Link>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
