import Link from 'next/link';
import { Button } from './components/ui/Button';

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
            <div className="mb-8 relative">
                <div className="absolute inset-0 bg-brand-gradient opacity-20 blur-3xl rounded-full" />
                <h1 className="relative text-9xl font-extrabold text-transparent bg-clip-text bg-brand-gradient">
                    404
                </h1>
            </div>

            <h2 className="text-3xl font-bold text-foreground mb-4">
                Página não encontrada
            </h2>

            <p className="text-text-secondary max-w-md mb-8 text-lg">
                Ops! Parece que a página que você está procurando não existe ou foi removida.
            </p>

            <div className="space-x-4">
                <Link href="/">
                    <Button variant="ghost">
                        Voltar para Início
                    </Button>
                </Link>
                <Link href="/dashboard">
                    <Button variant="brand">
                        Ir para Dashboard
                    </Button>
                </Link>
            </div>
        </div>
    );
}
