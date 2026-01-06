'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/app/components/ImageUpload';

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
    const propertyId = params.id as string;
    const accommodationId = params.accommodationId as string;
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
    }, [accommodationId, router]);

    const fetchAccommodation = async (token: string) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/api/v1/accommodations/${accommodationId}/`, {
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
            const response = await fetch(`${apiUrl}/api/v1/accommodations/${accommodationId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar acomodação');
            }

            router.push(`/dashboard/properties/${propertyId}/accommodations`);
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
                        <Link href={`/dashboard/properties/${propertyId}/accommodations`} className="text-primary hover:text-primary-hover mt-4 inline-block">
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
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <Link href={`/dashboard/properties/${propertyId}/accommodations`} className="text-primary hover:text-primary-hover mb-4 inline-flex items-center gap-2">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Voltar
                        </Link>
                        <h1 className="text-3xl font-bold gradient-text mb-2">{accommodation.name}</h1>
                        <p className="text-text-secondary">{accommodation.property_name} • {ACCOMMODATION_TYPES[accommodation.accommodation_type] || accommodation.accommodation_type}</p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href={`/dashboard/properties/${propertyId}/accommodations/${accommodationId}/edit`}
                            className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-hover transition-colors font-medium"
                        >
                            Editar
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="bg-error/10 text-error px-4 py-2 rounded-lg hover:bg-error/20 transition-colors font-medium border border-error/20"
                        >
                            Excluir
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Details Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Images Section */}
                        <div className="glass p-6 rounded-lg">
                            <ImageUpload
                                accommodationId={accommodation.id}
                                existingImages={accommodation.images}
                                onImageChange={() => {
                                    const token = localStorage.getItem('access_token');
                                    if (token) fetchAccommodation(token);
                                }}
                            />
                        </div>

                        {/* Description */}
                        {accommodation.description && (
                            <div className="glass p-6 rounded-lg">
                                <h2 className="text-xl font-semibold mb-4">Descrição</h2>
                                <p className="text-text-secondary whitespace-pre-line">{accommodation.description}</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Details */}
                    <div className="space-y-6">
                        <div className="glass p-6 rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold">Detalhes</h2>
                                <div className={`px-2 py-1 rounded text-xs font-semibold ${accommodation.is_active ? 'bg-success/20 text-success' : 'bg-text-muted/20 text-text-muted'}`}>
                                    {accommodation.is_active ? 'ATIVO' : 'INATIVO'}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-border">
                                    <span className="text-text-secondary">Preço Base</span>
                                    <span className="text-xl font-bold gradient-text">R$ {parseFloat(accommodation.base_price).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-border">
                                    <span className="text-text-secondary">Hóspedes</span>
                                    <span className="font-semibold">{accommodation.max_guests}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-border">
                                    <span className="text-text-secondary">Camas</span>
                                    <span className="font-semibold">{accommodation.beds}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-border">
                                    <span className="text-text-secondary">Banheiros</span>
                                    <span className="font-semibold">{accommodation.bathrooms}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-text-secondary">Taxa Limpeza</span>
                                    <span className="font-semibold">R$ {parseFloat(accommodation.cleaning_fee).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
