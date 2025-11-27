'use client'

import React, { useState, useCallback } from 'react'
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useLayout as useLayoutContext } from '@/contexts/LayoutContext'
import { useNavigation } from '@/contexts/NavigationContext'
import { cn } from '@/lib/utils'
import type { NavigationItem, SidebarProps } from '@/types/layout'
import { LAYOUT_CONSTANTS } from '@/constants/layout'
import { Search } from 'lucide-react'

const SidebarItem: React.FC<{
  item: NavigationItem
  level: number
  isActive: boolean
  onItemClick: (id: string) => void
  className?: string
}> = ({ item, level, isActive, onItemClick, className }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  const handleClick = () => {
    if (hasChildren && !isExpanded) {
      setIsExpanded(true)
    } else if (!hasChildren) {
      onItemClick(item.id)
    }
  }

  const handleChildClick = (childId: string) => {
    onItemClick(childId)
  }

  if (item.separator) {
    return <Separator key={item.id} className={cn('my-4')} />
  }

  const Icon = item.icon

  return (
    <div className={cn('w-full', className)}>
      <Button
        variant={isActive ? 'secondary' : 'ghost'}
        size="sm"
        onClick={handleClick}
        className={cn(
          'w-full justify-start h-8 px-3 py-2',
          level === 0 && 'font-semibold',
          isActive && 'bg-secondary text-secondary-foreground'
        )}
      >
        {hasChildren && (
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'transition-transform duration-200',
                isExpanded ? 'rotate-90' : ''
              )}
            >
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        )}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {Icon && (
            <Icon className="h-4 w-4 flex-shrink-0" />
          )}
          <span className="truncate">{item.label}</span>
          {item.badge && (
            <Badge variant="secondary" className="ml-auto">
              {item.badge}
            </Badge>
          )}
        </div>
      </Button>

      {hasChildren && isExpanded && (
        <div className="ml-6 mt-1 space-y-1">
          {item.children!.map((child) => (
            <SidebarItem
              key={child.id}
              item={child}
              level={level + 1}
              isActive={isActive}
              onItemClick={handleChildClick}
              className="ml-2"
            />
          ))}
        </div>
      )}
    </div>
  )
}

const SearchBox: React.FC<{
  value: string
  onChange: (value: string) => void
  onClear: () => void
}> = ({ value, onChange, onClear }) => {
  return (
    <div className="p-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="搜索菜单..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="absolute right-1 top-1/2 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onCollapseChange,
  navigation,
  className
}) => {
  const { searchQuery, setSearchQuery } = useLayoutContext()
  const { filterNavigationItems } = useNavigation()
  const { getIconSize } = useLayoutContext()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // 处理菜单项点击
  const handleItemClick = useCallback((itemId: string) => {
    // 这里可以集成路由导航
    console.log('Navigation to:', itemId)
    // 移动端点击后关闭菜单
    if (window.innerWidth < 768) {
      setIsMobileOpen(false)
    }
  }, [])

  // 过滤导航项
  const filteredNavigation = React.useMemo(() => {
    return filterNavigationItems(navigation, searchQuery)
  }, [navigation, searchQuery])

  // 清除搜索
  const handleClearSearch = useCallback(() => {
    setSearchQuery('')
  }, [setSearchQuery])

  // 切换移动端菜单
  const toggleMobileMenu = useCallback(() => {
    setIsMobileOpen(!isMobileOpen)
  }, [isMobileOpen])

  return (
    <>
      {/* 移动端遮罩 */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 md:hidden',
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* 桌面端侧边栏 */}
      <div
        className={cn(
          'hidden md:flex md:flex-col fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-card border-r transition-all duration-300 ease-in-out',
          collapsed && !isMobileOpen && 'md:w-16',
          'md:border-r-border'
        )}
      >
        {/* 移动端侧边栏 */}
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetContent
            side="left"
            className="w-64 p-0 h-full bg-card border-r"
          >
            <div className="flex flex-col h-full">
              {/* 顶部区域 */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <Menu className="h-6 w-6" />
                  <span className="font-semibold text-foreground">菜单</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileOpen(false)}
                  className="md:hidden"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* 搜索框 */}
              <SearchBox
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={handleClearSearch}
              />

              <Separator />

              {/* 导航菜单 */}
              <div className="flex-1 overflow-y-auto py-2">
                {filteredNavigation.map((item) => (
                  <SidebarItem
                    key={item.id}
                    item={item}
                    level={0}
                    isActive={false} // TODO: 从上下文获取当前激活项
                    onItemClick={handleItemClick}
                  />
                ))}
              </div>

              {/* 底部区域 */}
              <div className="p-4 border-t mt-auto">
                <Button variant="outline" size="sm" className="w-full">
                  设置
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}