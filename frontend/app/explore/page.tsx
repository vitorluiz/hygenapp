
import { Metadata } from 'next';
import ExploreClient from './ExploreClient';

export const metadata: Metadata = {
    title: 'Descubra Pousadas e Hotéis Incríveis | Hyfen',
    description: 'Encontre a hospedagem perfeita para sua próxima viagem na Chapada dos Guimarães e região. Pousadas, hotéis e casas de temporada com o melhor preço.'
};

export default function ExplorePage() {
    return <ExploreClient />;
}
