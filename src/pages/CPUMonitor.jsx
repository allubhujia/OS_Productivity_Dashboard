import { useState, useEffect } from "react"
import Layout from "../components/layout/layout"
import { Cpu } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
  YAxis,
  XAxis,
  LabelList
} from "recharts"

const data = [
  { time: 0, usage: 57, temperature: 52 },
  { time: 1, usage: 37, temperature: 34 },
  { time: 2, usage: 60, temperature: 58 },
  { time: 3, usage: 40, temperature: 38 },
  { time: 4, usage: 75, temperature: 70 },
  { time: 5, usage: 36, temperature: 33 },
  { time: 6, usage: 45, temperature: 43 },
  { time: 7, usage: 53, temperature: 50 }
]

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "running": return "bg-emerald-400"
    case "sleeping": return "bg-yellow-400"
    case "stopped": return "bg-red-400"
    default: return "bg-slate-400"
  }
}

export default function CPUMonitor() {
  const [processData, setProcessData] = useState([])

  const fetchProcessData = () => {
    setProcessData([
      { pid: 1234, name: "Chrome", memory: 1024, status: "running" },
      { pid: 5678, name: "VSCode", memory: 512, status: "running" },
      { pid: 9012, name: "Node.js", memory: 256, status: "running" },
      { pid: 3456, name: "Docker", memory: 890, status: "running" },
      { pid: 7890, name: "Postman", memory: 420, status: "sleeping" },
      { pid: 2468, name: "Spotify", memory: 680, status: "sleeping" },
      { pid: 1357, name: "Discord", memory: 740, status: "stopped" },
      { pid: 8642, name: "MongoDB", memory: 560, status: "running" },
      { pid: 9753, name: "Redis", memory: 310, status: "sleeping" },
      { pid: 1122, name: "IntelliJ IDEA", memory: 980, status: "running" },
      { pid: 3344, name: "Slack", memory: 450, status: "running" },
      { pid: 5566, name: "MySQL", memory: 720, status: "stopped" }
    ])
  }

useEffect(() => {
  const loadProcessData = async () => {
    await fetchProcessData()
  }
  loadProcessData()
}, [])

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <Cpu className="w-8 h-8 text-cyan-400" />
            CPU Monitor
          </h1>
          <p className="text-slate-400 text-sm">
            Dedicated CPU monitoring page
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-10">
            <div className="bg-[#0b1120] p-6 rounded-2xl border border-slate-800 w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-slate-200 font-semibold text-lg">
                  CPU Load (%)
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  Real-time Data
                </span>
              </div>

              <div className="h-16 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <Line type="linear" dataKey="usage" stroke="#22d3ee" strokeWidth={2} dot={false} />
                    <YAxis hide domain={[0, 100]} />
                    <XAxis hide dataKey="time" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-4 gap-4 mt-4">
                {[57, 37, 60, 40, 75, 26, 45, 53].map((value, index) => (
                  <div key={index} className="bg-[#151c2e] p-3 rounded-lg border border-slate-800">
                    <p className="text-slate-500 text-xs mb-1">Core {index + 1}</p>
                    <p className="text-cyan-400 font-bold">{value}%</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0b1120] p-6 rounded-2xl border border-slate-800 w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-slate-200 font-semibold text-lg">
                  CPU Temperature (%)
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  Real-time Data
                </span>
              </div>

              <div className="h-28 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 20 }}>
                    <XAxis hide dataKey="time" />
                    <YAxis hide domain={[0, 100]} />
                    <Bar dataKey="temperature" fill="#fb923c" radius={[4, 4, 0, 0]}>
                      <LabelList dataKey="temperature" position="top" fill="#fb923c" fontSize={11} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-[#0b1120] p-6 rounded-2xl border border-slate-800 w-full">
            <h3 className="text-slate-200 font-semibold text-3xl mb-6">
              Top CPU Intensive Processes
            </h3>

            <div className="grid grid-cols-3 px-4 py-4 text-xs text-slate-500 uppercase tracking-wider">
              <span>Process</span>
              <span className="justify-self-end pr-3">Status</span>
              <span className="text-right">Memory (MB)</span>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-hide px-4">
              {processData.map(process => (
                <div
                  key={process.pid}
                  className="grid grid-cols-3 gap-4 px-5 py-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                >
                  <div className="text-slate-200">
                    {process.name}
                  </div>

                  <div className="flex items-center justify-end gap-2 ml-5">
                    <span className={`w-2 h-2 rounded-full ${getStatusColor(process.status)}`} />
                    <span className="text-slate-400 text-xs capitalize hidden sm:inline">
                      {process.status}
                    </span>
                  </div>

                  <div className="text-right text-slate-400">
                    {process.memory}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
