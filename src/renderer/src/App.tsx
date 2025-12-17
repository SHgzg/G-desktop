import AppLayout from '@/components/layout/AppLayout'
import AnalyticsPage from '@/pages/AnalyticsPage'
import DashboardPage from '@/pages/DashboardPage'
import ProjectsPage from '@/pages/ProjectsPage'
import SettingsPage from '@/pages/SettingsPage'
import React, { useState } from 'react'

// 路由配置
const routes = [
  {
    path: '/',
    component: DashboardPage,
    title: '仪表板',
  },
  {
    path: '/dashboard',
    component: DashboardPage,
    title: '仪表板',
  },
  {
    path: '/projects',
    component: ProjectsPage,
    title: '项目管理',
  },
  {
    path: '/analytics',
    component: AnalyticsPage,
    title: '数据分析',
  },
  {
    path: '/settings',
    component: SettingsPage,
    title: '系统设置',
  },
]

// 导航项配置
const navigationItems = [
  { path: '/dashboard', title: '仪表板', icon: 'LayoutDashboard' },
  { path: '/projects', title: '项目管理', icon: 'FolderOpen' },
  { path: '/analytics', title: '数据分析', icon: 'TrendingUp' },
  { path: '/settings', title: '系统设置', icon: 'Settings' },
]

function App(): React.JSX.Element {
  const [currentPath, setCurrentPath] = useState(() => {
    // 从URL哈希获取当前路径
    return window.location.hash.slice(1) || '/'
  })

  // 根据当前路径获取组件
  const getCurrentComponent = () => {
    const route = routes.find(r => r.path === currentPath) || routes[0]
    return route.component
  }

  // 简单的路由导航函数
  const navigate = (path: string) => {
    setCurrentPath(path)
    window.location.hash = path
  }

  // 监听浏览器前进后退
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || '/'
      setCurrentPath(hash)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const CurrentComponent = getCurrentComponent()
  const currentRoute = routes.find(r => r.path === currentPath) || routes[0]

  return (
    <AppLayout
      sidebar={
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground mb-3 px-2">
              应用菜单
            </h3>
            {navigationItems.map(item => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full text-left p-3 rounded-md transition-colors flex items-center gap-3 ${currentPath === item.path ||
                    (currentPath === '/' && item.path === '/')
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent text-foreground'
                  }`}>
                {/* 这里可以添加图标组件 */}
                <span className="text-sm font-medium">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      }
      showBreadcrumb={true}>
      <div className="min-h-full">
        <CurrentComponent />
      </div>
    </AppLayout>
  )
}

export default App
