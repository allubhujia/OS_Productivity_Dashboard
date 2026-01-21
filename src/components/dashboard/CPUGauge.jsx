import React from 'react';

export default function CPUGauge({ percentage = 0, cores = [] }) {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const progress = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-40 h-40">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                        fill="none"
                    />

                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={progress}
                        style={{ transition: 'stroke-dashoffset 1s' }}
                    />

                    <defs>
                        <linearGradient id="gradient">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-white">{percentage}</span>
                    <span className="text-slate-400 text-sm">% Usage</span>
                </div>
            </div>

            {cores.length > 0 && (
                <div className="mt-6 grid grid-cols-4 gap-2 w-full">
                    {cores.map((value, i) => (
                        <div key={i} className="text-center">
                            <div className="w-full h-2 bg-white/10 rounded-full">
                                <div
                                    className="h-2 bg-gradient-to-r from-cyan-400 to-purple-400"
                                    style={{ width: `${value}%` }}
                                />
                            </div>
                            <span className="text-xs text-slate-500">C{i + 1}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
