'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useNavigation } from '@/contexts/NavigationContext'
import { useLayout } from '@/contexts/LayoutContext'
import { cn } from '@/lib/utils'
import type { HeaderProps } from '@/types/layout'
import { Bell, Menu, Search, Settings, User } from 'lucide-react'
import React, { useCallback, useState } from 'react'

export const Header: React.FC<HeaderProps> = ({
  title = 'G Desktop',
  subtitle = '现代化客户端框架',
  showBreadcrumb = true,
  showSearch = true,
  showUserMenu = true,
  onMenuToggle,
  size = 'medium',
  className,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const { theme, toggleTheme } = useLayout()
  const { getHeaderHeight, getContentStyles } = useLayout()
  const { navigationItems } = useNavigation()

  // 计算通知数量
  const notificationCount = 12
  const hasNotifications = notificationCount > 0

  // 处理搜索
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    // TODO: 集成全局搜索功能
    console.log('Search query:', query)
  }, [])

  // 切换主题
  const handleThemeToggle = useCallback(() => {
    toggleTheme()
  }, [toggleTheme])

  // 处理菜单切换
  const handleMenuToggle = useCallback(() => {
    onMenuToggle?.()
  }, [onMenuToggle])

  // 用户菜单项
  const userMenuItems = [
    {
      id: 'profile',
      label: '个人资料',
      icon: User,
      onClick: () => {
        console.log('Navigate to profile')
        setShowProfileMenu(false)
      },
    },
    {
      id: 'settings',
      label: '偏好设置',
      icon: Settings,
      onClick: () => {
        console.log('Navigate to settings')
        setShowProfileMenu(false)
      },
    },
  ]

  const headerHeight = getHeaderHeight(size)

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full bg-background/95 backdrop-blur-sm border-b border-border',
        'h-[--header-height] transition-all duration-300 ease-in-out',
        className
      )}
      style={{ '--header-height': `${headerHeight}px` } as React.CSSProperties}>
      <div className="container mx-auto px-4 h-full">
        <div
          className={cn(
            'flex items-center justify-between h-full',
            getContentStyles(false, 280) // 假设侧边栏宽度280px
          )}>
          {/* 左侧：汉堡菜单（移动端） */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMenuToggle}
              className="lg:hidden">
              <Menu className="h-4 w-4" />
            </Button>

            {/* Logo 和标题 */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">G</span>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{title}</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  {subtitle}
                </p>
              </div>
            </div>

            {/* 中间：搜索和导航 */}
            <div className="flex items-center gap-4 flex-1 min-w-0 md:min-w-64">
              {/* 搜索框 */}
              {showSearch && (
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="搜索应用..."
                    value={searchQuery}
                    onChange={e => handleSearch(e.target.value)}
                    className={cn(
                      'pl-10 pr-10 h-9 w-48 md:w-64 bg-background border border-input rounded-md',
                      'text-sm placeholder:text-muted-foreground',
                      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                    )}
                  />
                </div>
              )}

              {/* 通知 */}
              {hasNotifications && (
                <div className="relative hidden sm:block">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative">
                    <Bell className="h-4 w-4" />
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center p-0 text-xs">
                      {notificationCount > 99 ? '99+' : notificationCount}
                    </Badge>
                  </Button>
                </div>
              )}

              {/* 主题切换 */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleThemeToggle}
                className="hidden sm:block">
                <div className="relative">
                  {theme === 'light' ? (
                    // Sun icon for light mode
                    <div className="h-4 w-4">☀️</div>
                  ) : (
                    // Moon icon for dark mode
                    <div className="h-4 w-4">🌙</div>
                  )}
                </div>
              </Button>
            </div>

            {/* 右侧：用户菜单 */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:block text-sm">管理员</span>
                </Button>

                {/* 用户菜单下拉 */}
                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-popover rounded-md shadow-lg z-50">
                    <div className="p-1 space-y-1">
                      {userMenuItems.map(item => (
                        <button
                          key={item.id}
                          onClick={item.onClick}
                          className="w-full flex items-center gap-3 p-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm">
                          {item.icon && (
                            <item.icon className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 移动端通知 */}
              <div className="sm:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}>
                  <Bell className="h-4 w-4" />
                  {hasNotifications && (
                    <Badge
                      variant="destructive"
                      className="ml-1 min-w-[16px] h-[16px] flex items-center justify-center p-0 text-xs">
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 通知面板 */}
        {showNotifications && (
          <div className="absolute right-4 top-full mt-2 w-80 bg-popover border border-popover rounded-md shadow-lg z-50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold text-foreground">通知</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(false)}>
                ×
              </Button>
            </div>
            <div className="space-y-2">
              <div className="p-3 border rounded-lg bg-card">
                <p className="text-sm text-muted-foreground">
                  <strong>系统更新</strong>
                  <span className="block text-xs mt-1">v2.4.1 现已可用</span>
                </p>
              </div>
              <div className="p-3 border rounded-lg bg-card">
                <p className="text-sm text-muted-foreground">
                  <strong>新消息</strong>
                  <span className="block text-xs mt-1">您有3条未读消息</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
