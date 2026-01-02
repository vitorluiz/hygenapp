'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const menuItems = [
        { label: 'Visão Geral', href: '/dashboard', icon: '📊' },
        { label: 'Reservas', href: '/dashboard/reservas', icon: '📅' },
        { label: 'Quartos', href: '/dashboard/quartos', icon: '🛏️' },
        { label: 'Financeiro', href: '/dashboard/financeiro', icon: '💰' },
        { label: 'Configurações', href: '/dashboard/config', icon: '⚙️' },
    ];

    return (
        <div className="flex min-h-screen bg-[#0E0E11] text-white font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-[#1C1C22] border-r border-white/5 flex flex-col fixed h-full">
                <div className="p-8">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-brand-gradient">Hyfen</h1>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                        ? 'bg-brand-gradient text-white shadow-lg shadow-indigo-500/20'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <span>{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                        <span>🚪</span>
                        <span>Sair</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold text-white">Painel do Proprietário</h2>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-400">Olá, Proprietário</span>
                        <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold">P</div>
                    </div>
                </header>

                {children}
            </main>
        </div>
    );
}
