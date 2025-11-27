'use client'

import React, { createContext, useContext, useCallback, useMemo } from 'react'
import { LayoutDashboard, FolderOpen, CheckSquare, Settings } from 'lucide-react'
import type { NavigationItem, NavigationContextType } from '@/types/layout'
import { LAYOUT_CONSTANTS } from '@/constants/layout'

// Context
const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

// Generate breadcrumbs from navigation path
const generateBreadcrumbs = (
  items: NavigationItem[],
  activeId: string | null
): Array<{ id: string; label: string; path?: string; icon?: any }> => {
  if (!activeId) return []

  const findPath = (
    items: NavigationItem[],
    targetId: string,
    path: string[] = []
  ): Array<{ id: string; label: string; path?: string; icon?: any }> | null => {
    for (const item of items) {
      if (item.id === targetId) {
        return [...path, { id: item.id, label: item.label, icon: item.icon, path: item.path }]
      }
      if (item.children) {
        const result = findPath(item.children, targetId, [...path, { id: item.id, label: item.label, icon: item.icon, path: item.path }])
        if (result) return result
      }
    }
    return null
  }

  return findPath(items, activeId) || []
}

// Filter navigation items based on search query
const filterNavigationItems = (
  items: NavigationItem[],
  query: string
): NavigationItem[] => {
  if (!query.trim()) return items

  const lowercaseQuery = query.toLowerCase()

  return items.filter(item => {
    // Check item label
    if (item.label.toLowerCase().includes(lowercaseQuery)) {
      return true
    }

    // Check children if they exist
    if (item.children && item.children.length > 0) {
      const filteredChildren = filterNavigationItems(item.children, query)
      if (filteredChildren.length > 0) {
        return true
      }
    }

    return false
  })
}

// Provider component
export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state is managed by LayoutContext
  // This context provides additional navigation utilities

  const items = useMemo(() => LAYOUT_CONSTANTS.NAVIGATION.ROOT_ITEMS, [])

  const contextValue: NavigationContextType = {
    items,
    generateBreadcrumbs,
    filterNavigationItems
  }

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  )
}

// Hook
export const useNavigation = () => {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}