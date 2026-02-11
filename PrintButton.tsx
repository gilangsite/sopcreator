
'use client';

import { Printer } from 'lucide-react';

export default function PrintButton() {
    return (
        <button
            onClick={() => window.print()}
            className="fixed bottom-8 right-8 z-40 bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 px-6 py-4 rounded-full shadow-2xl hover:bg-blue-600 hover:text-white hover:scale-105 transition-all print:hidden flex items-center space-x-3 group font-bold text-sm"
        >
            <Printer size={20} />
            <span>Unduh PDF</span>
        </button>
    );
}
