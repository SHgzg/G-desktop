# VSCode 开发环境配置指南

本项目已配置完整的VSCode开发环境，支持自动格式化和代码检查。

## 🎯 核心功能

### ✅ 自动格式化 (Prettier)
- **保存时自动格式化**：编辑任何文件保存时自动应用Prettier格式化
- **支持文件类型**：TypeScript, JavaScript, React, JSON, YAML, Markdown, CSS, SCSS
- **配置文件**：`.prettierrc.yaml`

### ✅ 代码检查 (ESLint)
- **实时错误检查**：编辑时显示ESLint错误和警告
- **自动修复**：保存时自动修复可修复的ESLint问题
- **配置文件**：`eslint.config.mjs`

### ✅ TypeScript支持
- **智能提示**：完整的TypeScript类型检查
- **导入路径别名**：支持 `@/` 和 `@renderer/` 别名
- **配置文件**：`tsconfig.web.json`

## 🛠️ 推荐扩展

已配置以下推荐扩展：

### 核心工具
- **Prettier - Code formatter** (`esbenp.prettier-vscode`)
- **ESLint** (`dbaeumer.vscode-eslint`)

### 框架支持
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
- **TypeScript Importer** (`formulahendry.auto-rename-tag`)

### 语言支持
- **TypeScript Vue Plugin** (`ms-vscode.vscode-typescript-next`)
- **Path IntelliSense** (`christian-kohler.path-intellisense`)
- **JSON** (`ms-vscode.vscode-json`)
- **YAML** (`redhat.vscode-yaml`)
- **Markdown All in One** (`yzhang.markdown-all-in-one`)
- **HTML CSS Support** (`ms-vscode.vscode-html-css-support`)

## ⚙️ 配置详解

### 保存时格式化
```json
{
  "editor.formatOnSave": true,
  "editor.formatOnType": false,
  "editor.formatOnPaste": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  }
}
```

### 文件类型特定配置
```json
{
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
}
```

## 🎨 Prettier配置

当前`.prettierrc.yaml`配置：

```yaml
singleQuote: true          # 使用单引号
semi: false              # 不使用分号
printWidth: 80           # 每行最大80字符
trailingComma: es5      # ES5兼容的尾逗号
tabWidth: 2             # Tab宽度为2个空格
useTabs: false           # 使用空格而非Tab
endOfLine: lf            # LF换行符
bracketSpacing: true      # 对象括号内空格
arrowParens: avoid       # 箭头函数括号
bracketSameLine: true     # 同行括号
```

## 🚀 使用方法

### 1. 自动格式化
- **保存文件**：Ctrl+S (Windows/Linux) / Cmd+S (Mac)
- **格式化选定内容**：Shift+Alt+F
- **格式化整个文档**：Ctrl+Shift+I 然后选择格式化

### 2. ESLint修复
- **修复当前行**：点击灯泡图标或使用快捷键
- **修复所有问题**：Ctrl+Shift+P → "ESLint: Fix all auto-fixable problems"

### 3. TypeScript功能
- **导入重命名**：F2 (重命名符号)
- **导入整理**：Ctrl+Shift+O (转到符号)
- **类型检查**：实时显示类型错误

## 🔧 故障排除

### 格式化不工作
1. 确认已安装Prettier扩展
2. 检查`.prettierrc.yaml`语法
3. 重启VSCode
4. 运行命令：`npm run format`

### ESLint不工作
1. 确认已安装ESLint扩展
2. 检查`eslint.config.mjs`配置
3. 运行命令：`npm run lint`

### TypeScript错误
1. 检查`tsconfig.web.json`路径配置
2. 运行类型检查：`npm run typecheck`
3. 重启TypeScript服务：Ctrl+Shift+P → "TypeScript: Restart TS server"

## 📝 开发工作流

### 推荐流程
1. **开发前**：运行`npm run dev`启动开发服务器
2. **编码中**：VSCode自动进行格式化和错误检查
3. **提交前**：运行`npm run format && npm run lint && npm run typecheck`
4. **构建前**：运行`npm run build`验证构建

### 快捷键大全
| 功能 | Windows/Linux | Mac |
|------|-------------|-----|
| 保存 | Ctrl+S | Cmd+S |
| 格式化文档 | Shift+Alt+F | Shift+Option+F |
| 重命名符号 | F2 | F2 |
| 转到文件 | Ctrl+P | Cmd+P |
| 转到符号 | Ctrl+Shift+O | Cmd+Shift+O |
| 错误列表 | Ctrl+Shift+M | Cmd+Shift+M |

---

**配置更新时间**：2025-11-27
**适用版本**：VSCode 1.85+
**维护状态**：✅ 活跃维护