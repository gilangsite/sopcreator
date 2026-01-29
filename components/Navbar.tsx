
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import platformsConfig from '@/config/platforms.json';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={clsx(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
                isScrolled
                    ? 'bg-white/80 backdrop-blur-md border-slate-200 shadow-sm'
                    : 'bg-transparent border-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo / Home */}
                    <Link href="/" className="flex items-center space-x-2 font-bold text-slate-800 text-xl tracking-tight hover:text-primary transition-colors">
                        <span>MEDTOOLS<span className="font-light text-slate-500">CREATOR</span></span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-1">
                        {platformsConfig.navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-primary hover:bg-blue-50 transition-all"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-slate-600 hover:text-primary hover:bg-blue-50 focus:outline-none"
                            aria-label="Toggle Menu"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 overflow-hidden shadow-lg"
                    >
                        <div className="px-4 pt-2 pb-4 space-y-1">
                            {platformsConfig.navigation.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-3 rounded-md text-base font-medium text-slate-600 hover:text-primary hover:bg-blue-50"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
