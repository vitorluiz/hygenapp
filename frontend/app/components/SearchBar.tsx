"use client";

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
    initialValue?: string;
}

export default function SearchBar({ onSearch, initialValue = "" }: SearchBarProps) {
    const [term, setTerm] = useState(initialValue);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(term);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg relative">
            <div className="relative">
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Busque por pousada, cidade..."
                    className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-gray-700 bg-white"
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                    Buscar
                </button>
            </div>
        </form>
    );
}
