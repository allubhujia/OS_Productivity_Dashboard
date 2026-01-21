import React from 'react';

export default function StatCard({ title, value, unit, icon: Icon, color, children, className = "" }) {
    const colorClasses = {
        cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20",
        purple: "from-purple-500/20 to-purple-500/5 border-purple-500/20",
        emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
        orange: "from-orange-500/20 to-orange-500/5 border-orange-500/20",
        pink: "from-pink-500/20 to-pink-500/5 border-pink-500/20",
    };

    const iconColors = {
        cyan: "text-cyan-400",
        purple: "text-purple-400",
        emerald: "text-emerald-400",
        orange: "text-orange-400",
        pink: "text-pink-400",
    };

    return (
        <div
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colorClasses[color]} 
                        border backdrop-blur-xl p-6 animate-fade-in-up ${className}`}
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">{title}</p>
                    {value !== undefined && (
                        <div className="flex items-baseline gap-1 mt-2">
                            <span className="text-4xl font-bold text-white tracking-tight">{value}</span>
                            {unit && <span className="text-slate-400 text-lg">{unit}</span>}
                        </div>
                    )}
                </div>
                {Icon && (
                    <div className={`p-3 rounded-xl bg-white/5 ${iconColors[color]}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                )}
            </div>
            
            {children}
        </div>
    );
}