'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Property {
    id: string;
    name: string;
    slug: string;
    city: string;
    state: string;
    country: string;
    is_active: boolean;
    created_at: string;
    accommodations_count: number;
}

export default function PropertiesPage() {
    const router = useRouter();
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                router.push('/login');
                return;
            }

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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-12 h-12">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.92157L16.25 7.75M4.92157 19.0784L7.75 16.25M4.92157 4.92157L7.75 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="glass border-b border-border p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-text-secondary hover:text-text-primary">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-semibold">Minhas Propriedades</h1>
                            <p className="text-text-secondary text-sm">Gerencie todas as suas propriedades</p>
                        </div>
                    </div>
                    <Link
                        href="/dashboard/properties/new"
                        className="gradient-primary text-white font-semibold py-2.5 px-6 rounded-lg hover:opacity-90 transition-opacity shadow-glow inline-flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Nova Propriedade
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto p-8">
                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-error/10 border border-error/20 text-error">
                        {error}
                    </div>
                )}

                {properties.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full glass-strong flex items-center justify-center">
                            <svg className="w-12 h-12 text-text-muted" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">Nenhuma propriedade cadastrada</h2>
                        <p className="text-text-secondary mb-6">Comece cadastrando sua primeira propriedade</p>
                        <Link
                            href="/dashboard/properties/new"
                            className="gradient-primary text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity inline-block shadow-glow"
                        >
                            Cadastrar Primeira Propriedade
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map((property) => (
                            <div key={property.id} className="glass-strong rounded-lg overflow-hidden hover:scale-[1.02] transition-transform">
                                {/* Card Header */}
                                <div className="gradient-primary p-6 text-white">
                                    <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
                                    <p className="text-white/80 text-sm flex items-center gap-1">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {property.city}, {property.state}
                                    </p>
                                </div>

                                {/* Card Body */}
                                <div className="p-6 space-y-4">
                                    {/* Stats */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-text-muted text-xs mb-1">Acomodações</p>
                                            <p className="text-2xl font-bold">{property.accommodations_count}</p>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${property.is_active ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
                                            {property.is_active ? 'Ativa' : 'Inativa'}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 pt-4 border-t border-border">
                                        <Link
                                            href={`/dashboard/properties/${property.id}`}
                                            className="flex-1 text-center py-2 px-4 rounded-lg glass hover:glass-strong transition-all text-sm font-medium"
                                        >
                                            Ver Detalhes
                                        </Link>
                                        <Link
                                            href={`/public/${property.slug}`}
                                            target="_blank"
                                            className="flex-1 text-center py-2 px-4 rounded-lg glass hover:glass-strong transition-all text-sm font-medium flex items-center justify-center gap-1"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11M15 3H21M21 3V9M21 3L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Landing
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
