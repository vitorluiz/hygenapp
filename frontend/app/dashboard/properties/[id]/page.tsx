'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Property {
    id: string;
    name: string;
    description: string;
    city: string;
    state: string;
    country: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    accommodations_count: number;
    images_count: number;
    logo: string;
    primary_color: string;
}

export default function PropertyDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            router.push('/login');
            return;
        }

        fetchProperty(token);
    }, [id, router]);

    const fetchProperty = async (token: string) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/api/v1/properties/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar propriedade');
            }

            const data = await response.json();
            setProperty(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
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

    if (error || !property) {
        return (
            <div className="min-h-screen p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="glass-strong p-6 rounded-lg text-center">
                        <p className="text-error">{error || 'Propriedade não encontrada'}</p>
                        <Link href="/dashboard" className="text-primary hover:text-primary-hover mt-4 inline-block">
                            ← Voltar ao Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Link href="/dashboard" className="text-primary hover:text-primary-hover mb-4 inline-flex items-center gap-2">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Voltar ao Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold gradient-text mb-2">{property.name}</h1>
                    <p className="text-text-secondary">{property.city}, {property.state} - {property.country}</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="glass p-6 rounded-lg">
                        <h3 className="text-sm font-medium text-text-secondary mb-2">Acomodações</h3>
                        <p className="text-3xl font-bold gradient-text">{property.accommodations_count}</p>
                    </div>
                    <div className="glass p-6 rounded-lg">
                        <h3 className="text-sm font-medium text-text-secondary mb-2">Fotos</h3>
                        <p className="text-3xl font-bold">{property.images_count}</p>
                    </div>
                    <div className="glass p-6 rounded-lg">
                        <h3 className="text-sm font-medium text-text-secondary mb-2">Cor Primária</h3>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg border-2 border-border" style={{ backgroundColor: property.primary_color }}></div>
                            <span className="font-mono text-sm">{property.primary_color}</span>
                        </div>
                    </div>
                </div>

                {/* Main Info */}
                <div className="glass p-6 rounded-lg mb-6">
                    <h2 className="text-xl font-semibold mb-4">Informações</h2>
                    {property.description && (
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-text-secondary mb-2">Descrição</h3>
                            <p className="text-text-primary">{property.description}</p>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-medium text-text-secondary mb-2">Endereço</h3>
                            <p className="text-text-primary">{property.address}</p>
                            <p className="text-text-secondary text-sm">{property.city}, {property.state} - {property.country}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-text-secondary mb-2">Contato</h3>
                            {property.phone && <p className="text-text-primary">📞 {property.phone}</p>}
                            {property.email && <p className="text-text-primary">✉️ {property.email}</p>}
                            {property.website && (
                                <a href={property.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-hover">
                                    🌐 {property.website}
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        href={`/dashboard/properties/${id}/accommodations`}
                        className="text-center gradient-primary text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity shadow-glow"
                    >
                        Gerenciar Acomodações ({property.accommodations_count})
                    </Link>
                    <Link
                        href={`/dashboard/properties/${id}/customize`}
                        className="text-center bg-secondary/10 text-secondary font-semibold py-3 px-6 rounded-lg hover:bg-secondary/20 transition-colors"
                    >
                        Personalizar
                    </Link>
                    <Link
                        href={`/dashboard/properties/${id}/edit`}
                        className="text-center glass hover:glass-strong font-semibold py-3 px-6 rounded-lg transition-all"
                    >
                        Editar Informações
                    </Link>
                </div>
            </div>
        </div>
    );
}
