
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import platformsConfig from '@/config/platforms.json';

const contentDirectory = path.join(process.cwd(), 'content');

export interface PlatformData {
    id: string;
    slug: string;
    filename: string;
    title: string;
    platform_handle: string;
    short_description: string;
    hero_image: string;
    kpi: boolean;
    social_embeds: { type: string; url: string }[];
    contentHtml: string;
    extractedKpis?: any[];
    tocItems?: { level: number; text: string; id: string }[];
    toc?: boolean;
    kpi_enabled?: boolean;
}

export function getAllPlatformIds() {
    return platformsConfig.platforms.map((platform) => ({
        slug: platform.slug,
    }));
}

export async function getPlatformData(slug: string): Promise<PlatformData | null> {
    const platform = platformsConfig.platforms.find((p) => p.slug === slug);

    if (!platform) {
        return null;
    }

    const fullPath = path.join(contentDirectory, platform.markdown);
    if (!fs.existsSync(fullPath)) {
        console.error(`File not found: ${fullPath}`);
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    let extractedKpis: any[] = [];
    let tocItems: any[] = [];

    const processedContent = await remark()
        .use(gfm)
        .use(() => (tree: any) => {
            tree.children.forEach((node: any) => {
                // TOC extraction and Header IDs
                if (node.type === 'heading') {
                    const text = node.children.map((c: any) => {
                        if (c.value) return c.value;
                        if (c.children) return c.children.map((cc: any) => cc.value || '').join('');
                        return '';
                    }).join('');

                    const id = text.toLowerCase().replace(/[^\w]+/g, '-');
                    node.data = node.data || {};
                    node.data.hProperties = node.data.hProperties || {};
                    node.data.hProperties.id = id;

                    if (node.depth <= 3) {
                        tocItems.push({
                            level: node.depth,
                            text: text,
                            id: id
                        });
                    }
                }

                // KPI extraction from the full document's tables
                if (node.type === 'table') {
                    const headerRow = node.children[0];
                    const headers = headerRow?.children.map((cell: any) => {
                        const extractText = (n: any): string => {
                            if (n.value) return n.value;
                            if (n.children) return n.children.map(extractText).join('');
                            return '';
                        };
                        return extractText(cell).trim();
                    });

                    // Search for KPI tables
                    if (headers && (headers.includes('Kategori KPI') || headers.includes('KPI') || headers.includes('Metric'))) {
                        const rows = node.children.slice(1);
                        rows.forEach((row: any) => {
                            const cells = row.children.map((cell: any) => {
                                const extractText = (n: any): string => {
                                    if (n.value) return n.value;
                                    if (n.children) return n.children.map(extractText).join('');
                                    return '';
                                };
                                return extractText(cell).trim();
                            });

                            // Map logic based on headers
                            let metric = "";
                            let target = "";
                            let freq = "Bulanan";
                            let priority = "Medium";

                            if (headers.includes('Metric')) {
                                const metricIdx = headers.indexOf('Metric');
                                metric = cells[metricIdx];
                                const targetIdx = headers.indexOf('Hijau (Target)') !== -1 ? headers.indexOf('Hijau (Target)') : (headers.indexOf('Target') !== -1 ? headers.indexOf('Target') : -1);
                                if (targetIdx !== -1) target = cells[targetIdx];
                            } else if (headers.includes('KPI')) {
                                metric = cells[0];
                                target = cells[1];
                                freq = cells[2] || "Bulanan";
                            }

                            if (metric && metric !== "" && !metric.includes("TBD")) {
                                extractedKpis.push({
                                    metric: metric.replace(/\*\*/g, ''),
                                    target: target || "Lihat Tabel",
                                    freq: freq,
                                    priority: (metric.toLowerCase().includes('reels') || metric.toLowerCase().includes('post')) ? 'High' : 'Medium',
                                    unit: target.split(' ').pop() || ''
                                });
                            }
                        });
                    }
                }
            });
        })
        .use(html, { sanitize: false })
        .process(matterResult.content);

    let contentHtml = processedContent.toString();

    // Wrap tables in a scrollable container for mobile
    contentHtml = contentHtml.replace(/<table>/g, '<div class="table-container"><table>').replace(/<\/table>/g, '</table></div>');

    return {
        id: platform.id || platform.slug,
        slug: platform.slug,
        filename: platform.markdown,
        contentHtml,
        extractedKpis: extractedKpis.slice(0, 6), // Limit to top 6 for the scorecard
        tocItems,
        ...matterResult.data,
    } as any;
}
