'use client';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
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
                        <svg className="w-16 h-16 text-error" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                {/* Error Message */}
                <div className="space-y-4 mb-8">
                    <h2 className="text-4xl font-bold">500</h2>
                    <h3 className="text-2xl font-semibold text-text-primary">
                        Algo deu errado!
                    </h3>
                    <p className="text-text-secondary max-w-md mx-auto">
                        Ocorreu um erro inesperado no servidor. Nossa equipe foi notificada e está trabalhando para resolver o problema.
                    </p>
                    {error.digest && (
                        <p className="text-text-muted text-sm font-mono">
                            Código do erro: {error.digest}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={reset}
                        className="gradient-primary text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity shadow-glow inline-flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4V10H7M23 20V14H17M20.49 9C19.9828 7.56678 19.1209 6.28536 17.9845 5.27542C16.8482 4.26548 15.4745 3.55976 13.9917 3.22426C12.5089 2.88875 10.9652 2.93434 9.50481 3.35677C8.04437 3.77921 6.71475 4.56471 5.64 5.64L1 10M23 14L18.36 18.36C17.2853 19.4353 15.9556 20.2208 14.4952 20.6432C13.0348 21.0657 11.4911 21.1112 10.0083 20.7757C8.52547 20.4402 7.1518 19.7345 6.01547 18.7246C4.87913 17.7146 4.01717 16.4332 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Tentar Novamente
                    </button>

                    <a
                        href="/"
                        className="glass px-8 py-3 rounded-lg hover:glass-strong transition-all inline-flex items-center gap-2 text-text-secondary hover:text-text-primary"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Voltar para Início
                    </a>
                </div>

                {/* Support Info */}
                <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-text-muted text-sm">
                        Se o problema persistir, entre em contato com o suporte.
                    </p>
                </div>
            </div>
        </div>
    );
}
