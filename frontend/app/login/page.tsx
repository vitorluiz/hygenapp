'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

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
        <div className="flex min-h-screen items-center justify-center bg-[#0E0E11] p-4 text-white">
            <Card className="w-full max-w-md border-white/10 bg-[#1C1C22]">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-brand-gradient inline-block">Hyfen</h1>
                    <p className="text-gray-400 mt-2 text-sm">Acesse o painel da sua propriedade</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-gray-400 text-xs uppercase font-bold mb-2 tracking-wider">Usuário</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-[#272730] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-gray-600"
                            placeholder="Digite seu usuário"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-xs uppercase font-bold mb-2 tracking-wider">Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#272730] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-gray-600"
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

                <div className="mt-8 text-center">
                    <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Esqueceu sua senha?</a>
                </div>
            </Card>
        </div>
    );
}
