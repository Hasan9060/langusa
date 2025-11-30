import { Metadata } from 'next';
import VocabularyContent from './VocabularyContent';

export const metadata: Metadata = {
    title: 'Vocabulary Builder - Learn New Words Daily',
    description: 'Expand your English vocabulary with our interactive word builder. Learn new words daily, play vocabulary games, and track your progress.',
    openGraph: {
        title: 'Vocabulary Builder - Watch to Lead',
        description: 'Expand your English vocabulary with our interactive word builder. Learn new words daily, play vocabulary games, and track your progress.',
    },
};

export default function VocabularyPage() {
    return <VocabularyContent />;
}
