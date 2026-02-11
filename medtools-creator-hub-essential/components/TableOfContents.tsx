
'use client';

import { List } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

type TOCItem = {
    level: number;
    text: string;
    id: string;
};

type Props = {
    items: TOCItem[];
};

export default function TableOfContents({ items }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    if (!items || items.length === 0) return null;

    return (
        <>
            {/* Desktop TOC (Sticky Sidebar) */}
            <aside className="hidden lg:block fixed left-[calc(50%+550px)] top-32 w-64 max-h-[calc(100vh-160px)] overflow-y-auto px-4 py-6 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-2xl shadow-sm print:hidden">
                <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-slate-100">
                    <List size={18} className="text-blue-500" />
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">On this page</h4>
                </div>
                <ul className="space-y-3">
                    {items.map((item) => (
                        <li
                            key={item.id}
                            style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                        >
                            <a
                                href={`#${item.id}`}
                                className={clsx(
                                    "text-sm transition-colors block leading-tight",
                                    item.level === 1 ? "font-bold text-slate-800" : "text-slate-500 hover:text-blue-500"
                                )}
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Mobile TOC (Collapsible) */}
            <div className="lg:hidden mb-12 print:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm text-slate-700 font-medium"
                >
                    <span className="flex items-center"><List size={18} className="mr-3 text-blue-500" /> Table of Contents</span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </motion.span>
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <ul className="mt-4 p-4 space-y-4 bg-slate-50 rounded-xl border border-slate-100">
                                {items.map((item) => (
                                    <li
                                        key={item.id}
                                        style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                                    >
                                        <a
                                            href={`#${item.id}`}
                                            onClick={() => setIsOpen(false)}
                                            className={clsx(
                                                "text-sm transition-colors block",
                                                item.level === 1 ? "font-bold text-slate-800" : "text-slate-500"
                                            )}
                                        >
                                            {item.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
