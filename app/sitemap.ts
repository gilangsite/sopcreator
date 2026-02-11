
export const dynamic = 'force-static';
import { MetadataRoute } from 'next';
import platformsConfig from '@/config/platforms.json';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://creator.medtools.id';

    const platforms = platformsConfig.platforms.map((p) => ({
        url: `${baseUrl}/platform/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        ...platforms,
    ];
}
