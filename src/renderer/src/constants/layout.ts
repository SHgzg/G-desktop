import { NavigationItem } from '@/types/layout'
import { LayoutDashboard, FolderOpen, CheckSquare, Settings } from 'lucide-react'
import React from 'react'

export const LAYOUT_CONSTANTS = {
  // 断点定义
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1024
  },

  // 侧边栏配置
  SIDEBAR: {
    WIDTH: {
      EXPANDED: 280,
      COLLAPSED: 64,
      MIN: 200,
      MAX: 400
    },
    COLLAPSED_KEY: 'sidebar-collapsed',
    TRANSITION_DURATION: 300,
    OVERLAY_Z_INDEX: 50
  },

  // 顶部栏配置
  HEADER: {
    HEIGHT: {
      SMALL: 48,
      MEDIUM: 56,
      LARGE: 64
    },
    MIN_HEIGHT: 48
  },

  // 动画时间
  ANIMATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500
  },

  // 导航菜单结构
  NAVIGATION: {
    ROOT_ITEMS: [
      {
        id: 'dashboard',
        label: '仪表板',
        icon: LayoutDashboard,
        path: '/dashboard',
        badge: '3'
      },
      {
        id: 'projects',
        label: '项目',
        icon: FolderOpen,
        children: [
          {
            id: 'active',
            label: '进行中',
            path: '/projects/active',
            badge: 12
          },
          {
            id: 'completed',
            label: '已完成',
            path: '/projects/completed',
            badge: 48
          },
          {
            id: 'archived',
            label: '已归档',
            path: '/projects/archived'
          }
        ]
      },
      {
        id: 'tasks',
        label: '任务管理',
        icon: CheckSquare,
        children: [
          {
            id: 'my-tasks',
            label: '我的任务',
            path: '/tasks',
            badge: '7'
          },
          {
            id: 'team-tasks',
            label: '团队任务',
            path: '/tasks/team',
            badge: '23'
          },
          {
            id: 'assigned',
            label: '分配给我',
            path: '/tasks/assigned',
            badge: '15'
          }
        ]
      },
      {
        id: 'separator1',
        label: '',
        separator: true
      },
      {
        id: 'analytics',
        label: '数据分析',
        icon: FolderOpen,
        children: [
          {
            id: 'overview',
            label: '概览',
            path: '/analytics/overview'
          },
          {
            id: 'reports',
            label: '报表',
            path: '/analytics/reports'
          },
          {
            id: 'insights',
            label: '洞察',
            path: '/analytics/insights'
          }
        ]
      },
      {
        id: 'tools',
        label: '工具',
        icon: FolderOpen,
        children: [
          {
            id: 'calendar',
            label: '日历',
            path: '/tools/calendar'
          },
          {
            id: 'notes',
            label: '笔记',
            path: '/tools/notes'
          },
          {
            id: 'bookmarks',
            label: '收藏夹',
            path: '/tools/bookmarks'
          }
        ]
      },
      {
        id: 'separator2',
        label: '',
        separator: true
      },
      {
        id: 'settings',
        label: '设置',
        icon: Settings,
        children: [
          {
            id: 'profile',
            label: '个人资料',
            path: '/settings/profile'
          },
          {
            id: 'preferences',
            label: '偏好设置',
            path: '/settings/preferences'
          },
          {
            id: 'system',
            label: '系统设置',
            path: '/settings/system'
          },
          {
            id: 'help',
            label: '帮助中心',
            path: '/settings/help'
          }
        ]
      }
    ] as NavigationItem[]
  },

  // 响应式类名
  RESPONSIVE: {
    HIDDEN_MOBILE: 'hidden md:block',
    VISIBLE_MOBILE: 'block md:hidden',
    COLLAPSED_MOBILE: 'md:hidden',
    EXPANDED_MOBILE: 'md:flex'
  },

  // 间距和大小
  SPACING: {
    XS: 'space-x-1',
    SM: 'space-x-2',
    MD: 'space-x-4',
    LG: 'space-x-6'
  },

  // 主题色彩
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark',
    STORAGE_KEY: 'app-theme'
  }
} as const

// 默认导航展开状态
export const DEFAULT_SIDEBAR_STATE = {
  [LAYOUT_CONSTANTS.NAVIGATION.ROOT_ITEMS[0].id!]: true, // dashboard
  [LAYOUT_CONSTANTS.NAVIGATION.ROOT_ITEMS[1].id!]: false, // projects
  [LAYOUT_CONSTANTS.NAVIGATION.ROOT_ITEMS[2].id!]: true,  // tasks
  [LAYOUT_CONSTANTS.NAVIGATION.ROOT_ITEMS[4].id!]: false, // tools
  [LAYOUT_CONSTANTS.NAVIGATION.ROOT_ITEMS[6].id!]: false  // settings
} as const