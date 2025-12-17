'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BasicPageTemplate } from '@/templates/BasicPageTemplate'
import {
  TrendingUp,
  Users,
  Eye,
  Monitor,
  Smartphone,
  Tablet,
  Activity,
  Clock,
  Download,
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'

// 模拟分析数据
const analyticsData = {
  overview: {
    totalUsers: 2548,
    userGrowth: 15.2,
    pageViews: 254800,
    conversionRate: 3.2,
    bounceRate: 35.5,
    avgSessionTime: 185
  },
  deviceBreakdown: {
    desktop: 45,
    mobile: 40,
    tablet: 15
  },
  topPages: [
    { path: '/dashboard', views: 45200, growth: 12.5 },
    { path: '/projects', views: 32100, growth: 8.3 },
    { path: '/analytics', views: 28700, growth: -5.2 },
    { path: '/settings', views: 19800, growth: 15.7 }
  ],
  performance: {
    avgLoadTime: 2.3,
    optimizedLoadTime: 1.8,
    lighthouseScore: 92
  },
  realtime: {
    currentOnline: 2456,
    peakOnline: 5123,
    avgOnline: 456
  }
}

const periodOptions = [
  { value: '7d', label: '最近7天' },
  { value: '30d', label: '最近30天' },
  { value: '90d', label: '最近90天' },
  { value: '1y', label: '最近1年' }
]

export default function AnalyticsPage(): JSX.Element {
  const [period, setPeriod] = useState('30d')

  return (
    <BasicPageTemplate
      title="数据分析"
      subtitle="用户行为分析和数据统计"
      description="查看页面访问数据、用户转化漏斗、性能指标等"
      actions={
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {periodOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            导出报告
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            配置
          </Button>
        </div>
      }
    >
      {/* 关键指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总用户数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{analyticsData.overview.userGrowth}%</span> 较上期
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">页面浏览量</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.pageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              周期内的总页面访问量
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">转化率</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              用户行动转化率
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">跳出率</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.bounceRate}%</div>
            <p className="text-xs text-muted-foreground">
              单页访问离开率
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* 设备分布 */}
        <Card>
          <CardHeader>
            <CardTitle>设备分布</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(analyticsData.deviceBreakdown).map(([device, percentage]) => {
                const deviceConfig = {
                  desktop: { icon: Monitor, label: '桌面端', color: 'bg-blue-600' },
                  mobile: { icon: Smartphone, label: '移动端', color: 'bg-green-600' },
                  tablet: { icon: Tablet, label: '平板', color: 'bg-purple-600' }
                }

                const config = deviceConfig[device as keyof typeof deviceConfig]
                const Icon = config.icon

                return (
                  <div key={device} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{config.label}</span>
                      </div>
                      <Badge variant="outline">{percentage}%</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={cn("h-2 rounded-full transition-all duration-300", config.color)}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* 页面性能 */}
        <Card>
          <CardHeader>
            <CardTitle>页面性能</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">平均加载时间</span>
                  <span className="text-sm">{analyticsData.performance.avgLoadTime}s</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(analyticsData.performance.avgLoadTime / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">优化后加载时间</span>
                  <span className="text-sm text-green-600">{analyticsData.performance.optimizedLoadTime}s</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(analyticsData.performance.optimizedLoadTime / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Lighthouse 评分</span>
                  <Badge variant={analyticsData.performance.lighthouseScore >= 90 ? 'default' : 'secondary'}>
                    {analyticsData.performance.lighthouseScore}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 实时数据 */}
        <Card>
          <CardHeader>
            <CardTitle>实时数据</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">当前在线</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-lg font-bold">{analyticsData.realtime.currentOnline.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">峰值在线</span>
                  <span className="text-sm">{analyticsData.realtime.peakOnline.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(analyticsData.realtime.peakOnline / analyticsData.realtime.currentOnline) * 50}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">平均在线</span>
                  <span className="text-sm">{analyticsData.realtime.avgOnline.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(analyticsData.realtime.avgOnline / analyticsData.realtime.currentOnline) * 50}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>数据每30秒更新</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 热门页面 */}
      <Card>
        <CardHeader>
          <CardTitle>热门页面</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.topPages.map((page, index) => (
              <div key={page.path} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{page.path}</div>
                    <div className="text-sm text-muted-foreground">
                      {page.views.toLocaleString()} 次浏览
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={page.growth > 0 ? 'default' : 'secondary'}
                    className={page.growth > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                  >
                    {page.growth > 0 ? '+' : ''}{page.growth}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 操作区域 */}
      <div className="mt-8 flex gap-4">
        <Button>
          <Activity className="h-4 w-4 mr-2" />
          用户行为分析
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          生成完整报告
        </Button>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          分析配置
        </Button>
      </div>
    </BasicPageTemplate>
  )
}