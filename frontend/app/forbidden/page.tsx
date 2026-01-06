"use client";

export default function Forbidden() {
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
                        <svg className="w-16 h-16 text-warning" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                {/* Error Message */}
                <div className="space-y-4 mb-8">
                    <h2 className="text-4xl font-bold">403</h2>
                    <h3 className="text-2xl font-semibold text-text-primary">
                        Acesso Negado
                    </h3>
                    <p className="text-text-secondary max-w-md mx-auto">
                        Você não tem permissão para acessar esta página. Se você acredita que isso é um erro, entre em contato com o administrador.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                        href="/dashboard"
                        className="gradient-primary text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity shadow-glow inline-flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Ir para Dashboard
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

                {/* Info */}
                <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-text-muted text-sm">
                        Certifique-se de estar logado com as permissões corretas.
                    </p>
                </div>
            </div>
        </div>
    );
}
