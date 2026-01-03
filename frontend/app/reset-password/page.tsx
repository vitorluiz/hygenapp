'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

function ResetPasswordContent() {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const uid = searchParams.get('uid');
    const token = searchParams.get('token');

    useEffect(() => {
        if (!uid || !token) {
            setError('Link de recuperação inválido.');
        }
    }, [uid, token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== passwordConfirm) {
            setError('As senhas não coincidem.');
            return;
        }

        if (password.length < 8) {
            setError('A senha deve ter no mínimo 8 caracteres.');
            return;
        }

        setIsLoading(true);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

        try {
            const res = await fetch(`${apiUrl}/auth/password-reset/confirm/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    uid,
                    token,
                    password,
                    password_confirm: passwordConfirm
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Erro ao redefinir senha.');
            }

            // Redirecionar para login
            router.push('/login?password_reset=true');
        } catch (err: any) {
            setError(err.message || 'Erro ao conectar ao servidor.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!uid || !token) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">
                <Card className="w-full max-w-md text-center">
                    <div className="mb-6">
                        <img src="/logo.svg" alt="Hyfen" className="h-8 mx-auto mb-6" />
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">Link inválido</h2>
                        <p className="text-text-secondary mb-6">Este link de recuperação é inválido ou expirou.</p>
                        <Button
                            variant="brand"
                            onClick={() => router.push('/forgot-password')}
                        >
                            Solicitar novo link
                        </Button>
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
                    <h1 className="text-2xl font-bold text-foreground mb-2">Redefinir senha</h1>
                    <p className="text-text-secondary text-sm">Digite sua nova senha</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-text-secondary text-xs uppercase font-bold mb-2 tracking-wider">
                            Nova Senha
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-card border border-white/5 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all placeholder-text-secondary"
                            placeholder="Mínimo 8 caracteres"
                            required
                            minLength={8}
                        />
                    </div>

                    <div>
                        <label className="block text-text-secondary text-xs uppercase font-bold mb-2 tracking-wider">
                            Confirmar Nova Senha
                        </label>
                        <input
                            type="password"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            className="w-full bg-card border border-white/5 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all placeholder-text-secondary"
                            placeholder="Digite a senha novamente"
                            required
                            minLength={8}
                        />
                    </div>

                    <div className="bg-brand-gradient/10 border border-brand-purple/20 p-3 rounded text-sm text-text-secondary">
                        <p className="font-semibold text-foreground mb-1">Requisitos da senha:</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                            <li>Mínimo de 8 caracteres</li>
                            <li>Recomendado: letras maiúsculas e minúsculas</li>
                            <li>Recomendado: números e caracteres especiais</li>
                        </ul>
                    </div>

                    <Button
                        type="submit"
                        variant="brand"
                        className="w-full py-4 text-lg"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Redefinindo...' : 'Redefinir Senha'}
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple"></div>
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
    );
}
