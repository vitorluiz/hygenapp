"use client";

import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon } from '@heroicons/react/24/solid';

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

export default function PropertyCard({ property }: { property: Property }) {
    // Definir imagem de capa (primeira da lista ou placeholder)
    const coverImage = property.images && property.images.length > 0
        ? property.images[0].image
        : '/placeholder-property.jpg';

    return (
        <Link href={`/public/${property.slug}`} className="group block h-full">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col border border-gray-100">
                <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
                    {property.images && property.images.length > 0 ? (
                        <img
                            src={coverImage}
                            alt={property.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                            <span className="text-sm">Sem foto</span>
                        </div>
                    )}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-gray-700 shadow-sm">
                        {property.accommodations_count} acomodações
                    </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                            {property.name}
                        </h3>
                    </div>

                    <div className="flex items-center text-gray-500 text-sm mb-3">
                        <MapPinIcon className="h-4 w-4 mr-1 text-indigo-500" />
                        {property.city}, {property.state}
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
                        {property.description}
                    </p>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-indigo-600 font-medium text-sm">Ver detalhes</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
