import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  Activity,
  Settings,
  Menu,
  X,
  ChevronRight,
  Server
} from 'lucide-react'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'CPU Monitor', icon: Cpu, path: '/cpu' },
    { name: 'Memory', icon: MemoryStick, path: '/memory' },
    { name: 'Storage', icon: HardDrive, path: '/storage' },
    { name: 'Network', icon: Network, path: '/network' },
    { name: 'Processes', icon: Activity, path: '/processes' },
    { name: 'Settings', icon: Settings, path: '/settings' }
  ]

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed lg:static z-50 inset-y-0 left-0 w-64 bg-slate-900 border-r border-white/10
        flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <Server className="w-6 h-6 text-cyan-400" />
          <div className="flex-1">
            <h1 className="font-bold">OS Monitor</h1>
            <p className="text-xs text-slate-400">System Dashboard</p>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors
                ${isActive 
                  ? 'bg-cyan-500/20 text-white' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'}
              `}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : ''}`} />
                  <span>{item.name}</span>
                  {isActive && (
                    <ChevronRight className="ml-auto w-4 h-4 text-cyan-400" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/10">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>
          <span className="font-bold">OS Monitor</span>
          <div className="w-6" />
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}