'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            router.push('/login');
            return;
        }

        setUser(JSON.parse(userData));
    }, [router]);

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
                    <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {sidebarOpen && <span className="font-medium">Dashboard</span>}
                    </a>

                    <a href="/properties" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-surface hover:text-text-primary transition-colors">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {sidebarOpen && <span className="font-medium">Propriedades</span>}
                    </a>

                    <a href="/bookings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-surface hover:text-text-primary transition-colors">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {sidebarOpen && <span className="font-medium">Reservas</span>}
                    </a>

                    <a href="/reports" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-surface hover:text-text-primary transition-colors">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3V21H21M7 16L12 11L16 15L21 10M21 10V14M21 10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {sidebarOpen && <span className="font-medium">Relatórios</span>}
                    </a>
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
                        <div className="glass p-6 rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-text-secondary text-sm font-medium">Propriedades</h3>
                                <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p className="text-3xl font-bold">0</p>
                            <p className="text-text-muted text-sm mt-1">Nenhuma propriedade cadastrada</p>
                        </div>

                        <div className="glass p-6 rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-text-secondary text-sm font-medium">Acomodações</h3>
                                <svg className="w-8 h-8 text-secondary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7M3 7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7M3 7H21M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p className="text-3xl font-bold">0</p>
                            <p className="text-text-muted text-sm mt-1">Nenhuma acomodação cadastrada</p>
                        </div>

                        <div className="glass p-6 rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-text-secondary text-sm font-medium">Reservas Ativas</h3>
                                <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p className="text-3xl font-bold">0</p>
                            <p className="text-text-muted text-sm mt-1">Nenhuma reserva ativa</p>
                        </div>

                        <div className="glass p-6 rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-text-secondary text-sm font-medium">Receita Mensal</h3>
                                <svg className="w-8 h-8 text-success" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p className="text-3xl font-bold">R$ 0,00</p>
                            <p className="text-text-muted text-sm mt-1">Nenhuma receita registrada</p>
                        </div>
                    </div>

                    {/* Welcome Card */}
                    <div className="glass-strong p-8 rounded-lg text-center max-w-2xl mx-auto">
                        <div className="w-16 h-16 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 15L12 12M12 9L12.01 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">Bem-vindo ao Hyfen!</h3>
                        <p className="text-text-secondary mb-6">
                            Comece cadastrando sua primeira propriedade para começar a gerenciar suas hospedagens.
                        </p>
                        <button className="gradient-primary text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity shadow-glow inline-flex items-center gap-2">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Cadastrar Propriedade
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}
