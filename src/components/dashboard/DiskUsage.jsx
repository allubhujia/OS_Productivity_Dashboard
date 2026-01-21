import React from 'react';
import { HardDrive } from 'lucide-react';

export default function DiskUsage({ disks = [] }) {
    return (
        <div className="space-y-4">
            {disks.map((disk, index) => {
                const percentage = disk.total > 0 ? (disk.used / disk.total) * 100 : 0;
                return (
                    <div
                        key={disk.name || index}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-400"
                        style={{ 
                            animationDelay: `${index * 0.1}s`,
                            animation: 'fadeInLeft 0.4s ease-out forwards'
                        }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-emerald-500/20">
                                    <HardDrive className="w-4 h-4 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">{disk.name}</p>
                                    <p className="text-slate-500 text-xs">{disk.type || 'SSD'}</p>
                                </div>
                            </div>
                            <span className="text-emerald-400 font-semibold">{percentage.toFixed(1)}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-800"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-slate-500">
                            <span>{disk.used} GB used</span>
                            <span>{disk.total} GB total</span>
                        </div>
                    </div>
                );
            })}
            <style>{`
                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </div>
    );
}