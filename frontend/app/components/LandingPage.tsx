import Link from 'next/link';

export default function LandingPage() {
    return (
        <div className="font-sans bg-[#0E0E11] text-white min-h-screen">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
                <div className="text-2xl font-bold text-white">Hy<span className="bg-clip-text text-transparent bg-brand-gradient">-</span>fen</div>
                <div className="space-x-4">
                    <Link href="#features" className="text-gray-300 hover:text-white transition">Funcionalidades</Link>
                    <Link href="#pricing" className="text-gray-300 hover:text-white transition">Preços</Link>
                    <Link href="/admin/login" className="bg-[#1C1C22] border border-white/10 text-white px-4 py-2 rounded hover:bg-[#272730] transition">
                        Login Admin
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="py-20 px-6 text-center">
                <h1 className="text-5xl font-extrabold mb-6 leading-tight text-white">
                    Gerencie sua Pousada com <span className="bg-clip-text text-transparent bg-brand-gradient">Inteligência</span>
                </h1>
                <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                    Diga adeus às planilhas e comissões abusivas. Tenha seu próprio sistema de reservas diretas e fidelize seus hóspedes.
                </p>
                <div className="space-x-4">
                    <button className="bg-brand-gradient text-white px-8 py-3 rounded-lg text-lg font-semibold hover:opacity-90 shadow-lg transition">
                        Começar Grátis
                    </button>
                    <button className="bg-[#1C1C22] border border-white/10 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#272730] transition">
                        Ver Demo
                    </button>
                </div>
            </header>

            {/* Features */}
            <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-white">Tudo que você precisa</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6 bg-[#1C1C22] border border-white/5 rounded-xl hover:border-white/10 transition">
                        <div className="text-4xl mb-4">🏠</div>
                        <h3 className="text-xl font-bold mb-2 text-white">Site Próprio</h3>
                        <p className="text-gray-400">Sua pousada com um endereço exclusivo e reservas sem intermediários.</p>
                    </div>
                    <div className="p-6 bg-[#1C1C22] border border-white/5 rounded-xl hover:border-white/10 transition">
                        <div className="text-4xl mb-4">📅</div>
                        <h3 className="text-xl font-bold mb-2 text-white">Gestão de Reservas</h3>
                        <p className="text-gray-400">Calendário intuitivo para nunca mais ter overbooking.</p>
                    </div>
                    <div className="p-6 bg-[#1C1C22] border border-white/5 rounded-xl hover:border-white/10 transition">
                        <div className="text-4xl mb-4">🤖</div>
                        <h3 className="text-xl font-bold mb-2 text-white">Atendimento IA</h3>
                        <p className="text-gray-400">Responda seus clientes no WhatsApp 24/7 com nossa IA integrada.</p>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="bg-[#0E0E11] py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-white">Planos Flexíveis</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {/* Intro */}
                        <div className="bg-[#1C1C22] p-8 rounded-xl border border-white/5">
                            <h3 className="text-xl font-bold mb-4 text-white">Intro</h3>
                            <p className="text-4xl font-bold mb-6 text-white">R$ 99<span className="text-base font-normal text-gray-400">/mês</span></p>
                            <ul className="text-gray-400 space-y-3 mb-8">
                                <li>Site Básico</li>
                                <li>Até 10 Quartos</li>
                                <li>Suporte por Email</li>
                            </ul>
                            <button className="w-full border border-white/10 text-white py-2 rounded hover:bg-[#272730] transition">Escolher Intro</button>
                        </div>
                        {/* Pro */}
                        <div className="bg-[#1C1C22] p-8 rounded-xl shadow-lg border border-indigo-500/50 transform scale-105 relative">
                            <div className="absolute top-0 right-0 bg-brand-gradient text-white text-xs px-3 py-1 rounded-bl-lg">Popular</div>
                            <h3 className="text-xl font-bold mb-4 text-white">Pro</h3>
                            <p className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-brand-gradient">R$ 199<span className="text-base font-normal text-gray-400">/mês</span></p>
                            <ul className="text-gray-300 space-y-3 mb-8">
                                <li>Site Personalizado</li>
                                <li>Quartos Ilimitados</li>
                                <li>Gestão Financeira</li>
                                <li>Integração WhatsApp</li>
                            </ul>
                            <button className="w-full bg-brand-gradient text-white py-2 rounded hover:opacity-90 transition">Escolher Pro</button>
                        </div>
                        {/* Enterprise */}
                        <div className="bg-[#1C1C22] p-8 rounded-xl border border-white/5">
                            <h3 className="text-xl font-bold mb-4 text-white">Enterprise</h3>
                            <p className="text-4xl font-bold mb-6 text-white">Sob Consulta</p>
                            <ul className="text-gray-400 space-y-3 mb-8">
                                <li>Múltiplas Pousadas</li>
                                <li>API Dedicada</li>
                                <li>Gerente de Conta</li>
                            </ul>
                            <button className="w-full border border-white/10 text-white py-2 rounded hover:bg-[#272730] transition">Falar com Vendas</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0E0E11] text-gray-400 py-10 text-center border-t border-white/5">
                <p>© 2026 Hyfen. Feito para hoteleiros.</p>
            </footer>
        </div>
    );
}
