import { headers } from 'next/headers'
import { getTenant } from '../lib/api'
import LandingPage from './components/LandingPage'
import Link from 'next/link'

export default async function Home() {
  const headersList = await headers()

  const host = headersList.get('host') || ''
  const tenant = await getTenant(host)

  if (!tenant) {
    return <LandingPage />
  }

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <header style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#333' }}>{tenant.name}</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>{tenant.description}</p>
        {tenant.address && <p><small>📍 {tenant.address}, {tenant.city} - {tenant.state}</small></p>}
      </header>

      <section>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Sua Experiência Única</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {tenant.room_types && tenant.room_types.length > 0 ? (
            tenant.room_types.map((room: any) => (
              <div key={room.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem' }}>
                <h3>{room.name}</h3>
                <p>{room.description}</p>
                <p style={{ fontWeight: 'bold', color: '#0070f3' }}>R$ {room.base_price}</p>
              </div>
            ))
          ) : (
            <p>Nenhuma acomodação disponível no momento.</p>
          )}
        </div>
      </section>

      <footer style={{ marginTop: '4rem', padding: '2rem 0', borderTop: '1px solid #eaeaea', textAlign: 'center', color: '#888' }}>
        <p>© 2024 {tenant.razao_social || tenant.name}. Todos os direitos reservados.</p>
        <div style={{ marginTop: '1rem' }}>
          <Link href="/login" style={{ color: '#0070f3', fontSize: '0.9rem' }}>Área do Proprietário</Link>
        </div>
      </footer>
    </main>
  )
}
