
import { Metadata, ResolvingMetadata } from 'next';
import PublicPropertyClient from './PublicPropertyClient';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // Buscar dados da propriedade para SEO dinâmico
    const { slug } = await params;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

    try {
        const response = await fetch(`${apiUrl}/api/v1/public/properties/${slug}/`, { cache: 'no-store' });

        if (!response.ok) {
            return {
                title: 'Propriedade não encontrada | Hyfen',
                description: 'A propriedade que você procura não está disponível.'
            };
        }

        const property = await response.json();

        return {
            title: `${property.name} - ${property.city}, ${property.state} | Hyfen`,
            description: property.description ? property.description.substring(0, 160) + '...' : `Conheça ${property.name} em ${property.city}. Agende sua estadia agora!`,
            openGraph: {
                title: property.name,
                description: property.description ? property.description.substring(0, 200) : '',
                images: property.images && property.images.length > 0 ? [property.images[0].image] : [],
            },
        };
    } catch (error) {
        console.error("Erro ao gerar metadata:", error);
        return {
            title: 'Hyfen - Hospedagens',
        };
    }
}

export default async function PublicPropertyPage({ params }: Props) {
    const { slug } = await params;
    return <PublicPropertyClient slug={slug} />;
}
