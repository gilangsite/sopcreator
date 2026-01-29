
'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ArrowRight, BarChart2, Users, Target } from 'lucide-react';
import platformsConfig from '@/config/platforms.json';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  return (
    <div ref={containerRef} className="min-h-[200vh] relative bg-[#F8FAFC] text-slate-800 overflow-hidden">

      {/* Background Ambience (Soft Blobs) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] mix-blend-multiply opacity-60 animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[100px] mix-blend-multiply opacity-50" />
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex flex-col items-center justify-center text-center px-6 z-10"
        style={{ opacity: heroOpacity, scale: heroScale, y: yHero }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 text-slate-900">
            MEDTOOLS<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300">Creator Hub</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-light max-w-2xl mx-auto tracking-wide mb-12 leading-relaxed">
            Standard Operational Procedures & Content Strategy
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400 font-medium">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-slate-300 to-transparent"></div>
        </motion.div>
      </motion.section>

      {/* Navigation Grid (Parallax Enter) */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-slate-800 mb-12 pl-4 border-l-4 border-blue-500">Platforms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {platformsConfig.navigation.filter(n => n.href !== '/').map((platform, i) => (
            <ParallaxCard key={platform.href} delay={i * 0.1}>
              <Link href={platform.href} className="block group h-full">
                <div className="h-full p-8 rounded-[16px] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-4xl font-light text-slate-200 group-hover:text-blue-500 transition-colors duration-300">0{i + 1}</span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                      <ArrowRight className="text-slate-400 group-hover:text-white transition-colors" size={14} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{platform.label}</h3>
                  <p className="text-slate-500 text-sm">Access SOP & Assets</p>
                </div>
              </Link>
            </ParallaxCard>
          ))}
        </div>
      </section>

      {/* Department Overview Section */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 py-24 border-t border-slate-100">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div>
              <h2 className="text-sm uppercase tracking-[0.2em] text-blue-500 font-bold mb-4">Visi & Misi</h2>
              <h3 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">Elevating Medical Knowledge through Creative Excellence.</h3>
              <p className="text-slate-500 leading-relaxed text-lg">
                Menjadi departemen kreatif medis terbaik di Asia Tenggara yang mampu mengombinasikan akurasi pengetahuan kedokteran dengan estetika visual modern untuk membangun ekosistem kesehatan yang lebih baik.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-50">
                <Target className="text-blue-500 mb-4" size={24} />
                <h4 className="font-bold text-slate-800 mb-2">Our Mission</h4>
                <ul className="text-sm text-slate-500 space-y-2 list-disc pl-4">
                  <li>Edukasi Medis Tanpa Batas</li>
                  <li>Visualisasi data yang akurat</li>
                  <li>Inovasi format konten harian</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-50">
                <Users className="text-blue-500 mb-4" size={24} />
                <h4 className="font-bold text-slate-800 mb-2">Structure</h4>
                <div className="text-sm text-slate-500 space-y-1">
                  <p className="font-medium text-slate-700">Content Lead</p>
                  <p>Lead Creative Strategist</p>
                  <p>Platform Specialists (5)</p>
                  <p>Multimedia Team</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[32px] p-10 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-sm uppercase tracking-[0.2em] text-blue-400 font-bold mb-2">The Roadmap</h2>
              <h3 className="text-4xl font-bold mb-12">Target 2026</h3>

              <div className="space-y-8">
                {[
                  { label: "Total Reach", value: "500M+", sub: "Across all platforms" },
                  { label: "Active Users", value: "1M+", sub: "Daily engagement" },
                  { label: "Production Efficiency", value: "x3", sub: "Automation & AI Workflows" },
                  { label: "Impact Score", value: "9.8/10", sub: "User satisfaction survey" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-white/10 pb-6 group-hover:border-blue-500/50 transition-colors">
                    <div>
                      <p className="text-blue-400 font-bold text-sm mb-1 uppercase tracking-wider">{item.label}</p>
                      <p className="text-white/60 text-xs">{item.sub}</p>
                    </div>
                    <p className="text-3xl font-light">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 py-48 text-center bg-white/30 backdrop-blur-3xl rounded-[48px] my-24 border border-white/50">
        <h2 className="text-4xl md:text-5xl font-bold mb-20 text-slate-800 tracking-tight leading-time">
          Reliability.<br /><span className="text-slate-400">Impact.</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-12 text-left">
          <div className="space-y-4 p-6 rounded-2xl bg-white shadow-sm border border-slate-50">
            <Target className="text-blue-500" size={28} />
            <h4 className="text-lg font-bold text-slate-800">Precision</h4>
            <p className="text-slate-500 leading-relaxed text-sm">SOPs designed to minimize error radius and maximize content output consistency.</p>
          </div>
          <div className="space-y-4 p-6 rounded-2xl bg-white shadow-sm border border-slate-50">
            <Users className="text-blue-500" size={28} />
            <h4 className="text-lg font-bold text-slate-800">Culture</h4>
            <p className="text-slate-500 leading-relaxed text-sm">Fostering a data-driven environment where creativity meets analytical rigor.</p>
          </div>
          <div className="space-y-4 p-6 rounded-2xl bg-white shadow-sm border border-slate-50">
            <BarChart2 className="text-blue-500" size={28} />
            <h4 className="text-lg font-bold text-slate-800">Scale</h4>
            <p className="text-slate-500 leading-relaxed text-sm">Built to support the ecosystem's growth to 1M+ active users by 2026.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ParallaxCard({ children, delay }: { children: React.ReactNode, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      {children}
    </motion.div>
  )
}
