import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import {
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  Activity,
  Server
} from 'lucide-react'

import Layout from './components/layout/layout.jsx'
import StatCard from './components/dashboard/StatCard'
import CPUGauge from './components/dashboard/CPUGauge'
import MemoryChart from './components/dashboard/MemoryChart'
import DiskUsage from './components/dashboard/DiskUsage'
import NetworkStats from './components/dashboard/NetworkStats'
import ProcessList from './components/dashboard/ProcessList'
import SystemInfo from './components/dashboard/SystemInfo'
import CPUMonitor from './pages/CPUMonitor'

function Dashboard() {
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [cpuData, setCpuData] = useState({ percentage: 0, cores: [] })
  const [memoryData, setMemoryData] = useState({ used: 0, total: 16, unit: 'GB' })
  const [diskData, setDiskData] = useState([])
  const [networkData, setNetworkData] = useState({ download: 0, upload: 0 })
  const [processData, setProcessData] = useState([])
  const [systemInfo, setSystemInfo] = useState({
    os: '',
    processor: '',
    ram: '',
    uptime: ''
  })

  const fetchSystemData = async () => {
    try {
      setCpuData({
        percentage: 45,
        cores: [62, 38, 55, 41, 73, 29, 45, 50]
      })
      setMemoryData({ used: 10.4, total: 16, unit: 'GB' })
      setDiskData([
        { name: 'System (C:)', type: 'NVMe SSD', used: 234, total: 512 },
        { name: 'Data (D:)', type: 'HDD', used: 890, total: 2000 }
      ])
      setNetworkData({ download: 12.5, upload: 3.2 })
      setSystemInfo({
        os: 'Windows 11 Pro',
        processor: 'Intel Core i7-12700K',
        ram: '16 GB DDR5',
        uptime: '3d 14h 23m'
      })
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchProcessData = async () => {
    setProcessData([
      { pid: 1234, name: 'Chrome', user: 'admin', cpu: 12.5, memory: 1024, status: 'running' },
      { pid: 5678, name: 'VSCode', user: 'admin', cpu: 8.3, memory: 512, status: 'running' },
      { pid: 9012, name: 'Node.js', user: 'system', cpu: 3.1, memory: 256, status: 'running' },
      { pid: 3456, name: 'Docker', user: 'admin', cpu: 15.7, memory: 890, status: 'running' }
    ])
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchSystemData()
      fetchProcessData()
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">System Dashboard</h1>
            <p className="text-slate-400 text-sm">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <StatCard title="CPU Usage" icon={Cpu} color="cyan">
            <CPUGauge percentage={cpuData.percentage} cores={cpuData.cores} />
          </StatCard>
          <StatCard
            title="Memory Usage"
            value={memoryData.used.toFixed(1)}
            unit={`/ ${memoryData.total} ${memoryData.unit}`}
            icon={MemoryStick}
            color="purple"
          >
            <MemoryChart used={memoryData.used} total={memoryData.total} unit={memoryData.unit} />
          </StatCard>
          <StatCard title="Network Activity" icon={Network} color="orange">
            <NetworkStats download={networkData.download} upload={networkData.upload} />
          </StatCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <StatCard title="Storage" icon={HardDrive} color="emerald">
            <DiskUsage disks={diskData} />
          </StatCard>
          <StatCard title="System Information" icon={Server} color="cyan">
            <SystemInfo info={systemInfo} />
          </StatCard>
        </div>
        <div className="mt-6 bg-slate-900/60 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-pink-400" />
            <h2 className="text-xl font-bold text-white">Running Processes</h2>
          </div>
          <ProcessList processes={processData} />
        </div>
      </div>
    </Layout>
  )
}

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/cpu" element={<CPUMonitor />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
