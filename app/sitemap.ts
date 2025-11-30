import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://watchtolead.com';

    // Core pages
    const routes = [
        '',
        '/about',
        '/services',
        '/team',
        '/contact',
        '/vocabulary',
        '/games',
        '/blog',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Game subpages
    const gameRoutes = [
        '/games/physics',
        '/games/chemistry',
        '/games/math',
        '/games/english',
        '/games/quiz',
        '/games/logic',
        '/games/science',
        '/games/memory',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    // Vocabulary subpages
    const vocabRoutes = [
        '/vocabulary/learn',
        '/vocabulary/games',
        '/vocabulary/progress',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...routes, ...gameRoutes, ...vocabRoutes];
}
