'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Image {
    id: string;
    image: string;
    caption: string;
    order: number;
}

interface ImageUploadProps {
    accommodationId?: string;
    propertyId?: string;
    existingImages: Image[];
    onImageChange: () => void;
}

export default function ImageUpload({ accommodationId, propertyId, existingImages, onImageChange }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        setError('');

        const token = localStorage.getItem('access_token');
        if (!token) {
            setError('Usuário não autenticado');
            setUploading(false);
            return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

        // Upload each file
        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('image', files[i]);
            if (accommodationId) formData.append('accommodation', accommodationId);
            if (propertyId) formData.append('property', propertyId);

            try {
                const response = await fetch(`${apiUrl}/api/v1/images/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Falha no upload');
                }
            } catch (err) {
                console.error('Erro no upload:', err);
                setError('Erro ao fazer upload de algumas imagens.');
            }
        }

        setUploading(false);
        onImageChange(); // Refresh parent

        // Reset input
        e.target.value = '';
    };

    const handleDelete = async (imageId: string) => {
        if (!confirm('Tem certeza que deseja excluir esta imagem?')) return;

        const token = localStorage.getItem('access_token');
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

        try {
            const response = await fetch(`${apiUrl}/api/v1/images/${imageId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Falha ao excluir');
            }

            onImageChange();
        } catch (err) {
            console.error('Erro ao excluir:', err);
            setError('Erro ao excluir imagem.');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Fotos</h3>
                <label className={`
                    cursor-pointer bg-primary text-white px-4 py-2 rounded-lg 
                    hover:bg-primary-hover transition-colors flex items-center gap-2
                    ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
                `}>
                    {uploading ? (
                        <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enviando...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Adicionar Fotos
                        </>
                    )}
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                </label>
            </div>

            {error && (
                <div className="bg-error/10 border border-error/20 text-error p-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {existingImages.length === 0 ? (
                <div className="text-center py-12 glass border-dashed border-2 border-border rounded-lg">
                    <p className="text-text-secondary">Nenhuma foto adicionada ainda.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {existingImages.map((img) => (
                        <div key={img.id} className="group relative aspect-square rounded-lg overflow-hidden glass">
                            <img
                                src={img.image}
                                alt={img.caption || 'Foto da acomodação'}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                    onClick={() => handleDelete(img.id)}
                                    className="p-2 bg-error text-white rounded-full hover:bg-error-hover transition-colors"
                                    title="Excluir"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
