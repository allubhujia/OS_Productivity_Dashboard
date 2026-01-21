import React from 'react';

export default function ProcessList({ processes = [] }) {
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'running': return 'bg-emerald-400';
            case 'sleeping': return 'bg-yellow-400';
            case 'stopped': return 'bg-red-400';
            default: return 'bg-slate-400';
        }
    };
    return (
        <div className="space-y-2">
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs text-slate-500 uppercase tracking-wider">
                <span className="col-span-4">Process</span>
                <span className="col-span-2 text-right">PID</span>
                <span className="col-span-2 text-right">CPU</span>
                <span className="col-span-2 text-right">Memory</span>
                <span className="col-span-2 text-right">Status</span>
            </div>
            <div className="space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar">
                {processes.map((process, index) => (
                    <div
                        key={process.pid || index}
                        className="grid grid-cols-12 gap-4 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 
                                   transition-all cursor-pointer group"
                        style={{ 
                            animationDelay: `${index * 0.03}s`,
                            animation: 'fadeInUp 0.2s ease-out forwards'
                        }}
                    >
                        <div className="col-span-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 
                                            flex items-center justify-center text-xs font-bold text-white">
                                {process.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="truncate">
                                <p className="text-white font-medium text-sm truncate">{process.name}</p>
                                <p className="text-slate-500 text-xs truncate">{process.user || 'system'}</p>
                            </div>
                        </div>
                        <span className="col-span-2 text-right text-slate-400 text-sm self-center">
                            {process.pid}
                        </span>
                        <span className={`col-span-2 text-right text-sm self-center ${
                            process.cpu > 50 ? 'text-orange-400' : 'text-slate-300'
                        }`}>
                            {process.cpu?.toFixed(1)}%
                        </span>
                        <span className={`col-span-2 text-right text-sm self-center ${
                            process.memory > 500 ? 'text-purple-400' : 'text-slate-300'
                        }`}>
                            {process.memory} MB
                        </span>
                        <div className="col-span-2 flex items-center justify-end gap-2">
                            <span className={`w-2 h-2 rounded-full ${getStatusColor(process.status)}`} />
                            <span className="text-slate-400 text-xs capitalize hidden sm:inline">
                                {process.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
