/**
 * 布局相关的类型定义
 */

import { LayoutDashboard, FolderOpen, CheckSquare, Settings } from 'lucide-react'

export interface NavigationItem {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  path?: string
  children?: NavigationItem[]
  badge?: string | number
  disabled?: boolean
  separator?: boolean
}

export interface BreadcrumbItem {
  id: string
  label: string
  path?: string
  icon?: React.ComponentType<{ className?: string }>
}

export type ScreenSize = 'mobile' | 'tablet' | 'desktop'

export type SidebarPosition = 'left' | 'right'

export type HeaderSize = 'small' | 'medium' | 'large'

export interface LayoutState {
  screenSize: ScreenSize
  sidebarCollapsed: boolean
  sidebarWidth: number
  headerHeight: number
  activeItem?: string | null
  breadcrumbs?: BreadcrumbItem[]
  searchQuery?: string
  theme?: 'light' | 'dark'
}

export interface NavigationContextType {
  items: NavigationItem[]
  activeItem: string | null
  setActiveItem: (id: string) => void
  breadcrumbs: BreadcrumbItem[]
  setBreadcrumbs: (items: BreadcrumbItem[]) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export interface LayoutContextType extends NavigationContextType {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  setSidebarWidth: (width: number) => void
  screenSize: ScreenSize
  theme: 'light' | 'dark'
  toggleTheme: () => void
  getHeaderHeight: (size?: HeaderSize) => number
  getContentStyles: (sidebarCollapsed: boolean, sidebarWidth?: number) => React.CSSProperties
  getIconSize: () => number
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export interface ResponsiveConfig {
  mobile: number // < 768px
  tablet: number // >= 768px && < 1024px
  desktop: number // >= 1024px
}

export interface AppLayoutProps {
  children: React.ReactNode
  sidebar?: React.ReactNode
  header?: React.ReactNode
  showBreadcrumb?: boolean
  className?: string
}

export interface SidebarProps {
  collapsed?: boolean
  onCollapseChange?: (collapsed: boolean) => void
  navigation: NavigationItem[]
  className?: string
  width?: number
}

export interface HeaderProps {
  title?: string
  subtitle?: string
  showBreadcrumb?: boolean
  showSearch?: boolean
  showUserMenu?: boolean
  onMenuToggle?: () => void
  className?: string
  size?: HeaderSize
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  className?: string
  showHome?: boolean
}

// 常量定义
export const LAYOUT_CONSTANTS = {
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024
  } as const,

  SIDEBAR: {
    WIDTH: {
      EXPANDED: 280,
      COLLAPSED: 64,
      MIN: 200,
      MAX: 400
    },
    COLLAPSED_KEY: 'sidebar-collapsed',
    TRANSITION_DURATION: 300
  } as const,

  HEADER: {
    HEIGHT: {
      SMALL: 48,
      MEDIUM: 56,
      LARGE: 64
    }
  } as const,

  NAVIGATION: {
    ROOT_ITEMS: [
      {
        id: 'dashboard',
        label: '仪表板',
        icon: LayoutDashboard,
        path: '/dashboard'
      },
      {
        id: 'projects',
        label: '项目',
        icon: FolderOpen,
        children: [
          { id: 'active', label: '进行中', path: '/projects/active' },
          { id: 'completed', label: '已完成', path: '/projects/completed' }
        ]
      },
      {
        id: 'tasks',
        label: '任务管理',
        icon: CheckSquare,
        children: [
          { id: 'my-tasks', label: '我的任务', path: '/tasks' },
          { id: 'team-tasks', label: '团队任务', path: '/tasks/team' }
        ]
      },
      {
        id: 'settings',
        label: '设置',
        icon: Settings,
        children: [
          { id: 'profile', label: '个人资料', path: '/settings/profile' },
          { id: 'preferences', label: '偏好设置', path: '/settings/preferences' },
          { id: 'system', label: '系统设置', path: '/settings/system' }
        ]
      }
    ]
  } as const
}