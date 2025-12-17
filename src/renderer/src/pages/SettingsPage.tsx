'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BasicPageTemplate } from '@/templates/BasicPageTemplate'
import { cn } from '@/lib/utils'
import { Settings, Palette, Bell, Users, Shield, Cog } from 'lucide-react'

export default function SettingsPage(): JSX.Element {
  return (
    <BasicPageTemplate
      title="系统设置"
      subtitle="配置应用程序和用户偏好"
      description="管理应用程序配置、主题、通知设置、用户权限等"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 外观设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              外观设置
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>主题模式</span>
                <select className="w-32 p-2 border border-input rounded-md bg-background">
                  <option>浅色主题</option>
                  <option>深色主题</option>
                  <option>跟随系统</option>
                  <option>自动</option>
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
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              通知设置
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>系统通知</span>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span>通知频率</span>
                <select className="w-32 p-2 border border-input rounded-md bg-background">
                  <option>实时通知</option>
                  <option>定时推送</option>
                  <option>重要事件</option>
                  <option>每日汇总</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span>邮件通知</span>
                <select className="w-32 p-2 border border-input rounded-md bg-background">
                  <option>全部通知</option>
                  <option>仅重要</option>
                  <option>关闭</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 账户管理 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              用户管理
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                添加用户
              </Button>
              <Button variant="outline" className="w-full justify-start">
                权限配置
              </Button>
              <Button variant="outline" className="w-full justify-start">
                用户列表
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 高级设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cog className="h-5 w-5" />
              高级设置
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>开发者模式</span>
                <select className="w-32 p-2 border border-input rounded-md bg-background">
                  <option>开发模式</option>
                  <option>生产模式</option>
                  <option>调试模式</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span>API调试</span>
                <select className="w-32 p-2 border border-input rounded-md bg-background">
                  <option>开启</option>
                  <option>关闭</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span>日志级别</span>
                <select className="w-32 p-2 border border-input rounded-md bg-background">
                  <option>错误</option>
                  <option>警告</option>
                  <option>调试</option>
                  <option>详细</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 安全设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              安全设置
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>双因素认证</span>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>自动锁屏</span>
                </label>
              </div>
              <Button variant="outline" className="w-full justify-start">
                修改密码
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 系统信息 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              系统信息
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">应用版本</span>
                <Badge variant="secondary">1.0.0</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">构建版本</span>
                <Badge variant="outline">2024.11.28</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Electron版本</span>
                <Badge variant="outline">v28.0.0</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">系统平台</span>
                <Badge variant="outline">Windows</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 操作按钮 */}
      <div className="mt-8 flex gap-4">
        <Button>
          保存设置
        </Button>
        <Button variant="outline">
          重置默认
        </Button>
        <Button variant="outline">
          导出配置
        </Button>
        <Button variant="outline">
          导入配置
        </Button>
      </div>
    </BasicPageTemplate>
  )
}