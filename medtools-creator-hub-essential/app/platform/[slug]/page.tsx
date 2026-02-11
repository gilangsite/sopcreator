
import { getAllPlatformIds, getPlatformData } from '@/lib/api';
import KPIScorecard from '@/components/KPIScorecard';
import SocialEmbeds from '@/components/SocialEmbeds';
import PrintButton from '@/components/PrintButton';
import TableOfContents from '@/components/TableOfContents';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return getAllPlatformIds();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const platformData = await getPlatformData(slug);

    if (!platformData) {
        return { title: 'Platform Not Found' };
    }

    return {
        title: `${platformData.title.replace("SOP Panduan Creator – ", "")} | MEDTOOLS Creator Hub`,
        description: platformData.short_description,
    };
}

export default async function PlatformPage({ params }: Props) {
    const { slug } = await params;
    const platformData = await getPlatformData(slug);

    if (!platformData) {
        return notFound();
    }

    const isKpiEnabled = platformData.kpi_enabled || (platformData as any).kpi;

    return (
        <main className="min-h-screen bg-[#F8FAFC] text-slate-800 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-[5%] right-[-10%] w-[800px] h-[800px] bg-blue-100/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute bottom-[10%] left-[-15%] w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 pt-32 pb-24 relative z-10">
                {/* Navigation Back */}
                <div className="flex justify-between items-center mb-12 print:hidden">
                    <Link href="/" className="inline-flex items-center text-sm font-bold text-blue-500 hover:text-blue-600 transition-all group">
                        <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Kembali ke Dashboard
                    </Link>
                    <div className="hidden sm:flex items-center space-x-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status:</span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[10px] font-bold uppercase rounded-md border border-emerald-200">Terverifikasi</span>
                    </div>
                </div>

                {/* Official SOP Header */}
                <header className="mb-20 print:mb-12">
                    <div className="flex items-center space-x-3 mb-6">
                        <span className="flex items-center px-3 py-1 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-md shadow-sm">
                            <CheckCircle size={10} className="mr-1.5" /> SOP Utama
                        </span>
                        <div className="h-[1px] w-12 bg-blue-200" />
                        <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">{platformData.platform_handle}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]">
                        {platformData.title.replace("SOP Panduan Creator – ", "")}
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-500 max-w-3xl leading-relaxed font-medium">
                        {platformData.short_description}
                    </p>
                </header>

                {/* Table of Contents */}
                {platformData.tocItems && (
                    <TableOfContents items={platformData.tocItems} />
                )}

                {/* Quick View: Performance Metrics */}
                {isKpiEnabled && (
                    <section className="mb-24 print:hidden" id="quick-kpi">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-sm uppercase tracking-[0.3em] font-black text-slate-900">Target Performa Utama</h2>
                            <div className="h-[2px] flex-1 bg-slate-100 ml-6" />
                        </div>
                        <KPIScorecard platformId={platformData.id} metrics={platformData.extractedKpis} />
                    </section>
                )}

                {/* Main SOP Content (Full Document Viewer) */}
                <section className="bg-white rounded-[32px] p-8 md:p-16 shadow-xl border border-slate-100 relative overflow-hidden transition-all hover:shadow-2xl">
                    {/* Official Document Watermark Background Placeholder */}
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none">
                        <span className="text-9xl font-black text-blue-900 rotate-12 block">SOP</span>
                    </div>

                    <div className="flex items-center space-x-4 mb-20 print:mb-10">
                        <h2 className="text-xs uppercase tracking-[0.4em] font-black text-blue-500 whitespace-nowrap">Dokumen Panduan Lengkap</h2>
                        <div className="h-[1px] flex-1 bg-blue-50" />
                    </div>

                    <article className="prose prose-slate prose-lg max-w-none 
                        prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tight
                        prose-h1:text-4xl md:text-5xl prose-h1:mb-12
                        prose-h2:text-2xl md:text-3xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:pb-6 prose-h2:border-b-2 prose-h2:border-blue-50/50
                        prose-h3:text-xl prose-h3:text-blue-600 prose-h3:mt-12 prose-h3:font-bold
                        
                        prose-p:text-slate-700 prose-p:leading-[1.8] prose-p:mb-6
                        prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                        prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                        prose-li:text-slate-700 prose-li:mb-2 prose-li:leading-relaxed
                        
                        prose-table:w-full prose-table:border-collapse prose-table:bg-white prose-table:rounded-2xl prose-table:shadow-sm prose-table:border prose-table:border-slate-200
                        prose-thead:bg-slate-50 prose-thead:text-slate-900
                        prose-th:p-4 prose-th:text-xs prose-th:uppercase prose-th:tracking-widest prose-th:font-black prose-th:border-b prose-th:border-slate-200
                        prose-td:p-4 prose-td:text-slate-700 prose-td:border-b prose-td:border-slate-100 prose-td:text-sm md:text-base prose-td:leading-relaxed
                        
                        prose-strong:text-slate-900 prose-strong:font-bold
                        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:italic
                        
                        prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-12
                        
                        prose-hr:my-16 prose-hr:border-slate-100
                    ">
                        <div dangerouslySetInnerHTML={{ __html: platformData.contentHtml }} />
                    </article>
                </section>

                {/* Social Embeds Activity */}
                {platformData.social_embeds && platformData.social_embeds.length > 0 && (
                    <section className="mt-32 print:hidden">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-sm uppercase tracking-[0.3em] font-black text-slate-900">Lampiran: Contoh Konten Live</h2>
                            <div className="h-[2px] flex-1 bg-slate-100 ml-6" />
                        </div>
                        <SocialEmbeds embeds={platformData.social_embeds} />
                    </section>
                )}
            </div>

            <PrintButton />
        </main>
    );
}
