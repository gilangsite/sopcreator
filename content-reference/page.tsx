'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, FileText, Instagram, Youtube } from 'lucide-react';
import contentData from '@/data/content-reference.json';
import { motion, AnimatePresence } from 'framer-motion';

type Platform = 'all' | 'medtools.id' | 'medtools.store' | 'medtools.academy' | 'hai.medi' | 'medimpact.co' | 'dokter.mudaa';


export default function ContentReferencePage() {
    const [selectedPlatform, setSelectedPlatform] = useState<Platform>('all');
    const [filteredContent, setFilteredContent] = useState(contentData.contentTemplates);

    useEffect(() => {
        if (selectedPlatform === 'all') {
            setFilteredContent(contentData.contentTemplates);
        } else {
            setFilteredContent(
                contentData.contentTemplates.filter(content =>
                    content.platforms.includes(selectedPlatform)
                )
            );
        }
    }, [selectedPlatform]);

    return (
        <main className="min-h-screen bg-[#F8FAFC] text-slate-800 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-[5%] right-[-10%] w-[800px] h-[800px] bg-blue-100/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute bottom-[10%] left-[-15%] w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
                {/* Header */}
                <header className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center space-x-3 mb-6">
                            <span className="flex items-center px-3 py-1 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-md shadow-sm">
                                Content Library
                            </span>
                            <div className="h-[1px] w-12 bg-blue-200" />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]">
                            Content Reference
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-500 max-w-3xl leading-relaxed font-medium">
                            Koleksi lengkap template layout dan referensi konten dari semua platform MEDTOOLS
                        </p>
                    </motion.div>
                </header>

                {/* Platform Filter */}
                <section className="mb-16">
                    <h2 className="text-sm uppercase tracking-[0.3em] font-black text-slate-900 mb-8">Filter by Platform</h2>
                    <div className="flex flex-wrap gap-3">
                        <FilterButton
                            active={selectedPlatform === 'all'}
                            onClick={() => setSelectedPlatform('all')}
                            label="All Platforms"
                            count={contentData.contentTemplates.length}
                        />
                        {contentData.platforms.map(platform => (
                            <FilterButton
                                key={platform.id}
                                active={selectedPlatform === platform.id as Platform}
                                onClick={() => setSelectedPlatform(platform.id as Platform)}
                                label={platform.name}
                                color={platform.color}
                                count={contentData.contentTemplates.filter(c => c.platforms.includes(platform.id)).length}
                            />
                        ))}
                    </div>
                </section>

                {/* Content Grid */}
                <section className="mb-32">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-sm uppercase tracking-[0.3em] font-black text-slate-900">
                            {selectedPlatform === 'all' ? 'All Templates' : `${selectedPlatform} Templates`}
                        </h2>
                        <span className="text-xs text-slate-400 font-medium">
                            {filteredContent.length} {filteredContent.length === 1 ? 'item' : 'items'}
                        </span>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedPlatform}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredContent.map((content, index) => (
                                <ContentCard key={content.id} content={content} index={index} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filteredContent.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-400 text-lg">No content found for this platform</p>
                        </div>
                    )}
                </section>

                {/* Scripts Section */}
                <section className="mb-32">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-sm uppercase tracking-[0.3em] font-black text-slate-900">Content Scripts</h2>
                        <div className="h-[2px] flex-1 bg-slate-100 ml-6" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contentData.scripts.map((script, index) => (
                            <ScriptCard key={script.id} script={script} index={index} />
                        ))}
                    </div>
                </section>

                {/* Platform Profiles */}
                <section>
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-sm uppercase tracking-[0.3em] font-black text-slate-900">Platform Profiles</h2>
                        <div className="h-[2px] flex-1 bg-slate-100 ml-6" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {contentData.platforms.map((platform, index) => (
                            <PlatformCard key={platform.id} platform={platform} index={index} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

function FilterButton({ active, onClick, label, color, count }: { active: boolean; onClick: () => void; label: string; color?: string; count?: number }) {
    return (
        <button
            onClick={onClick}
            className={`
                px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300
                ${active
                    ? 'bg-blue-500 text-white shadow-lg scale-105'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:shadow-md'
                }
            `}
            style={active && color ? { backgroundColor: color } : {}}
        >
            {label}
            {count !== undefined && (
                <span className={`ml-2 text-xs ${active ? 'opacity-80' : 'opacity-50'}`}>
                    ({count})
                </span>
            )}
        </button>
    );
}

function ContentCard({ content, index }: { content: any; index: number }) {
    const [isLoaded, setIsLoaded] = useState(false);

    const getIcon = () => {
        if (content.type === 'instagram') return <Instagram size={16} />;
        if (content.type === 'youtube') return <Youtube size={16} />;
        return <ExternalLink size={16} />;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
            <div className="aspect-[9/16] bg-slate-100 relative overflow-hidden">
                {content.type === 'youtube' ? (
                    <iframe
                        src={content.embedUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={() => setIsLoaded(true)}
                    />
                ) : content.type === 'instagram' ? (
                    <iframe
                        src={content.embedUrl}
                        className="w-full h-full scale-100"
                        scrolling="no"
                        onLoad={() => setIsLoaded(true)}
                    />
                ) : content.type === 'tiktok' ? (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900">
                        <a
                            href={content.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-400 transition-colors"
                        >
                            <ExternalLink size={32} />
                        </a>
                    </div>
                ) : null}

                {!isLoaded && content.type !== 'tiktok' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
            </div>

            <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                    <span className="text-blue-500">{getIcon()}</span>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                        {content.type}
                    </span>
                </div>
                <h3 className="font-bold text-slate-800 mb-2 leading-tight">{content.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    {content.platforms.map((platform: string) => (
                        <span
                            key={platform}
                            className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-md"
                        >
                            @{platform}
                        </span>
                    ))}
                </div>
                <a
                    href={content.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors group"
                >
                    View Original
                    <ExternalLink size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
        </motion.div>
    );
}

function ScriptCard({ script, index }: { script: any; index: number }) {
    return (
        <motion.a
            href={script.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="group block bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100 transition-colors" />

            <div className="relative z-10">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {script.icon}
                </div>
                <h3 className="font-bold text-slate-800 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {script.title}
                </h3>
                <div className="flex items-center text-xs text-slate-400 font-medium">
                    <FileText size={12} className="mr-1.5" />
                    Microsoft Word
                </div>
            </div>

            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={16} className="text-blue-500" />
            </div>
        </motion.a>
    );
}

function PlatformCard({ platform, index }: { platform: any; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
            <div
                className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center text-white font-black text-xl"
                style={{ backgroundColor: platform.color }}
            >
                {platform.name.charAt(1).toUpperCase()}
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-3">{platform.name}</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">{platform.description}</p>

            <div className="space-y-3">
                {platform.instagram && (
                    <a
                        href={platform.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors group"
                    >
                        <Instagram size={16} className="mr-2" />
                        Instagram
                        <ExternalLink size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                )}
                {platform.tiktok && (
                    <a
                        href={platform.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors group"
                    >
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                        TikTok
                        <ExternalLink size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                )}
            </div>
        </motion.div>
    );
}
