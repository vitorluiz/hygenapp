'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Em produção seria process.env.NEXT_PUBLIC_API_URL
        const apiUrl = 'http://localhost:8000/api/v1';

        try {
            const res = await fetch(`${apiUrl}/auth/token/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                throw new Error('Falha no login admin.');
            }

            const data = await res.json();
            // Armazenar token com chave distinta para admin
            localStorage.setItem('admin_token', data.access);

            router.push('/admin/dashboard');
        } catch (err: any) {
            setError(err.message || 'Erro desconhecido');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Hyfen Admin</h2>

                {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Usuário</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Senha</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-slate-800 text-white font-bold py-2 px-4 rounded hover:bg-slate-900 transition duration-200">
                    Entrar
                </button>
            </form>
        </div>
    );
}
