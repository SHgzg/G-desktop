# G-desktop 页面模板配置

## 📄 页面模板定义

### 1. 页面组件模板

```typescript
// templates/BasicPageTemplate.tsx
export interface BasicPageProps {
  title?: string
  subtitle?: string
  className?: string
  description?: string
  actions?: React.ReactNode
}

export const BasicPageTemplate: React.FC<BasicPageProps> = ({
  title,
  subtitle,
  className,
  description,
  actions
}) => {
  return (
    <div className={cn('container mx-auto p-6 space-y-6', className)}>
      {/* 页面标题区 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
          {subtitle && (
            <p className="text-lg text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex gap-4">
            {actions}
          </div>
        )}
      </div>

      {/* 页面描述 */}
      {description && (
        <div className="mb-6 p-4 bg-card rounded-lg border">
          <p className="text-muted-foreground">{description}</p>
        </div>
      )}

      {/* 页面内容 */}
      <div>
        {children}
      </div>
    </div>
  )
}
```

### 2. 页面类型模板

```typescript
// templates/DashboardPageTemplate.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BasicPageTemplate } from './BasicPageTemplate'

export const DashboardPageTemplate: React.FC = () => {
  return (
    <BasicPageTemplate
      title="仪表板"
      subtitle="系统概览和数据统计"
      className="space-y-6"
      description="查看和管理系统数据、用户活动、项目进度等"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 数据概览卡片 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5" />
              <span>总览</span>
            </CardTitle>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-primary">128</div>
                <div className="text-sm text-muted-foreground">总任务</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-green-600">96</div>
                <div className="text-sm text-muted-foreground">已完成</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 项目进度卡片 */}
        <Card>
          <CardHeader>
            <CardTitle>项目进度</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">G Desktop</span>
                <Badge variant="default">75%</Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2" />
              <div className="flex justify-between mt-2">
                <span className="font-medium">移动应用</span>
                <Badge variant="secondary">60%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Web平台</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Web平台</span>
                <Badge variant="default">90%</Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2" />
              <div className="flex justify-between mt-2">
                <span className="font-medium">进度</span>
                <Badge variant="secondary">已完成</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 最近活动时间线 */}
        <Card>
          <CardHeader>
            <CardTitle>最近活动</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 这里可以集成实际的recent activities */}
              <div className="flex items-start gap-3 pb-4 border-b last:border-b-0">
                <div className="min-w-0">
                  <div className={cn(
                    'w-2 h-2 rounded-full',
                    'bg-green-600'
                  )}>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">项目架构设计</p>
                  <p className="text-sm text-muted-foreground">2小时前</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

### 3. 表单页面模板

```typescript
// templates/SettingsPageTemplate.tsx
import { BasicPageTemplate } from './BasicPageTemplate'

export const SettingsPageTemplate: React.FC = () => {
  return (
    <BasicPageTemplate
      title="系统设置"
      subtitle="配置应用程序和用户偏好"
      className="space-y-6"
      description="管理应用程序配置、主题、通知设置等"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 外观设置 */}
        <Card>
          <CardHeader>
            <CardTitle>外观设置</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>主题模式</span>
                <select className="w-32 p-2 border border-input rounded-md">
                  <option>浅色主题</option>
                  <option>深色主题</option>
                  <option>跟随系统</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span>主色调</span>
                <input type="color" className="w-32 p-2 border border-input rounded-md" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 通知设置 */}
        <Card>
          <CardHeader>
            <CardTitle>通知设置</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>系统通知</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>邮件通知</span>
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

### 4. 使用指南

#### 4.1 创建新页面

```bash
# 使用模板创建新页面
npx create-page --name=UserManagement --template=BasicPage

# 命加到路由配置
export const newRoute = {
  path: '/user-management',
  title: '用户管理',
  icon: 'Users',
  component: 'UserManagementPage',
  description: '管理用户账户和权限'
}
```

#### 4.2 页面组件开发

基于模板快速开发页面：

```typescript
// pages/UserManagementPage.tsx
import { DashboardPageTemplate } from '@/templates/DashboardPageTemplate'

export default function UserManagementPage(): JSX.Element {
  return (
    <DashboardPageTemplate
      title="用户管理"
      subtitle="管理用户账户和权限"
    description="添加、编辑、删除用户账户，管理用户角色和权限"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 用户列表 */}
          <div className="md:col-span-2 lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>用户列表</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-2">用户</th>
                      <th className="text-left p-2">角色</th>
                      <th className="text-left p-2">状态</th>
                      <th className="text-left p-2">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border-b">张三</td>
                      <td className="p-2 border-b">管理员</td>
                      <td className="p-2 border-b">活跃</td>
                      <td className="p-2 border-b">
                        <button className="text-blue-600 hover:text-blue-800">编辑</button>
                        <button className="text-red-600 hover:text-red-800">删除</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>

          {/* 添加用户表单 */}
          <Card>
            <CardHeader>
              <CardTitle>添加用户</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="用户名"
                  className="w-full p-2 border border-input rounded-md"
                />
                <input
                  type="email"
                  placeholder="邮箱"
                  className="w-full p-2 border border-input rounded-md"
                />
                <select className="w-full p-2 border border-input rounded-md">
                  <option value="user">普通用户</option>
                  <option value="admin">管理员</option>
                </select>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
```

---

_文档版本: 1.0.0_
_创建时间: 2025-11-27_