
import { TrendingUp, Target } from 'lucide-react';
import kpiData from '@/data/kpi.json';
import clsx from 'clsx';

type Props = {
    platformId: string;
    metrics?: any[];
};

export default function KPIScorecard({ platformId, metrics: manualMetrics }: Props) {
    // @ts-ignore
    const metrics = manualMetrics || kpiData[platformId] || [];

    if (metrics.length === 0) return null;

    return (
        <div className="my-16 border-t border-slate-200 pt-12">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center justify-between">
                <span className="flex items-center"><TrendingUp className="mr-3 text-blue-500" size={24} /> Performance Targets</span>
                <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">Monthly Goals</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {metrics.map((m: any, idx: number) => {
                    const isHigh = m.priority === 'High';
                    const trend = ['up', 'down', 'flat'][idx % 3]; // Stable mock trend based on index

                    return (
                        <div key={idx} className="group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100 transition-colors" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <span className={clsx(
                                        "px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider font-bold border",
                                        isHigh ? "bg-red-50 text-red-500 border-red-100" : "bg-blue-50 text-blue-500 border-blue-100"
                                    )}>
                                        {m.priority || 'Standard'}
                                    </span>
                                    <div className={clsx(
                                        "p-1.5 rounded-md",
                                        trend === 'up' ? "bg-emerald-50 text-emerald-500" : trend === 'down' ? "bg-amber-50 text-amber-500" : "bg-slate-50 text-slate-400"
                                    )}>
                                        {trend === 'up' ? <TrendingUp size={14} /> : trend === 'down' ? <TrendingUp size={14} className="rotate-180" /> : <div className="w-3.5 h-[2px] bg-current my-1.5" />}
                                    </div>
                                </div>

                                <h4 className="font-semibold text-slate-500 text-xs mb-3 uppercase tracking-wide">{m.metric}</h4>
                                <div className="flex items-baseline space-x-2">
                                    <span className="text-4xl font-bold text-slate-900 tracking-tight">{m.target}</span>
                                    <span className="text-slate-400 text-sm font-medium">{m.unit}</span>
                                </div>

                                <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex items-center text-[10px] text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded-md">
                                        <Target size={10} className="mr-1.5" />
                                        {m.freq}
                                    </div>
                                    <div className="w-16 h-4 opacity-30">
                                        {/* Mock Sparkline SVG */}
                                        <svg viewBox="0 0 100 20" className="w-full h-full stroke-blue-500 stroke-2 fill-none">
                                            <path d={`M0 20 L20 ${10 + Math.random() * 10} L40 ${5 + Math.random() * 15} L60 ${idx % 2 ? 5 : 15} L80 10 L100 ${trend === 'up' ? 2 : 18}`} strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
