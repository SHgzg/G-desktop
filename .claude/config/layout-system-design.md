# G-desktop 布局系统设计文档

## 🎯 布局设计原则

### 1. 原子化设计

基于原子组件构建复杂UI界面，每个组件职责单一且可复用。

**核心原则**：
- **单一职责**: 每个组件只负责一个特定功能
- **可组合性**: 通过组合原子组件构建复杂UI
- **可复用性**: 组件可以在不同上下文中重复使用
- **类型安全**: 完整的TypeScript类型支持

### 2. 布局层次结构

```
App (根组件)
├── AppLayout (主布局容器)
│   ├── Header (顶部栏)
│   ├── Sidebar (侧边栏)
│   │   ├── ViewContainer (侧边栏内容容器)
│   │   │   ├── ViewTitle (视图标题)
│   │   │   ├── ViewItem (视图项)
│   │   │   └── ViewContent (视图内容)
│   └── StatusBar (状态栏)
│       └── WorkspaceGrid (工作区网格)
├── MainContent (主内容区)
│   ├── Breadcrumb (面包屑导航)
│   ├── PageContent (页面内容容器)
│   └── PanelContainer (面板容器)
│       ├── PanelHeader (面板标题)
│       └── PanelBody (面板内容)
└── Overlay (遮罩层)
    └── NotificationsPanel (通知面板)
```

### 3. 组件设计规范

#### 3.1 AppLayout 组件

**职责**：
- 提供统一的布局容器和状态管理
- 协调路由、布局、导航之间的交互
- 处理全局状态（主题、侧边栏等）

**Props 接口**：
```typescript
interface AppLayoutProps {
  children: React.ReactNode
  className?: string
  header?: {
    title?: string
    subtitle?: string
    showBreadcrumb?: boolean
    showSearch?: boolean
    showUserMenu?: boolean
    onMenuToggle?: () => void
  }
  sidebar?: React.ReactNode
  showBreadcrumb?: boolean
}
```

#### 3.2 Header 组件

**职责**：
- 应用顶部栏，包含Logo、标题、搜索、通知、用户菜单
- 提供菜单切换和主题切换功能

**关键特性**：
- 响应式设计（移动端适配）
- 搜索功能集成
- 通知系统
- 主题切换

#### 3.3 Sidebar 组件

**职责**：
- 提供可折叠的导航菜单
- 支持搜索功能
- 集成路由导航

**组件结构**：
```typescript
interface SidebarProps {
  navigation: NavigationItem[]
  collapsed?: boolean
  onCollapseChange?: (collapsed: boolean) => void
  className?: string
}
```

### 4. 状态管理策略

#### 4.1 LayoutContext

**管理内容**：
```typescript
interface LayoutState {
  screenSize: 'mobile' | 'tablet' | 'desktop'
  sidebarCollapsed: boolean
  sidebarWidth: number
  headerHeight: number
  theme: 'light' | 'dark'
  activeItem?: string | null
  breadcrumbs?: BreadcrumbItem[]
}

interface LayoutContextType {
  // 基础状态
  screenSize: ScreenSize
  theme: 'light' | 'dark'
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  setSidebarWidth: (width: number) => void

  // 布局工具函数
  getHeaderHeight: (size?: 'small' | 'medium' | 'large') => number
  getContentStyles: (sidebarCollapsed: boolean, sidebarWidth?: number) => React.CSSProperties
  getIconSize: () => number

  // 导航相关
  activeItem: string | null
  setActiveItem: (id: string) => void
  breadcrumbs: BreadcrumbItem[]
  setBreadcrumbs: (items: BreadcrumbItem[]) => void

  // 主题相关
  toggleTheme: () => void
}
```

#### 4.2 NavigationContext

**职责**：
- 提供导航数据和工具函数
- 管理导航状态和面包屑生成

**接口设计**：
```typescript
interface NavigationContextType {
  items: NavigationItem[]
  activeItem: string | null
  setActiveItem: (id: string) => void
  breadcrumbs: BreadcrumbItem[]
  setBreadcrumbs: (items: BreadcrumbItem[]) => void

  // 工具函数
  generateBreadcrumbs: (path: string, items: NavigationItem[]) => BreadcrumbItem[]
  filterNavigationItems: (items: NavigationItem[], query: string) => NavigationItem[]
}
```

#### 4.3 RouterContext

**职责**：
- 管理应用路由状态
- 提供路由导航功能

**接口设计**：
```typescript
interface RouterContextType {
  currentPath: string
  push: (path: string) => void
  replace: (path: string) => void
  getRouteByPath: (path: string) => Route | null
  getBreadcrumbs: (path: string) => BreadcrumbItem[]
}
```

### 5. 响应式设计原则

#### 5.1 断点配置

```typescript
export const LAYOUT_CONSTANTS = {
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024
    DESKTOP: 1024
  },

  SIDEBAR: {
    WIDTH: {
      EXPANDED: 280,
      COLLAPSED: 64,
      MIN: 200,
      MAX: 400
    },
    COLLAPSED_KEY: 'sidebar-collapsed',
    TRANSITION_DURATION: 300
  },

  HEADER: {
    HEIGHT: {
      SMALL: 48,
      MEDIUM: 56,
      LARGE: 64
    }
  }
}
```

#### 5.2 响应式工具

```typescript
// 使用 Tailwind CSS 断点实现响应式
const responsiveClasses = {
  mobile: 'md:hidden',
  tablet: 'lg:hidden md:block',
  desktop: 'hidden md:block lg:flex'
}

// 使用 CSS 变量
:root {
  --sidebar-width: 280px;
  --header-height: 56px;
}
```

### 6. 性能优化建议

- 避免不必要的重渲染
- 使用 React.memo 优化组件渲染
- 合理使用 useState 和 useCallback
- 懒加载路由组件
- 虚拟化长列表渲染

### 7. 可访问性支持

- 使用 ARIA 属性
- 键盘导航支持
- 高对比度主题
- 屏幕阅读器兼容

---

_文档版本: 1.0.0_
_创建时间: 2025-11-27_