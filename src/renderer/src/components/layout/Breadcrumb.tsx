'use client'

import React from 'react'
import { ChevronRight, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { BreadcrumbProps, BreadcrumbItem } from '@/types/layout'
import { useLayout } from '@/contexts/LayoutContext'

const BreadcrumbItem: React.FC<{
  item: BreadcrumbItem
  isLast: boolean
  showHome?: boolean
  onNavigate?: (path?: string) => void
}> = ({ item, isLast, showHome = false, onNavigate }) => {
  const Icon = item.icon
  const handleClick = () => {
    if (onNavigate) {
      onNavigate(item.path)
    }
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleClick}
        className="h-6 px-2 py-1 text-xs"
      >
        {showHome && item.id === 'home' ? (
          <Home className="h-4 w-4" />
        ) : (
          Icon && <Icon className="h-4 w-4" />
        )}
        <span className="truncate max-w-24">{item.label}</span>
      </Button>
      {!isLast && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
    </div>
  )
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator,
  showHome = true,
  className
}) => {
  const { getIconSize } = useLayout()

  if (!items || items.length === 0) {
    return null
  }

  return (
    <nav
      aria-label="面包屑导航"
      className={cn('flex items-center space-x-1 text-sm', className)}
    >
      {showHome && (
        <BreadcrumbItem
          item={{ id: 'home', label: '首页', icon: Home }}
          isLast={items.length === 0}
          showHome
        />
      )}

      {items.map((item, index) => (
        <BreadcrumbItem
          key={item.id}
          item={item}
          isLast={index === items.length - 1}
          showHome={false}
          onNavigate={(path) => {
            // TODO: 集成路由导航
            console.log('Navigate to:', path)
          }}
        />
      ))}

      {separator && (
        <div className="flex items-center">
          {separator}
        </div>
      )}
    </nav>
  )
}