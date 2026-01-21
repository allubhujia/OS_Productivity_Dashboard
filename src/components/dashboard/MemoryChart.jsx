import React from 'react';

export default function MemoryChart({ used = 0, total = 16, unit = "GB" }) {
    const percentage = total > 0 ? (used / total) * 100 : 0;
    const free = total - used;
    return (
        <div className="space-y-4">
            <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
                <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                animate-pulse opacity-50" />
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                    <span className="text-slate-400 text-sm">Used</span>
                    <span className="text-white font-semibold">{used.toFixed(1)} {unit}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                    <span className="text-slate-400 text-sm">Free</span>
                    <span className="text-white font-semibold">{free.toFixed(1)} {unit}</span>
                </div>
            </div>
            <div className="grid grid-cols-16 gap-1 mt-4">
                {Array.from({ length: 16 }).map((_, i) => (
                    <div
                        key={i}
                        className={`h-6 rounded-sm ${i < Math.floor(percentage / 6.25) 
                            ? 'bg-gradient-to-t from-purple-600 to-pink-500' 
                            : 'bg-white/10'}`}
                    />
                ))}
            </div>
        </div>
    );
}