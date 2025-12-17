'use client'

import { cn } from '@/lib/utils'
import type { BasicPageProps } from '@/types/app'
import React from 'react'

export const BasicPageTemplate: React.FC<BasicPageProps> = ({
  title,
  subtitle,
  className,
  description,
  actions,
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
        {actions && <div className="flex gap-4">{actions}</div>}
      </div>

      {/* 页面描述 */}
      {description && (
        <div className="mb-6 p-4 bg-card rounded-lg border">
          <p className="text-muted-foreground">{description}</p>
        </div>
      )}

      {/* 页面内容 */}
      <div>children</div>
    </div>
  )
}

export default BasicPageTemplate
