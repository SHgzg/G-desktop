# G-desktop 路由系统配置

## 🚀 路由设计原则

### 1. 统一管理

所有路由配置集中在 `APP_ROUTES` 常量中，便于管理和维护。

### 2. 自动面包屑

基于当前路径自动生成面包屑导航，无需手动维护。

### 3. 嵌套路由支持

支持嵌套路由结构，适用于复杂应用的页面组织。

### 4. 路由守卫

支持路由权限控制、登录验证等功能。

```typescript
// routes/index.ts
export interface RouteConfig {
  path: string
  title: string
  icon?: React.ComponentType
  component: string
  description?: string
  protected?: boolean
  roles?: string[]
  children?: RouteConfig[]
}

export const ROUTE_CONFIG: RouteConfig[] = [
  {
    path: '/dashboard',
    title: '仪表板',
    icon: 'LayoutDashboard',
    description: '系统概览和数据统计',
    component: 'DashboardPage'
  },
  {
    path: '/admin',
    title: '系统管理',
    icon: 'Settings',
    description: '管理员专用功能',
    protected: true,
    roles: ['admin']
  },
  {
    path: '/settings',
    title: '系统设置',
    icon: 'Settings',
    description: '用户配置和偏好设置',
    component: 'SettingsPage'
  }
]
```

### 5. 路由状态管理

```typescript
// hooks/useRouter.ts
export const useRouter = () => {
  const { currentPath, push, replace } = useRouter()

  const isActiveRoute = (path: string) => {
    return currentPath === path
  }

  const navigate = (path: string) => {
    if (isActiveRoute('/admin')) {
      // 检查权限或重定向
      return replace('/login')
    }
    return push(path)
  }
}
```

### 6. 懒加载

```typescript
// components/LoadingSpinner.tsx
export const LazyRoute: React.FC<{
  children: React.ReactNode
  fallback?: React.ReactNode
}> = ({ children, fallback }) => {
  return (
    <RouterContext.Consumer>
      {({ isLoading }) => (
        isLoading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
          </div>
        ) : (
          children
        )}
      )}
    </RouterContext.Consumer>
  )
}
```

---

_文档版本: 1.0.0_
_创建时间: 2025-11-27_