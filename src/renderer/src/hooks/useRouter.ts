'use client'

import React, { useState, useEffect } from 'react'

interface Route {
  path: string
  component: React.ComponentType<any>
  exact?: boolean
}

interface RouterState {
  currentPath: string
  routes: Route[]
}

const ROUTES: Route[] = [
  {
    path: '/dashboard',
    component: () => React.createElement('div', null, 'Dashboard'),
    exact: true
  },
  {
    path: '/todo',
    component: () => React.createElement('div', null, 'TodoList'),
    exact: true
  },
  {
    path: '/projects',
    component: () => React.createElement('div', null, 'Projects'),
    exact: true
  },
  {
    path: '/versions',
    component: () => React.createElement('div', null, 'Versions'),
    exact: true
  },
  {
    path: '/settings',
    component: () => React.createElement('div', null, 'Settings'),
    exact: true
  }
]

export const useRouter = () => {
  const [state, setState] = useState<RouterState>({
    currentPath: typeof window !== 'undefined' ? window.location.pathname : '/dashboard',
    routes: ROUTES
  })

  // 路由导航函数
  const push = (path: string) => {
    window.history.pushState({}, '', path)
    setState(prev => ({ ...prev, currentPath: path }))
  }

  const replace = (path: string) => {
    window.history.replaceState({}, '', path)
    setState(prev => ({ ...prev, currentPath: path }))
  }

  // 监听路由变化
  useEffect(() => {
    const handleRouteChange = () => {
      const currentPath = window.location.pathname
      setState(prev => ({ ...prev, currentPath }))
    }

    window.addEventListener('popstate', handleRouteChange)

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  return {
    ...state,
    push,
    replace
  }
}