export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center animate-fade-in">
                {/* Logo */}
                <div className="mb-8">
                    <h1 className="text-5xl font-bold gradient-text mb-4">Hy-fen</h1>
                </div>

                {/* Error Icon */}
                <div className="mb-8">
                    <div className="w-32 h-32 mx-auto rounded-full glass-strong flex items-center justify-center">
                        <svg className="w-16 h-16 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0377 2.66667 10.2679 4L3.33975 16C2.56995 17.3333 3.53223 19 5.07183 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                {/* Error Message */}
                <div className="space-y-4 mb-8">
                    <h2 className="text-4xl font-bold">404</h2>
                    <h3 className="text-2xl font-semibold text-text-primary">
                        Oops! Página não encontrada.
                    </h3>
                    <p className="text-text-secondary max-w-md mx-auto">
                        O link que você seguiu pode estar quebrado ou a página pode ter sido removida.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                        href="/"
                        className="gradient-primary text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity shadow-glow inline-flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Voltar para Início
                    </a>

                    <button
                        onClick={() => window.history.back()}
                        className="glass px-8 py-3 rounded-lg hover:glass-strong transition-all inline-flex items-center gap-2 text-text-secondary hover:text-text-primary"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Voltar
                    </button>
                </div>

                {/* Helpful Links */}
                <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-text-muted text-sm mb-4">Você também pode:</p>
                    <div className="flex flex-wrap gap-4 justify-center text-sm">
                        <a href="/login" className="text-primary hover:text-primary-hover transition-colors">
                            Fazer Login
                        </a>
                        <span className="text-border">•</span>
                        <a href="/register" className="text-primary hover:text-primary-hover transition-colors">
                            Criar Conta
                        </a>
                        <span className="text-border">•</span>
                        <a href="/dashboard" className="text-primary hover:text-primary-hover transition-colors">
                            Acessar Dashboard
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
