'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPropertyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        cnpj: '',
        legal_name: '',
        slug: '',
        custom_domain: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        country: 'Brasil',
        phone: '',
        email: '',
        website: '',
        instagram: '',
        facebook: '',
        youtube: '',
        tiktok: '',
        whatsapp: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                router.push('/login');
                return;
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/api/v1/properties/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();

                // Formatar erros de validação
                if (data && typeof data === 'object') {
                    const errorMessages = Object.entries(data).map(([field, errors]) => {
                        const fieldNames: Record<string, string> = {
                            'name': 'Nome',
                            'address': 'Endereço',
                            'city': 'Cidade',
                            'state': 'Estado',
                            'zip_code': 'CEP',
                            'country': 'País',
                        };
                        const fieldName = fieldNames[field] || field;
                        const errorList = Array.isArray(errors) ? errors : [errors];
                        return `${fieldName}: ${errorList.join(', ')}`;
                    });
                    throw new Error(errorMessages.join('\n'));
                }

                throw new Error(data.detail || 'Erro ao criar propriedade');
            }

            // Sucesso - redirecionar para dashboard
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="glass border-b border-border p-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-text-secondary hover:text-text-primary">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-semibold">Nova Propriedade</h1>
                            <p className="text-text-secondary text-sm">Cadastre uma nova propriedade</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Form */}
            <main className="max-w-4xl mx-auto p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-4 rounded-lg bg-error/10 border border-error/20 text-error text-sm flex items-start gap-3">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="whitespace-pre-line">{error}</div>
                        </div>
                    )}

                    {/* Informações Básicas */}
                    <div className="glass-strong p-6 rounded-lg space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Informações Básicas</h2>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                                Nome da Propriedade *
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                placeholder="Ex: Pousada Vista Linda"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium mb-2">
                                Descrição
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                placeholder="Descreva sua propriedade..."
                            />
                        </div>
                    </div>

                    {/* Informações Legais */}
                    <div className="glass-strong p-6 rounded-lg space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Informações Legais</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="cnpj" className="block text-sm font-medium mb-2">
                                    CNPJ
                                </label>
                                <input
                                    id="cnpj"
                                    name="cnpj"
                                    type="text"
                                    value={formData.cnpj}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="00.000.000/0000-00"
                                />
                            </div>

                            <div>
                                <label htmlFor="legal_name" className="block text-sm font-medium mb-2">
                                    Razão Social
                                </label>
                                <input
                                    id="legal_name"
                                    name="legal_name"
                                    type="text"
                                    value={formData.legal_name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="Nome da empresa"
                                />
                            </div>
                        </div>
                    </div>

                    {/* URL da Landing Page */}
                    <div className="glass-strong p-6 rounded-lg space-y-4">
                        <h2 className="text-xl font-semibold mb-4">URL da Landing Page</h2>

                        <div>
                            <label htmlFor="slug" className="block text-sm font-medium mb-2">
                                Slug (URL amigável)
                            </label>
                            <div className="space-y-2">
                                <input
                                    id="slug"
                                    name="slug"
                                    type="text"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="Deixe vazio para gerar automaticamente"
                                />
                                <p className="text-xs text-text-muted">
                                    {formData.slug ? (
                                        <>
                                            Sua landing page será: <span className="text-primary font-mono">/public/{formData.slug}</span>
                                        </>
                                    ) : formData.name ? (
                                        <>
                                            Se deixar vazio, será gerado: <span className="text-text-secondary font-mono">/public/{formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}</span>
                                        </>
                                    ) : (
                                        'Digite o nome da propriedade para ver o preview'
                                    )}
                                </p>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="custom_domain" className="block text-sm font-medium mb-2">
                                Domínio Personalizado (opcional)
                            </label>
                            <input
                                id="custom_domain"
                                name="custom_domain"
                                type="text"
                                value={formData.custom_domain}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                placeholder="www.suapousada.com.br"
                            />
                            <p className="text-xs text-text-muted mt-2">
                                Configure seu próprio domínio para a landing page (requer configuração DNS)
                            </p>
                        </div>
                    </div>

                    {/* Endereço */}
                    <div className="glass-strong p-6 rounded-lg space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Endereço</h2>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium mb-2">
                                Endereço Completo *
                            </label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                required
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                placeholder="Rua, número, complemento"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium mb-2">
                                    Cidade *
                                </label>
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    required
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="Ex: Chapada dos Guimarães"
                                />
                            </div>

                            <div>
                                <label htmlFor="state" className="block text-sm font-medium mb-2">
                                    Estado *
                                </label>
                                <input
                                    id="state"
                                    name="state"
                                    type="text"
                                    required
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="Ex: MT"
                                />
                            </div>

                            <div>
                                <label htmlFor="zip_code" className="block text-sm font-medium mb-2">
                                    CEP *
                                </label>
                                <input
                                    id="zip_code"
                                    name="zip_code"
                                    type="text"
                                    required
                                    value={formData.zip_code}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="00000-000"
                                    maxLength={9}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="country" className="block text-sm font-medium mb-2">
                                País *
                            </label>
                            <input
                                id="country"
                                name="country"
                                type="text"
                                required
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                    </div>

                    {/* Contato */}
                    <div className="glass-strong p-6 rounded-lg space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Informações de Contato</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                    Telefone
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="(00) 00000-0000"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="contato@propriedade.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="website" className="block text-sm font-medium mb-2">
                                Website
                            </label>
                            <input
                                id="website"
                                name="website"
                                type="url"
                                value={formData.website}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                placeholder="https://www.propriedade.com"
                            />
                        </div>
                    </div>

                    {/* Redes Sociais */}
                    <div className="glass-strong p-6 rounded-lg space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Redes Sociais</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="instagram" className="block text-sm font-medium mb-2">
                                    Instagram
                                </label>
                                <input
                                    id="instagram"
                                    name="instagram"
                                    type="text"
                                    value={formData.instagram}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="@suapousada"
                                />
                            </div>

                            <div>
                                <label htmlFor="facebook" className="block text-sm font-medium mb-2">
                                    Facebook
                                </label>
                                <input
                                    id="facebook"
                                    name="facebook"
                                    type="text"
                                    value={formData.facebook}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="facebook.com/suapousada"
                                />
                            </div>

                            <div>
                                <label htmlFor="youtube" className="block text-sm font-medium mb-2">
                                    YouTube
                                </label>
                                <input
                                    id="youtube"
                                    name="youtube"
                                    type="text"
                                    value={formData.youtube}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="youtube.com/@suapousada"
                                />
                            </div>

                            <div>
                                <label htmlFor="tiktok" className="block text-sm font-medium mb-2">
                                    TikTok
                                </label>
                                <input
                                    id="tiktok"
                                    name="tiktok"
                                    type="text"
                                    value={formData.tiktok}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="@suapousada"
                                />
                            </div>

                            <div>
                                <label htmlFor="whatsapp" className="block text-sm font-medium mb-2">
                                    WhatsApp
                                </label>
                                <input
                                    id="whatsapp"
                                    name="whatsapp"
                                    type="tel"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="(00) 00000-0000"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4">
                        <Link
                            href="/dashboard"
                            className="px-6 py-3 rounded-lg glass hover:glass-strong transition-all text-text-secondary hover:text-text-primary"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="gradient-primary text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-glow inline-flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.92157L16.25 7.75M4.92157 19.0784L7.75 16.25M4.92157 4.92157L7.75 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M17 21V13H7V21M7 3V8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Salvar Propriedade
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
