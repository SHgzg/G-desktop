'use client'

import { LayoutProvider, useLayout } from '@/contexts/LayoutContext'
import { NavigationProvider, useNavigation } from '@/contexts/NavigationContext'
import { cn } from '@/lib/utils'
import type { AppLayoutProps, HeaderProps } from '@/types/layout'
import React from 'react'
import { Breadcrumb } from './Breadcrumb'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

// 内部组件：在 LayoutProvider 内部使用 Context
const AppContent: React.FC<{
  children: React.ReactNode
  sidebar?: React.ReactNode
  showBreadcrumb?: boolean
  header?: HeaderProps
  className?: string
}> = ({ children, sidebar, showBreadcrumb = true, header, className }) => {
  const { isMobile, getHeaderHeight, getContentStyles } = useLayout()
  const { breadcrumbs } = useNavigation()

  return (
    <div className={cn('min-h-screen bg-background font-sans', className)}>
      {/* 顶部栏 */}
      <Header
        title={header?.title || 'G Desktop'}
        subtitle={header?.subtitle || '现代化客户端框架'}
        showBreadcrumb={showBreadcrumb}
        showSearch={header?.showSearch ?? true}
        showUserMenu={header?.showUserMenu ?? true}
        onMenuToggle={header?.onMenuToggle}
        size={header?.size}
      />

      {/* 主要内容区域 */}
      <div className="flex h-[calc(100vh-var(--header-height))]">
        {/* 侧边栏 */}
        <div className="hidden md:flex md:flex-col md:w-[--sidebar-width] lg:w-72 bg-card border-r border-border transition-all duration-300 ease-in-out">
          <Sidebar
            navigation={[
              {
                id: 'home',
                label: '仪表板',
                icon: 'Dashboard',
                path: '/dashboard',
              },
              {
                id: 'todo',
                label: '待办事项',
                icon: 'CheckSquare',
                path: '/todo',
                badge: 3,
              },
            ]}
          />
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-hidden">
          {/* 面包屑导航 */}
          {showBreadcrumb && !isMobile && (
            <div className="border-b border-border bg-background/95 backdrop-blur-sm">
              <div className="container mx-auto px-4 py-3">
                <Breadcrumb items={breadcrumbs} showHome={true} />
              </div>
            </div>
          )}

          {/* 主要内容 */}
          <main
            className={cn(
              'container mx-auto px-4 py-6 overflow-y-auto',
              'h-[calc(100vh-var(--header-height))]'
            )}>
            {/* 自定义侧边栏内容（如果需要） */}
            {sidebar && !isMobile && (
              <div className="mb-6">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    自定义侧边栏
                  </h2>
                  <div className="space-y-3">{sidebar}</div>
                </div>
              </div>
            )}

            {/* 页面内容 */}
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  sidebar,
  header,
  showBreadcrumb = true,
  className,
}) => {
  return (
    <LayoutProvider>
      <NavigationProvider>
        <AppContent
          children={children}
          sidebar={sidebar}
          header={header}
          showBreadcrumb={showBreadcrumb}
          className={className}
        />
      </NavigationProvider>
    </LayoutProvider>
  )
}

export default AppLayout
