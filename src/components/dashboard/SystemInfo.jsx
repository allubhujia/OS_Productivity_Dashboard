import React from 'react';
import { Monitor, Clock, Cpu, MemoryStick } from 'lucide-react';

export default function SystemInfo({ info = {} }) {
    const infoItems = [
        { icon: Monitor, label: 'Operating System', value: info.os || 'N/A' },
        { icon: Cpu, label: 'Processor', value: info.processor || 'N/A' },
        { icon: MemoryStick, label: 'Total RAM', value: info.ram || 'N/A' },
        { icon: Clock, label: 'Uptime', value: info.uptime || 'N/A' },
    ];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {infoItems.map((item, index) => (
                <div
                    key={item.label}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300"
                    style={{ 
                        animationDelay: `${index * 0.1}s`,
                        animation: 'scaleIn 0.3s ease-out forwards'
                    }}
                >
                    <div className="p-2 rounded-lg bg-cyan-500/20">
                        <item.icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-slate-500 text-xs">{item.label}</p>
                        <p className="text-white font-medium text-sm truncate">{item.value}</p>
                    </div>
                </div>
            ))}
            <style>{`
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
}