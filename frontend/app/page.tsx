export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8 animate-fade-in">
        {/* Logo */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold">
            <span className="gradient-text">Hy-fen</span>
          </h1>
          <p className="text-text-secondary text-xl">
            Gestão de Hospedagens Simplificada
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {/* Login Card */}
          <a
            href="/login"
            className="glass p-8 rounded-lg hover:glass-strong transition-all duration-300 hover:shadow-glow group"
          >
            <h2 className="text-2xl font-semibold mb-2 group-hover:gradient-text transition-all">
              Entrar
            </h2>
            <p className="text-text-secondary">
              Acesse sua conta e gerencie suas propriedades
            </p>
          </a>

          {/* Register Card */}
          <a
            href="/register"
            className="glass p-8 rounded-lg hover:glass-strong transition-all duration-300 hover:shadow-glow-accent group"
          >
            <h2 className="text-2xl font-semibold mb-2 group-hover:gradient-text transition-all">
              Criar Conta
            </h2>
            <p className="text-text-secondary">
              Comece a gerenciar suas hospedagens hoje
            </p>
          </a>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          <div className="text-center p-6 rounded-lg bg-surface">
            <div className="text-4xl mb-2">🏠</div>
            <h3 className="font-semibold mb-1">Propriedades</h3>
            <p className="text-sm text-text-muted">
              Gerencie múltiplas propriedades
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-surface">
            <div className="text-4xl mb-2">📅</div>
            <h3 className="font-semibold mb-1">Reservas</h3>
            <p className="text-sm text-text-muted">
              Controle total de reservas
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-surface">
            <div className="text-4xl mb-2">📊</div>
            <h3 className="font-semibold mb-1">Relatórios</h3>
            <p className="text-sm text-text-muted">
              Métricas e insights
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
