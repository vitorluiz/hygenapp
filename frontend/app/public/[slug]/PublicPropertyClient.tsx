'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Property {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    website: string;
    instagram: string;
    facebook: string;
    youtube: string;
    tiktok: string;
    whatsapp: string;
    accommodations_count: number;
    logo: string;
    primary_color: string;
}

interface Props {
    slug: string;
}

export default function PublicPropertyClient({ slug }: Props) {
    // const params = useParams(); // Slug vindo via props agora

    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProperty();
    }, [slug]);

    const fetchProperty = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/api/v1/public/properties/${slug}/`);

            if (!response.ok) {
                throw new Error('Propriedade não encontrada');
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
                <div className="animate-spin w-12 h-12">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.92157L16.25 7.75M4.92157 19.0784L7.75 16.25M4.92157 4.92157L7.75 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full glass-strong flex items-center justify-center">
                        <svg className="w-8 h-8 text-error" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0377 2.66667 10.2679 4L3.33975 16C2.56995 17.3333 3.53223 19 5.07183 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Propriedade não encontrada</h1>
                    <p className="text-text-secondary mb-6">{error}</p>
                    <Link href="/" className="gradient-primary text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity inline-block">
                        Voltar para Início
                    </Link>
                </div>
            </div>
        );
    }

    const primaryColor = property.primary_color || '#6366f1';

    // Convert hex to rgb for opacity handling if needed, strictly simpler here
    const gradientStyle = {
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`
    };

    return (
        <div className="min-h-screen bg-background" style={{ '--primary-color': primaryColor } as React.CSSProperties}>
            {/* Hero Section */}
            <section className="relative h-96 glass-strong border-b border-border overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundColor: primaryColor }}></div>
                <div className="relative h-full flex items-center justify-center text-center p-8">
                    <div>
                        {property.logo ? (
                            <img
                                src={property.logo}
                                alt={`Logo ${property.name}`}
                                className="h-32 w-auto mx-auto mb-6 object-contain drop-shadow-lg"
                            />
                        ) : null}
                        <h1 className="text-5xl font-bold mb-4" style={{ color: primaryColor }}>{property.name}</h1>
                        <p className="text-xl text-text-secondary flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {property.city}, {property.state} - {property.country}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <div className="max-w-6xl mx-auto p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        {property.description && (
                            <div className="glass-strong p-6 rounded-lg">
                                <h2 className="text-2xl font-semibold mb-4">Sobre</h2>
                                <p className="text-text-secondary whitespace-pre-line">{property.description}</p>
                            </div>
                        )}

                        {/* Accommodations */}
                        <div className="glass-strong p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4">Acomodações</h2>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg" style={gradientStyle}>
                                    {property.accommodations_count}
                                </div>
                                <div>
                                    <p className="font-medium">
                                        {property.accommodations_count} {property.accommodations_count === 1 ? 'acomodação disponível' : 'acomodações disponíveis'}
                                    </p>
                                    <p className="text-sm text-text-muted">Entre em contato para mais informações</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Card */}
                        <div className="glass-strong p-6 rounded-lg sticky top-8 border-t-4" style={{ borderColor: primaryColor }}>
                            <h3 className="text-xl font-semibold mb-4">Contato</h3>

                            <div className="space-y-4">
                                {property.phone && (
                                    <a href={`tel:${property.phone}`} className="flex items-center gap-3 p-3 rounded-lg glass hover:glass-strong transition-all group">
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: primaryColor }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22 16.92V19.92C22 20.4696 21.5304 20.9204 20.9828 20.9931C20.6383 21.0381 20.2981 21.0619 19.96 21.0619C10.5084 21.0619 3 13.5535 3 4.10192C3 3.76382 3.02387 3.42358 3.06887 3.07911C3.14158 2.53147 3.59242 2.06192 4.142 2.06192H7.142C7.41614 2.06192 7.64201 2.28779 7.64201 2.56192C7.64201 2.83606 7.41614 3.06192 7.142 3.06192H4.142C4.14458 3.06192 4.14716 3.06192 4.14974 3.06192C4.14716 3.06192 4.14458 3.06192 4.142 3.06192C4.09701 3.40639 4.07314 3.74663 4.07314 4.08473C4.07314 13.0011 11.0608 19.9888 19.9772 19.9888C20.3153 19.9888 20.6555 19.9649 21 19.9199V16.92C21 16.6459 21.2259 16.42 21.5 16.42C21.7741 16.42 22 16.6459 22 16.92Z" fill="currentColor" />
                                        </svg>
                                        <span className="text-sm font-medium">{property.phone}</span>
                                    </a>
                                )}

                                {property.whatsapp && (
                                    <a href={`https://wa.me/${property.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg glass hover:glass-strong transition-all group">
                                        <svg className="w-5 h-5 text-success group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.472 14.382C17.015 14.154 14.769 13.045 14.354 12.893C13.939 12.741 13.64 12.665 13.341 13.122C13.042 13.579 12.141 14.616 11.88 14.915C11.619 15.214 11.358 15.252 10.901 15.024C10.444 14.796 8.99 14.322 7.26 12.785C5.91 11.584 5.01 10.092 4.749 9.635C4.488 9.178 4.72 8.936 4.948 8.708C5.152 8.504 5.405 8.175 5.633 7.914C5.861 7.653 5.937 7.468 6.089 7.169C6.241 6.87 6.165 6.609 6.051 6.381C5.937 6.153 5.039 3.905 4.662 2.991C4.285 2.077 3.908 2.191 3.647 2.191C3.386 2.191 3.087 2.153 2.788 2.153C2.489 2.153 2.032 2.267 1.617 2.724C1.202 3.181 0.017 4.29 0.017 6.538C0.017 8.786 1.655 10.958 1.883 11.257C2.111 11.556 5.01 15.836 9.409 17.846C13.808 19.856 13.808 19.171 14.769 19.095C15.73 19.019 17.624 17.984 18.001 16.911C18.378 15.838 18.378 14.916 18.264 14.726C18.15 14.536 17.929 14.61 17.472 14.382Z" fill="currentColor" />
                                        </svg>
                                        <span className="text-sm font-medium">WhatsApp</span>
                                    </a>
                                )}

                                {property.website && (
                                    <a href={property.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg glass hover:glass-strong transition-all group">
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: primaryColor }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M2 12H22M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className="text-sm font-medium">Website</span>
                                    </a>
                                )}
                            </div>

                            {/* Social Media */}
                            {(property.instagram || property.facebook || property.youtube || property.tiktok) && (
                                <div className="mt-6 pt-6 border-t border-border">
                                    <h4 className="text-sm font-medium mb-3">Redes Sociais</h4>
                                    <div className="flex gap-3">
                                        {property.instagram && (
                                            <a href={`https://instagram.com/${property.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass hover:bg-opacity-20 transition-all flex items-center justify-center hover:scale-110" style={{ hover: { backgroundColor: primaryColor } } as any}>
                                                <span className="sr-only">Instagram</span>
                                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                                </svg>
                                            </a>
                                        )}
                                        {property.facebook && (
                                            <a href={`https://facebook.com/${property.facebook}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass hover:bg-opacity-20 transition-all flex items-center justify-center hover:scale-110">
                                                <span className="sr-only">Facebook</span>
                                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                </svg>
                                            </a>
                                        )}
                                        {property.youtube && (
                                            <a href={`https://youtube.com/${property.youtube}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass hover:bg-opacity-20 transition-all flex items-center justify-center hover:scale-110">
                                                <span className="sr-only">YouTube</span>
                                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                                </svg>
                                            </a>
                                        )}
                                        {property.tiktok && (
                                            <a href={`https://tiktok.com/@${property.tiktok.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass hover:bg-opacity-20 transition-all flex items-center justify-center hover:scale-110">
                                                <span className="sr-only">TikTok</span>
                                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-16 border-t border-border p-8 text-center text-text-muted text-sm">
                <p>Powered by <span className="font-semibold" style={{ color: primaryColor }}>Hy-fen</span></p>
            </footer>
        </div>
    );
}
