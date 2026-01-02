'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Reservation {
    id: number
    status: string
    check_in: string
    check_out: string
    total_price: string
}

export default function Reservas() {
    const [data, setData] = useState<{ count: number; results: Reservation[] } | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:8000/api/v1/reservations/')
                const json = await res.json()
                setData(json)
            } catch (err) {
                setError('Erro ao buscar reservas')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const statusColor = (status: string) => {
        const colors: Record<string, string> = {
            'confirmed': '#2e7d32',
            'pending': '#ed6c02',
            'cancelled': '#d32f2f',
            'checked_in': '#0288d1',
            'checked_out': '#757575'
        }
        return colors[status] || '#333'
    }

    return (
        <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <Link href="/" style={{ color: '#0070f3' }}>← Voltar</Link>

            <h1>📅 Reservas</h1>

            {loading && <p>Carregando...</p>}

            {error && (
                <div style={{ padding: '1rem', backgroundColor: '#fee', borderRadius: '8px', color: '#c00' }}>
                    ❌ {error}
                </div>
            )}

            {data && (
                <div>
                    <p><strong>Total:</strong> {data.count} reservas</p>

                    {data.count === 0 ? (
                        <p style={{ color: '#666' }}>Nenhuma reserva cadastrada ainda.</p>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f0f0f0' }}>
                                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>ID</th>
                                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Status</th>
                                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Check-in</th>
                                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Check-out</th>
                                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.results.map((r) => (
                                    <tr key={r.id} style={{ borderBottom: '1px solid #ddd' }}>
                                        <td style={{ padding: '0.75rem' }}>{r.id}</td>
                                        <td style={{ padding: '0.75rem', color: statusColor(r.status) }}>
                                            {r.status}
                                        </td>
                                        <td style={{ padding: '0.75rem' }}>{r.check_in}</td>
                                        <td style={{ padding: '0.75rem' }}>{r.check_out}</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                                            R$ {r.total_price}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </main>
    )
}
