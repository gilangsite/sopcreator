import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Content Reference | MEDTOOLS Creator Hub',
    description: 'Koleksi lengkap template layout dan referensi konten dari semua platform MEDTOOLS - Instagram, TikTok, dan YouTube',
};

export default function ContentReferenceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
