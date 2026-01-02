'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Property {
    id: number
    name: string
    city: string
    state: string
}

export default function Pousadas() {
    const [data, setData] = useState<{ count: number; results: Property[] } | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:8000/api/v1/properties/')
                const json = await res.json()
                setData(json)
            } catch (err) {
                setError('Erro ao buscar pousadas')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <Link href="/" style={{ color: '#0070f3' }}>← Voltar</Link>

            <h1>🏠 Pousadas</h1>

            {loading && <p>Carregando...</p>}

            {error && (
                <div style={{ padding: '1rem', backgroundColor: '#fee', borderRadius: '8px', color: '#c00' }}>
                    ❌ {error}
                </div>
            )}

            {data && (
                <div>
                    <p><strong>Total:</strong> {data.count} pousadas</p>

                    {data.count === 0 ? (
                        <p style={{ color: '#666' }}>Nenhuma pousada cadastrada. Acesse o admin para adicionar.</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {data.results.map((p) => (
                                <li key={p.id} style={{
                                    padding: '1rem',
                                    marginBottom: '0.5rem',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '8px'
                                }}>
                                    <strong>{p.name}</strong> - {p.city}, {p.state}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </main>
    )
}
