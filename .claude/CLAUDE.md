# G-desktop 项目 Claude 配置

## 项目信息
- **项目名称**: G-desktop
- **技术栈**: Electron + React + TypeScript
- **构建工具**: electron-vite
- **包管理**: pnpm

## 学习笔记配置

当用户要求生成学习笔记时，请按照以下规则执行：

### 存储位置
- **目录**: `.claude/study-note/`
- **格式**: Markdown (.md)

### 文件命名规范
- 使用描述性的中文或英文名称
- 格式示例: `{主题}-学习笔记.md` 或 `{topic}-study-notes.md`
- 避免使用特殊字符，使用连字符分隔单词

### 内容结构
```markdown
# {主题}学习笔记

## 概述
- 简要介绍学习主题

## 核心概念
- 重要概念解释

## 关键知识点
### 知识点1
- 详细说明
- 示例代码

### 知识点2
- 详细说明
- 示例代码

## 实践示例
- 实际应用案例

## 总结
- 重点回顾
- 学习建议

## 参考资料
- 相关链接和资源
```

### 示例文件位置
- `.claude/study-note/React-Hooks学习笔记.md`
- `.claude/study-note/TypeScript类型系统学习笔记.md`
- `.claude/study-note/Electron架构学习笔记.md`

## 重要提醒
⚠️ **每次生成学习笔记时，请自动保存到指定目录并告知用户文件位置。**

---
*配置更新时间: 2025-11-26*