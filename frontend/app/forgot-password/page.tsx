'use client';

import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

        try {
            const res = await fetch(`${apiUrl}/auth/password-reset/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Erro ao solicitar recuperação de senha.');
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">Email enviado!</h2>
                        <p className="text-text-secondary mb-6">
                            Se o email <strong className="text-foreground">{email}</strong> estiver cadastrado, você receberá instruções para redefinir sua senha.
                        </p>
                        <p className="text-sm text-text-secondary mb-6">
                            Verifique sua caixa de entrada e spam.
                        </p>
                        <Link href="/login">
                            <Button variant="brand" className="w-full">
                                Voltar para Login
                            </Button>
                        </Link>
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
                    <h1 className="text-2xl font-bold text-foreground mb-2">Esqueceu sua senha?</h1>
                    <p className="text-text-secondary text-sm">Digite seu email para receber instruções de recuperação</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-text-secondary text-xs uppercase font-bold mb-2 tracking-wider">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-card border border-white/5 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all placeholder-text-secondary"
                            placeholder="seu@email.com"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="brand"
                        className="w-full py-4 text-lg"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Enviando...' : 'Enviar Instruções'}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-text-secondary">
                        Lembrou sua senha?{' '}
                        <Link href="/login" className="text-brand-purple hover:text-brand-blue transition-colors font-semibold">
                            Fazer login
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}
