"use client";

import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import PropertyCard from './PropertyCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Property {
    id: string;
    slug: string;
    name: string;
    city: string;
    state: string;
    images: { image: string }[];
    description: string;
    accommodations_count: number;
}

export default function ExplorePage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");

    const fetchProperties = async (search = "") => {
        setLoading(true);
        setError("");
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const query = search ? `?search=${encodeURIComponent(search)}` : '';
            const response = await fetch(`${apiUrl}/api/v1/public/properties/${query}`);

            if (!response.ok) {
                throw new Error('Falha ao carregar propriedades');
            }

            const data = await response.json();
            setProperties(data.results || data);
        } catch (err) {
            console.error(err);
            setError("Não foi possível carregar as propriedades. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        fetchProperties(term);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Hero Section */}
            <div className="bg-indigo-700 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')]"></div>
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                        Descubra seu próximo refúgio
                    </h1>
                    <p className="text-indigo-100 text-lg mb-8">
                        Explore as melhores pousadas, hotéis e casas de temporada.
                    </p>
                    <div className="flex justify-center">
                        <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {loading ? ( // Loading Skeleton
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-xl h-96 animate-pulse border border-gray-100 shadow-sm">
                                <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                                <div className="p-5 space-y-4">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    <div className="h-20 bg-gray-200 rounded w-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? ( // Error State
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
                            <span className="text-xl">⚠️</span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Ops! Algo deu errado.</h3>
                        <p className="text-gray-500 mb-6">{error}</p>
                        <button
                            onClick={() => fetchProperties(searchTerm)}
                            className="text-indigo-600 font-medium hover:text-indigo-800"
                        >
                            Tentar novamente
                        </button>
                    </div>
                ) : properties.length === 0 ? ( // Empty State
                    <div className="text-center py-24">
                        <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-300" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma propriedade encontrada</h3>
                        <p className="mt-1 text-sm text-gray-500">Tente ajustar sua busca por outros termos.</p>
                        <button
                            onClick={() => handleSearch("")}
                            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Ver todas as propriedades
                        </button>
                    </div>
                ) : ( // Results Grid
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">
                                {searchTerm ? `Resultados para "${searchTerm}"` : "Todas as propriedades"}
                            </h2>
                            <span className="text-sm text-gray-500">{properties.length} lugares encontrados</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {properties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
