'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ApiTest() {
    const [status, setStatus] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const testApi = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('http://localhost:8000/api/v1/status/')
            const data = await res.json()
            setStatus(data)
        } catch (err) {
            setError('Erro ao conectar com a API. Verifique se o backend está rodando.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <Link href="/" style={{ color: '#0070f3' }}>← Voltar</Link>

            <h1>🔌 Teste de Conexão com API</h1>

            <button
                onClick={testApi}
                disabled={loading}
                style={{
                    padding: '1rem 2rem',
                    fontSize: '1rem',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'wait' : 'pointer',
                    marginTop: '1rem'
                }}
            >
                {loading ? 'Testando...' : 'Testar API'}
            </button>

            {error && (
                <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#fee', borderRadius: '8px', color: '#c00' }}>
                    ❌ {error}
                </div>
            )}

            {status && (
                <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#efe', borderRadius: '8px' }}>
                    <h3>✅ Resposta da API:</h3>
                    <pre style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
                        {JSON.stringify(status, null, 2)}
                    </pre>
                </div>
            )}
        </main>
    )
}
