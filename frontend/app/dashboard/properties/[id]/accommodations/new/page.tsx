'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

const ACCOMMODATION_TYPES = [
    { value: 'room', label: 'Quarto' },
    { value: 'suite', label: 'Suíte' },
    { value: 'apartment', label: 'Apartamento' },
    { value: 'house', label: 'Casa' },
    { value: 'cabin', label: 'Chalé' },
    { value: 'other', label: 'Outro' },
];

export default function NewAccommodationPage() {
    const router = useRouter();
    const params = useParams();
    const propertyId = params.id as string;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        property: propertyId,
        name: '',
        description: '',
        accommodation_type: 'room',
        max_guests: '2',
        beds: '1',
        bathrooms: '1',
        base_price: '',
        cleaning_fee: '0',
    });

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            router.push('/login');
            return;
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('access_token');
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

            const response = await fetch(`${apiUrl}/api/v1/accommodations/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Erro ao criar acomodação');
            }

            router.push(`/dashboard/properties/${propertyId}/accommodations`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Link href={`/dashboard/properties/${propertyId}/accommodations`} className="text-primary hover:text-primary-hover mb-4 inline-flex items-center gap-2">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold gradient-text mb-2">Nova Acomodação</h1>
                    <p className="text-text-secondary">Cadastre uma nova acomodação para sua propriedade</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="glass p-6 rounded-lg space-y-6">
                    {error && (
                        <div className="bg-error/10 border border-error/20 text-error p-4 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Basic Info */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Nome da Acomodação <span className="text-error">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Ex: Quarto Standard, Suíte Master"
                            className="w-full px-4 py-3 rounded-lg glass border border-border focus:border-primary focus:outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Descrição</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Descreva a acomodação..."
                            className="w-full px-4 py-3 rounded-lg glass border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Tipo <span className="text-error">*</span>
                        </label>
                        <select
                            name="accommodation_type"
                            value={formData.accommodation_type}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg glass border border-border focus:border-primary focus:outline-none transition-colors"
                        >
                            {ACCOMMODATION_TYPES.map(type => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Capacity */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Hóspedes <span className="text-error">*</span>
                            </label>
                            <input
                                type="number"
                                name="max_guests"
                                value={formData.max_guests}
                                onChange={handleChange}
                                required
                                min="1"
                                className="w-full px-4 py-3 rounded-lg glass border border-border focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Camas <span className="text-error">*</span>
                            </label>
                            <input
                                type="number"
                                name="beds"
                                value={formData.beds}
                                onChange={handleChange}
                                required
                                min="1"
                                className="w-full px-4 py-3 rounded-lg glass border border-border focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Banheiros <span className="text-error">*</span>
                            </label>
                            <input
                                type="number"
                                name="bathrooms"
                                value={formData.bathrooms}
                                onChange={handleChange}
                                required
                                min="1"
                                className="w-full px-4 py-3 rounded-lg glass border border-border focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Preço Base (por noite) <span className="text-error">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">R$</span>
                                <input
                                    type="number"
                                    name="base_price"
                                    value={formData.base_price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="w-full pl-12 pr-4 py-3 rounded-lg glass border border-border focus:border-primary focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Taxa de Limpeza</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">R$</span>
                                <input
                                    type="number"
                                    name="cleaning_fee"
                                    value={formData.cleaning_fee}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="w-full pl-12 pr-4 py-3 rounded-lg glass border border-border focus:border-primary focus:outline-none transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-4 pt-4">
                        <Link
                            href={`/dashboard/properties/${propertyId}/accommodations`}
                            className="flex-1 text-center py-3 px-6 rounded-lg glass hover:glass-strong transition-all font-medium"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 gradient-primary text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity shadow-glow disabled:opacity-50"
                        >
                            {loading ? 'Criando...' : 'Criar Acomodação'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
