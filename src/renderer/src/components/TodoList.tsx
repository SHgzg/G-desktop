import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { TodoItem } from '@/components/TodoItem'
import { TodoStats } from '@/components/TodoStats'
import { useTodos } from '@/hooks/useTodos'
import { Plus, ListTodo } from 'lucide-react'

export function TodoList() {
  const [newTodoText, setNewTodoText] = useState('')
  const { todos, addTodo, toggleTodo, updateTodo, deleteTodo, clearCompleted, stats } = useTodos()

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      addTodo(newTodoText)
      setNewTodoText('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  const sortedTodos = [...todos].sort((a, b) => {
    // 未完成的放在前面，已完成的放在后面
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    // 同样状态的按创建时间倒序
    return b.createdAt.getTime() - a.createdAt.getTime()
  })

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <ListTodo className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-foreground">待办清单</h1>
        </div>
        <p className="text-muted-foreground">管理您的日常任务，提高工作效率</p>
      </div>

      {/* Add Todo Form */}
      <Card className="p-6">
        <div className="space-y-4">
          <Label htmlFor="new-todo" className="text-base font-medium">
            添加新任务
          </Label>
          <div className="flex gap-2">
            <Input
              id="new-todo"
              type="text"
              placeholder="输入待办事项..."
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button onClick={handleAddTodo} disabled={!newTodoText.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              添加
            </Button>
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <TodoStats stats={stats} onClearCompleted={clearCompleted} />

      {/* Todo List */}
      {todos.length > 0 ? (
        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              任务列表 ({stats.pending} 待完成, {stats.completed} 已完成)
            </h2>
            <Separator />
            <div className="space-y-3">
              {sortedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
              ))}
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <ListTodo className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground mb-1">暂无待办事项</h3>
              <p className="text-muted-foreground">添加您的第一个任务来开始管理待办事项</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
