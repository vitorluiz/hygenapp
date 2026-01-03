'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Link from 'next/link';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        cpf: '',
        phone: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const formatCPF = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        return numbers
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    };

    const formatPhone = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        return numbers
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    };

    const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCPF(e.target.value);
        setFormData({ ...formData, cpf: formatted });
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhone(e.target.value);
        setFormData({ ...formData, phone: formatted });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

        try {
            const res = await fetch(`${apiUrl}/auth/register/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                // Tratar erros de validação
                if (data.email) {
                    throw new Error(data.email[0]);
                } else if (data.cpf) {
                    throw new Error(data.cpf[0]);
                } else if (data.phone) {
                    throw new Error(data.phone[0]);
                } else {
                    throw new Error('Erro ao realizar cadastro. Verifique os dados.');
                }
            }

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Erro ao conectar ao servidor.');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">
                <Card className="w-full max-w-md text-center">
                    <div className="mb-6">
                        <img src="/logo.svg" alt="Hyfen" className="h-8 mx-auto mb-6" />
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/20 flex items-center justify-center">
                            <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">Cadastro realizado!</h2>
                        <p className="text-text-secondary mb-6">
                            Enviamos um email para <strong className="text-foreground">{formData.email}</strong> com instruções para verificar sua conta e definir sua senha.
                        </p>
                        <p className="text-sm text-text-secondary">
                            Não recebeu o email? Verifique sua caixa de spam.
                        </p>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">
            <Card className="w-full max-w-md">
                <div className="text-center mb-8">
                    <img src="/logo.svg" alt="Hyfen" className="h-8 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-foreground mb-2">Criar sua conta</h1>
                    <p className="text-text-secondary text-sm">Comece a gerenciar sua propriedade hoje</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-text-secondary text-xs uppercase font-bold mb-2 tracking-wider">
                                Nome
                            </label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="w-full bg-card border border-white/5 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all placeholder-text-secondary"
                                placeholder="João"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-text-secondary text-xs uppercase font-bold mb-2 tracking-wider">
                                Sobrenome
                            </label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="w-full bg-card border border-white/5 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all placeholder-text-secondary"
                                placeholder="Silva"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-text-secondary text-xs uppercase font-bold mb-2 tracking-wider">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-card border border-white/5 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all placeholder-text-secondary"
                            placeholder="seu@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-text-secondary text-xs uppercase font-bold mb-2 tracking-wider">
                            CPF
                        </label>
                        <input
                            type="text"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleCPFChange}
                            className="w-full bg-card border border-white/5 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all placeholder-text-secondary"
                            placeholder="000.000.000-00"
                            maxLength={14}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-text-secondary text-xs uppercase font-bold mb-2 tracking-wider">
                            Telefone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            className="w-full bg-card border border-white/5 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all placeholder-text-secondary"
                            placeholder="(00) 00000-0000"
                            maxLength={15}
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="brand"
                        className="w-full py-4 text-lg"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Criando conta...' : 'Criar Conta'}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-text-secondary">
                        Já tem uma conta?{' '}
                        <Link href="/login" className="text-brand-purple hover:text-brand-blue transition-colors font-semibold">
                            Faça login
                        </Link>
                    </p>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-xs text-text-secondary">
                        Ao criar uma conta, você concorda com nossos{' '}
                        <a href="#" className="text-brand-purple hover:underline">Termos de Uso</a>
                        {' '}e{' '}
                        <a href="#" className="text-brand-purple hover:underline">Política de Privacidade</a>
                    </p>
                </div>
            </Card>
        </div>
    );
}
