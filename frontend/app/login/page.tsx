'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Link from 'next/link';

function LoginContent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get('registered') === 'true') {
            setSuccess('Conta criada com sucesso! Faça login para continuar.');
        }
        if (searchParams.get('password_reset') === 'true') {
            setSuccess('Senha redefinida com sucesso! Faça login com sua nova senha.');
        }
    }, [searchParams]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const apiUrl = 'http://localhost:8000/api/v1';

        try {
            const res = await fetch(`${apiUrl}/auth/token/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                throw new Error('Usuário ou senha inválidos.');
            }

            const data = await res.json();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            // Redireciona para dashboard do proprietário
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Erro ao conectar ao servidor.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">
            <Card className="w-full max-w-md">
                <div className="text-center mb-8">
                    <img src="/logo.svg" alt="Hyfen" className="h-8 mx-auto mb-4" />
                    <p className="text-text-secondary mt-2 text-sm">Acesse o painel da sua propriedade</p>
                </div>

                {success && (
                    <div className="bg-success/10 border border-success/20 text-success p-3 rounded mb-6 text-sm text-center">
                        {success}
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-text-secondary text-xs uppercase font-bold mb-2 tracking-wider">Usuário</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-card border border-white/5 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all placeholder-text-secondary"
                            placeholder="Digite seu usuário"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-text-secondary text-xs uppercase font-bold mb-2 tracking-wider">Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-card border border-white/5 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all placeholder-text-secondary"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="brand"
                        className="w-full py-4 text-lg"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Entrando...' : 'Acessar Painel'}
                    </Button>
                </form>

                <div className="mt-6 text-center space-y-3">
                    <Link href="/forgot-password" className="block text-sm text-text-secondary hover:text-foreground transition-colors">
                        Esqueceu sua senha?
                    </Link>
                    <p className="text-sm text-text-secondary">
                        Não tem uma conta?{' '}
                        <Link href="/register" className="text-brand-purple hover:text-brand-blue transition-colors font-semibold">
                            Cadastre-se
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple"></div>
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
