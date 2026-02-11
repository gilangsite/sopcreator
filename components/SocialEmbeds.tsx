
'use client';

import { useEffect } from 'react';
import { Video, ExternalLink } from 'lucide-react';

type EmbedItem = {
    type: string;
    url: string;
};

type Props = {
    embeds: EmbedItem[];
};

export default function SocialEmbeds({ embeds }: Props) {
    useEffect(() => {
        const loadScript = (src: string) => {
            if (!document.querySelector(`script[src="${src}"]`)) {
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                document.body.appendChild(script);
            }
        };

        if (embeds.some(e => e.type === 'instagram')) {
            loadScript("//www.instagram.com/embed.js");
            // @ts-ignore
            if (window.instgrm) window.instgrm.Embeds.process();
        }
        if (embeds.some(e => e.type === 'tiktok')) {
            loadScript("https://www.tiktok.com/embed.js");
        }
    }, [embeds]);

    if (!embeds || embeds.length === 0) return null;

    return (
        <div className="my-16">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
                <Video className="mr-3 text-blue-500" size={24} />
                Content Examples
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {embeds.map((embed, idx) => (
                    <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md relative group hover:shadow-xl transition-shadow duration-300">
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-400 to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{embed.type}</span>
                            <a href={embed.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors">
                                <ExternalLink size={14} />
                            </a>
                        </div>
                        <div className="p-4 flex flex-col items-center bg-slate-50 min-h-[300px] justify-center">
                            {/* Official Embeds */}
                            {embed.type === 'instagram' && (
                                <blockquote
                                    className="instagram-media"
                                    data-instgrm-permalink={embed.url}
                                    data-instgrm-version="14"
                                    style={{ background: '#FFF', border: 0, borderRadius: '3px', boxShadow: 'none', margin: '1px', maxWidth: '540px', minWidth: '326px', padding: 0, width: '99.375%' }}
                                >
                                </blockquote>
                            )}
                            {embed.type === 'tiktok' && (
                                <blockquote className="tiktok-embed" cite={embed.url} data-video-id={embed.url.split('/video/')[1] || ''} style={{ maxWidth: '605px', minWidth: '325px' }}>
                                    <section>
                                        <a target="_blank" href={embed.url} className='text-xs text-slate-400'>View on TikTok</a>
                                    </section>
                                </blockquote>
                            )}
                            {embed.type === 'youtube' && (
                                <iframe
                                    width="100%"
                                    height="250"
                                    src={`https://www.youtube.com/embed/${embed.url.includes('v=') ? embed.url.split('v=')[1] : embed.url.split('/').pop()}`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="rounded-lg shadow-sm"
                                ></iframe>
                            )}

                            {/* Fallback Metadata & Button (Visible if script fails or always as secondary) */}
                            <div className="mt-6 w-full px-4 text-center pb-4">
                                <p className="text-[10px] text-slate-400 mb-3 break-all font-mono opacity-50">{embed.url}</p>
                                <a
                                    href={embed.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 shadow-sm hover:bg-blue-50 hover:text-blue-600 transition-all group/btn"
                                >
                                    <span>View Original</span>
                                    <ExternalLink size={12} className="ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
