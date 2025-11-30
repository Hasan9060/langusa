import { Metadata } from 'next';
import GamesContent from './GamesContent';

export const metadata: Metadata = {
    title: 'Educational Games - Learn Physics, Math, Chemistry & More',
    description: 'Play interactive educational games to improve your skills in Physics, Chemistry, Math, English, and General Knowledge. Fun learning for all ages.',
    openGraph: {
        title: 'Educational Games - Watch to Lead',
        description: 'Play interactive educational games to improve your skills in Physics, Chemistry, Math, English, and General Knowledge.',
    },
};

export default function GamesPage() {
    return <GamesContent />;
}
