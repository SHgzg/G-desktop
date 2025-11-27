import AppLayout from '@/components/layout/AppLayout'
import React from 'react'

function App(): React.JSX.Element {
  return (
    <AppLayout
      sidebar={
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-foreground mb-3">应用菜单</h3>
          <div className="space-y-1">
            <a
              href="/dashboard"
              className="block p-2 hover:bg-accent rounded-md transition-colors">
              仪表板
            </a>
            <a
              href="/projects"
              className="block p-2 hover:bg-accent rounded-md transition-colors">
              项目管理
            </a>
            <a
              href="/analytics"
              className="block p-2 hover:bg-accent rounded-md transition-colors">
              数据分析
            </a>
          </div>
        </div>
      }
      showBreadcrumb={true}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">欢迎使用 G Desktop</h1>
        <p className="text-muted-foreground">这是一个现代化的客户端应用程序框架。</p>
      </div>
    </AppLayout>
  )
}

export default App
