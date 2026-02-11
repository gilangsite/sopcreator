
export default function Footer() {
    return (
        <footer className="border-t border-slate-200 py-12 mt-auto bg-white relative z-20">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-slate-500 text-xs uppercase tracking-widest font-medium">
                    &copy; {new Date().getFullYear()} MEDTOOLS Creator Department.
                </p>
                <p className="text-slate-400 text-[10px] mt-2 tracking-wide">
                    Internal Use Only. Confidential.
                </p>
            </div>
        </footer>
    );
}
