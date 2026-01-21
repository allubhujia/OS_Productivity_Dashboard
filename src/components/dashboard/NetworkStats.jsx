import React from 'react';
import { Download, Upload, Wifi } from 'lucide-react';

export default function NetworkStats({ download = 0, upload = 0}) {
    return (
        <div className="space-y-6">
            {/* Current speeds */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                        <Download className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Download</p>
                        <p className="text-xl font-bold text-white">{download.toFixed(1)} <span className="text-sm text-slate-400">MB/s</span></p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/20">
                        <Upload className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Upload</p>
                        <p className="text-xl font-bold text-white">{upload.toFixed(1)} <span className="text-sm text-slate-400">MB/s</span></p>
                    </div>
                </div>
            </div>

            {/* Connection status */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Wifi className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-400 font-medium">Connected</span>
            </div>
        </div>
    );
}