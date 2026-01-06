'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Accommodation {
    id: string;
    name: string;
    accommodation_type: string;
    max_guests: number;
    base_price: string;
    is_active: boolean;
    property_name: string;
    images_count: number;
}

const ACCOMMODATION_TYPES: Record<string, string> = {
    'room': 'Quarto',
    'suite': 'Suíte',
    'apartment': 'Apartamento',
    'house': 'Casa',
    'cabin': 'Chalé',
    'other': 'Outro',
};

export default function AccommodationsPage() {
    const router = useRouter();
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            router.push('/login');
            return;
        }

        fetchAccommodations(token);
    }, [router]);

    const fetchAccommodations = async (token: string) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/api/v1/accommodations/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar acomodações');
            }

            const data = await response.json();
            setAccommodations(data.results || data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold gradient-text mb-2">Acomodações</h1>
                        <p className="text-text-secondary">Gerencie todas as suas acomodações</p>
                    </div>
                    <Link
                        href="/dashboard/accommodations/new"
                        className="gradient-primary text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity shadow-glow inline-flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Nova Acomodação
                    </Link>
                </div>

                {/* Content */}
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
                ) : accommodations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {accommodations.map((accommodation) => (
                            <div key={accommodation.id} className="glass p-6 rounded-lg hover:glass-strong transition-all">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1">{accommodation.name}</h3>
                                        <p className="text-text-secondary text-sm">{accommodation.property_name}</p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                        {ACCOMMODATION_TYPES[accommodation.accommodation_type] || accommodation.accommodation_type}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Até {accommodation.max_guests} hóspedes
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {accommodation.images_count} {accommodation.images_count === 1 ? 'foto' : 'fotos'}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                    <div>
                                        <p className="text-2xl font-bold gradient-text">R$ {parseFloat(accommodation.base_price).toFixed(2)}</p>
                                        <p className="text-text-muted text-xs">por noite</p>
                                    </div>
                                    <Link
                                        href={`/dashboard/accommodations/${accommodation.id}`}
                                        className="text-primary hover:text-primary-hover font-medium text-sm"
                                    >
                                        Ver detalhes →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="glass-strong p-8 rounded-lg text-center max-w-2xl mx-auto">
                        <div className="w-16 h-16 rounded-full bg-secondary/20 mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-secondary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7M3 7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7M3 7H21M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">Nenhuma acomodação cadastrada</h3>
                        <p className="text-text-secondary mb-6">
                            Comece cadastrando suas primeiras acomodações para gerenciar suas hospedagens.
                        </p>
                        <Link
                            href="/dashboard/accommodations/new"
                            className="gradient-primary text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity shadow-glow inline-flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Cadastrar Primeira Acomodação
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
