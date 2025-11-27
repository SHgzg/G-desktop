import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { TodoStats as TodoStatsType } from '@/types/todo'
import { Trash2, CheckCircle2, Circle } from 'lucide-react'

interface TodoStatsProps {
  stats: TodoStatsType
  onClearCompleted: () => void
}

export function TodoStats({ stats, onClearCompleted }: TodoStatsProps) {
  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

  return (
    <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-blue-600">
            <Circle className="h-5 w-5" />
            {stats.total}
          </div>
          <div className="text-sm text-muted-foreground">总计</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            {stats.completed}
          </div>
          <div className="text-sm text-muted-foreground">已完成</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-orange-600">
            <Circle className="h-5 w-5" />
            {stats.pending}
          </div>
          <div className="text-sm text-muted-foreground">待完成</div>
        </div>
      </div>

      {stats.total > 0 && (
        <div className="space-y-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              完成进度: {completionRate}%
            </span>
            {stats.completed > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearCompleted}
                className="text-destructive border-destructive/30 hover:bg-destructive/10">
                <Trash2 className="h-3 w-3 mr-1" />
                清除已完成
              </Button>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}
