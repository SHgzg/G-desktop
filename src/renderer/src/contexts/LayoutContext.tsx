'use client'

import type {
  BreadcrumbItem,
  LayoutContextType,
  LayoutState,
  ScreenSize,
} from '@/types/layout';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

// Layout action types
type LayoutAction =
  | { type: 'SET_SCREEN_SIZE'; payload: ScreenSize }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR_WIDTH'; payload: number }
  | { type: 'SET_ACTIVE_ITEM'; payload: string | null }
  | { type: 'SET_BREADCRUMBS'; payload: BreadcrumbItem[] }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'TOGGLE_THEME' }

// Initial state
const initialLayoutState: LayoutState = {
  screenSize: 'desktop',
  sidebarCollapsed: false,
  sidebarWidth: 280,
  headerHeight: 56,
}

// Reducer
const layoutReducer = (
  state: LayoutState,
  action: LayoutAction
): LayoutState => {
  switch (action.type) {
    case 'SET_SCREEN_SIZE':
      return { ...state, screenSize: action.payload }
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed }
    case 'SET_SIDEBAR_WIDTH':
      return { ...state, sidebarWidth: action.payload }
    case 'SET_ACTIVE_ITEM':
      return { ...state, activeItem: action.payload }
    case 'SET_BREADCRUMBS':
      return { ...state, breadcrumbs: action.payload }
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload }
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' }
    default:
      return state
  }
}

// Context
const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

// Provider component
export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(layoutReducer, initialLayoutState)

  // Actions
  const setScreenSize = useCallback((screenSize: ScreenSize) => {
    dispatch({ type: 'SET_SCREEN_SIZE', payload: screenSize })
  }, [])

  const toggleSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' })
  }, [])

  const setSidebarWidth = useCallback((width: number) => {
    dispatch({ type: 'SET_SIDEBAR_WIDTH', payload: width })
  }, [])

  const setActiveItem = useCallback((id: string | null) => {
    dispatch({ type: 'SET_ACTIVE_ITEM', payload: id })
    // TODO: 更新面包屑导航
    updateBreadcrumbs(id)
  }, [])

  const setBreadcrumbs = useCallback((items: BreadcrumbItem[]) => {
    dispatch({ type: 'SET_BREADCRUMBS', payload: items })
  }, [])

  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query })
  }, [])

  const toggleTheme = useCallback(() => {
    dispatch({ type: 'TOGGLE_THEME' })
  }, [])

  // Get header height based on size
  const getHeaderHeight = useCallback((size: 'small' | 'medium' | 'large' = 'medium') => {
    switch (size) {
      case 'small':
        return 48
      case 'medium':
        return 56
      case 'large':
        return 64
      default:
        return 56
    }
  }, [])

  // Get content styles based on sidebar state
  const getContentStyles = useCallback(
    (sidebarCollapsed: boolean, sidebarWidth?: number) => {
      const width = sidebarWidth || (sidebarCollapsed ? 64 : 280)
      return {
        marginLeft: state.screenSize === 'desktop' ? `${width}px` : '0',
        transition: 'margin-left 300ms ease-in-out'
      }
    },
    [state.screenSize]
  )

  // Get icon size based on screen size
  const getIconSize = useCallback(() => {
    switch (state.screenSize) {
      case 'mobile':
        return 16
      case 'tablet':
        return 18
      case 'desktop':
        return 20
      default:
        return 18
    }
  }, [state.screenSize])

  // Update breadcrumbs when active item changes
  const updateBreadcrumbs = useCallback(
    (itemId: string | null) => {
      // TODO: 根据导航树生成面包屑
      if (itemId) {
        // 这里可以根据实际的导航结构来生成面包屑
        const crumbs: BreadcrumbItem[] = [
          { id: 'home', label: '首页', path: '/' },
          // TODO: 动态生成面包屑路径
        ]
        setBreadcrumbs(crumbs)
      } else {
        setBreadcrumbs([])
      }
    },
    [setBreadcrumbs]
  )

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      let screenSize: ScreenSize

      if (width < 768) {
        screenSize = 'mobile'
      } else if (width < 1024) {
        screenSize = 'tablet'
      } else {
        screenSize = 'desktop'
      }

      setScreenSize(screenSize)

      // Auto-collapse sidebar on mobile
      if (width < 768 && !state.sidebarCollapsed) {
        toggleSidebar()
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Initial check

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [setScreenSize, state.sidebarCollapsed, toggleSidebar])

  const value: LayoutContextType = {
    ...state,
    items: [], // Navigation items will be set by NavigationProvider
    activeItem: state.activeItem || null,
    breadcrumbs: state.breadcrumbs,
    searchQuery: state.searchQuery || '',
    setActiveItem,
    setBreadcrumbs,
    setSearchQuery,
    sidebarCollapsed: state.sidebarCollapsed,
    toggleSidebar,
    setSidebarWidth,
    screenSize: state.screenSize,
    theme: state.theme || 'light',
    toggleTheme,
    getHeaderHeight,
    getContentStyles,
    getIconSize,
    isMobile: state.screenSize === 'mobile',
    isTablet: state.screenSize === 'tablet',
    isDesktop: state.screenSize === 'desktop',
  }

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}

// Hook
export const useLayout = () => {
  const context = useContext(LayoutContext)
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return context
}

// Media query hook for responsive design
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    media.addEventListener('change', listener)
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}
