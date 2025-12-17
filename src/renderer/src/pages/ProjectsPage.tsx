'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { BasicPageTemplate } from '@/templates/BasicPageTemplate'
import {
  FolderOpen,
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  TrendingUp,
  MoreHorizontal
} from 'lucide-react'
import { cn } from '@/lib/utils'

// 模拟项目数据
const mockProjects = [
  {
    id: 1,
    name: 'G Desktop',
    description: '基于 Electron 的桌面应用程序开发',
    status: 'active',
    progress: 75,
    priority: 'high',
    team: ['张三', '李四', '王五'],
    startDate: '2024-01-15',
    dueDate: '2024-12-31',
    tags: ['桌面应用', 'Electron', 'TypeScript']
  },
  {
    id: 2,
    name: '移动应用',
    description: 'React Native 移动端应用开发',
    status: 'active',
    progress: 60,
    priority: 'medium',
    team: ['赵六', '孙七'],
    startDate: '2024-03-01',
    dueDate: '2024-10-30',
    tags: ['移动端', 'React Native', 'iOS', 'Android']
  },
  {
    id: 3,
    name: 'Web平台',
    description: '基于 React 的 Web 平台重构',
    status: 'completed',
    progress: 100,
    priority: 'low',
    team: ['周八', '吴九'],
    startDate: '2023-09-01',
    dueDate: '2024-06-30',
    tags: ['Web', 'React', 'Vite']
  },
  {
    id: 4,
    name: '数据分析',
    description: '大数据分析和可视化平台',
    status: 'planning',
    progress: 15,
    priority: 'high',
    team: ['郑十'],
    startDate: '2024-07-01',
    dueDate: '2025-03-31',
    tags: ['数据分析', '可视化', 'Python']
  }
]

const statusConfig = {
  active: { label: '进行中', variant: 'default' as const },
  completed: { label: '已完成', variant: 'secondary' as const },
  planning: { label: '规划中', variant: 'outline' as const },
  paused: { label: '暂停', variant: 'outline' as const }
}

const priorityConfig = {
  high: { label: '高', color: 'text-red-600 bg-red-100' },
  medium: { label: '中', color: 'text-yellow-600 bg-yellow-100' },
  low: { label: '低', color: 'text-green-600 bg-green-100' }
}

export default function ProjectsPage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')

  // 过滤项目
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <BasicPageTemplate
      title="项目管理"
      subtitle="管理和跟踪所有项目进度"
      description="创建、编辑和监控项目状态，分配任务和资源"
      actions={
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          新建项目
        </Button>
      }
    >
      {/* 搜索和过滤 */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索项目名称或描述..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="all">所有状态</option>
                <option value="active">进行中</option>
                <option value="completed">已完成</option>
                <option value="planning">规划中</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="all">所有优先级</option>
                <option value="high">高优先级</option>
                <option value="medium">中优先级</option>
                <option value="low">低优先级</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 项目统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">总项目</p>
                <p className="text-2xl font-bold">{mockProjects.length}</p>
              </div>
              <FolderOpen className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">进行中</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockProjects.filter(p => p.status === 'active').length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">已完成</p>
                <p className="text-2xl font-bold text-blue-600">
                  {mockProjects.filter(p => p.status === 'completed').length}
                </p>
              </div>
              <FolderOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">团队成员</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(mockProjects.flatMap(p => p.team)).size}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 项目列表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">{project.name}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <Badge variant={statusConfig[project.status as keyof typeof statusConfig].variant}>
                  {statusConfig[project.status as keyof typeof statusConfig].label}
                </Badge>
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  priorityConfig[project.priority as keyof typeof priorityConfig].color
                )}>
                  {priorityConfig[project.priority as keyof typeof priorityConfig].label}优先级
                </span>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {/* 进度条 */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>进度</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      project.status === 'completed' ? "bg-green-600" :
                      project.status === 'active' ? "bg-blue-600" : "bg-gray-400"
                    )}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* 项目信息 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{project.startDate} - {project.dueDate}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{project.team.join(', ')}</span>
                </div>

                {/* 标签 */}
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  查看详情
                </Button>
                <Button size="sm" className="flex-1">
                  编辑项目
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 空状态 */}
      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">未找到匹配的项目</h3>
            <p className="text-muted-foreground mb-4">
              尝试调整搜索条件或创建新项目
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              创建新项目
            </Button>
          </CardContent>
        </Card>
      )}
    </BasicPageTemplate>
  )
}