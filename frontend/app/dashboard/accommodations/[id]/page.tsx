'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Accommodation {
    id: string;
    name: string;
    description: string;
    accommodation_type: string;
    max_guests: number;
    beds: number;
    bathrooms: number;
    base_price: string;
    cleaning_fee: string;
    property_name: string;
    property: string;
    images: any[];
    created_at: string;
}

const ACCOMMODATION_TYPES: Record<string, string> = {
    'room': 'Quarto',
    'suite': 'Suíte',
    'apartment': 'Apartamento',
    'house': 'Casa',
    'cabin': 'Chalé',
    'other': 'Outro',
};

export default function AccommodationDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [accommodation, setAccommodation] = useState<Accommodation | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            router.push('/login');
            return;
        }

        fetchAccommodation(token);
    }, [id, router]);

    const fetchAccommodation = async (token: string) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/api/v1/accommodations/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar acomodação');
            }

            const data = await response.json();
            setAccommodation(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Tem certeza que deseja deletar esta acomodação?')) {
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/api/v1/accommodations/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar acomodação');
            }

            router.push('/dashboard/accommodations');
        } catch (err: any) {
            alert(err.message);
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

    if (error || !accommodation) {
        return (
            <div className="min-h-screen p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="glass-strong p-6 rounded-lg text-center">
                        <p className="text-error">{error || 'Acomodação não encontrada'}</p>
                        <Link href="/dashboard/accommodations" className="text-primary hover:text-primary-hover mt-4 inline-block">
                            ← Voltar para acomodações
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Link href="/dashboard/accommodations" className="text-primary hover:text-primary-hover mb-4 inline-flex items-center gap-2">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Voltar
                    </Link>
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-bold gradient-text mb-2">{accommodation.name}</h1>
                            <p className="text-text-secondary">{accommodation.property_name}</p>
                        </div>
                        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
                            {ACCOMMODATION_TYPES[accommodation.accommodation_type] || accommodation.accommodation_type}
                        </span>
                    </div>
                </div>

                {/* Main Info */}
                <div className="glass p-6 rounded-lg mb-6">
                    <h2 className="text-xl font-semibold mb-4">Informações</h2>

                    {accommodation.description && (
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-text-secondary mb-2">Descrição</h3>
                            <p className="text-text-primary">{accommodation.description}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h3 className="text-sm font-medium text-text-secondary mb-2">Capacidade</h3>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-lg font-semibold">{accommodation.max_guests} hóspedes</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-text-secondary mb-2">Camas</h3>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7M3 7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7M3 7H21M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-lg font-semibold">{accommodation.beds} {accommodation.beds === 1 ? 'cama' : 'camas'}</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-text-secondary mb-2">Banheiros</h3>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 6L9 4C9 3.46957 9.21071 2.96086 9.58579 2.58579C9.96086 2.21071 10.4696 2 11 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V6M9 6H15M9 6H5C3.89543 6 3 6.89543 3 8V9M15 6H19C20.1046 6 21 6.89543 21 8V9M3 9V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V9M3 9H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-lg font-semibold">{accommodation.bathrooms} {accommodation.bathrooms === 1 ? 'banheiro' : 'banheiros'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing */}
                <div className="glass p-6 rounded-lg mb-6">
                    <h2 className="text-xl font-semibold mb-4">Preços</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-medium text-text-secondary mb-2">Preço base (por noite)</h3>
                            <p className="text-3xl font-bold gradient-text">R$ {parseFloat(accommodation.base_price).toFixed(2)}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-text-secondary mb-2">Taxa de limpeza</h3>
                            <p className="text-3xl font-bold">R$ {parseFloat(accommodation.cleaning_fee).toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                {/* Images */}
                {accommodation.images && accommodation.images.length > 0 && (
                    <div className="glass p-6 rounded-lg mb-6">
                        <h2 className="text-xl font-semibold mb-4">Fotos ({accommodation.images.length})</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {accommodation.images.map((image: any) => (
                                <div key={image.id} className="aspect-video rounded-lg overflow-hidden bg-surface">
                                    <img
                                        src={image.image}
                                        alt={image.caption || accommodation.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-4">
                    <Link
                        href={`/dashboard/accommodations/${id}/edit`}
                        className="flex-1 text-center gradient-primary text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Editar
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="flex-1 text-center bg-error/10 text-error font-semibold py-3 px-6 rounded-lg hover:bg-error/20 transition-colors"
                    >
                        Deletar
                    </button>
                </div>
            </div>
        </div>
    );
}
