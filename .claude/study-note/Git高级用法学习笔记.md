# Git高级用法学习笔记

## 概述
Git 是分布式版本控制系统，掌握高级用法可以大幅提升开发效率。本笔记基于实际项目操作经验，涵盖Git的进阶技巧和最佳实践。

## 核心概念

### Git 三个工作区域
- **工作目录(Working Directory)**: 实际文件的所在地
- **暂存区(Staging Area)**: 存放即将提交的更改
- **Git仓库(.git)**: 永久保存数据的地方

### 分支类型
- **主分支(main/master)**: 正式发布分支
- **开发分支(develop)**: 开发集成分支
- **功能分支(feature/*)**: 新功能开发
- **修复分支(hotfix/*)**: 紧急修复
- **临时分支**: 如我们之前使用的 `temp-branch`

## 关键知识点

### 1. 提交操作与回滚

#### 撤回所有提交到工作区（我们实际使用的方案）
```bash
# 方法1: Orphan Branch 方法（推荐用于初始提交回滚）
git checkout --orphan temp-branch
git add -A
git reset  # 取消暂存，文件回到工作区
git checkout main
git branch -D temp-branch

# 方法2: Reset 方法（适用于有历史的情况）
git reset --mixed HEAD~2  # 撤回2个提交，保留文件在工作区
git reset --hard HEAD~2   # 撤回2个提交，删除文件更改
git reset --soft HEAD~2   # 撤回2个提交，保留文件在暂存区
```

#### 修改历史commit信息
```bash
# 修改最近的commit信息
git commit --amend -m "新的提交信息"

# 修改多个历史commit（交互式rebase）
git rebase -i HEAD~3
# 然后在编辑器中选择要修改的commit，将pick改为reword或edit

# 修改特定commit的信息
git rebase -i <commit的父提交hash>
```

### 2. 远程仓库管理

#### 为本地项目创建全新远程仓库
```bash
# 1. 在GitHub/GitLab创建空仓库（不要添加README、.gitignore等）

# 2. 在本地项目中添加远程仓库
git remote add origin https://github.com/username/repository-name.git
git remote -v  # 查看远程仓库配置

# 3. 推送到远程仓库
git push -u origin main  # -u 设置upstream，后续可以直接git push

# 如果远程仓库已有内容，需要合并
git pull origin main --allow-unrelated-histories
# 解决冲突后
git push origin main
```

#### 远程仓库操作
```bash
# 查看远程仓库
git remote -v
git remote show origin

# 添加/删除远程仓库
git remote add upstream https://github.com/original/repo.git
git remote remove origin

# 获取远程更新但不合并
git fetch origin

# 拉取并合并远程更新
git pull origin main

# 推送本地分支到远程
git push -u origin feature-branch
```

### 3. 分支管理高级技巧

#### 我们实际使用过的分支操作
```bash
# 创建并切换到新分支
git checkout -b main

# 强制删除分支（有未合并内容时）
git branch -D branch-name

# 删除远程分支
git push origin --delete branch-name

# 合并时处理冲突
git pull origin main --allow-unrelated-histories
# 手动解决冲突文件后
git add .
git commit -m "Merge with conflict resolution"
```

#### 分支对比和差异
```bash
# 比较分支差异
git diff main..feature-branch
git diff main...feature-branch  # 三方差异

# 查看分支包含关系
git log --oneline --graph --decorate --all
git branch -a  # 查看所有分支（包括远程）

# 找出分支的共同祖先
git merge-base main feature-branch
```

### 4. 暂存和 stash 管理

```bash
# 暂存当前工作
git stash save "工作暂存描述"

# 查看暂存列表
git stash list

# 恢复暂存
git stash pop
git stash apply stash@{0}  # 恢复特定暂存

# 删除暂存
git stash drop stash@{0}
git stash clear  # 清空所有暂存

# 创建分支并应用暂存
git stash branch new-branch stash@{0}
```

### 5. 历史记录查询

```bash
# 查看详细历史
git log --oneline --graph --decorate --all
git log --stat  # 显示文件变更统计
git log -p  # 显示具体代码变更

# 查找特定提交
git log --grep="关键词"
git log --author="作者名"
git log --since="2024-01-01"

# 查看文件历史
git log --follow filename
git blame filename  # 查看文件每行的最后修改者
```

## 实践示例

### 示例1: 初始化项目并推送到远程（我们项目的完整流程）
```bash
# 1. 初始化本地项目
git init
git add .
git commit -m "feat: 初始化 Electron 桌面应用程序"

# 2. 在GitHub创建空仓库后
git remote add origin https://github.com/SHgzg/G-desktop.git
git checkout -b main  # 切换到main分支

# 3. 处理冲突（远程有初始提交时）
git pull origin main --allow-unrelated-histories
# 解决冲突后
git add .
git commit -m "Merge remote main with local changes"
git push origin main
```

### 示例2: 完全重置项目状态
```bash
# 当需要完全重新开始时
git checkout --orphan temp-branch
git add -A
git commit -m "全新的开始"
git branch -D main
git branch -m main
git push -f origin main  # 强制推送
```

### 示例3: 修改历史commit（修正提交信息错误）
```bash
# 发现最近3个commit中有信息错误
git rebase -i HEAD~3

# 在编辑器中：
# pick abc123 第一个commit
# reword def456 第二个commit（修改信息）
# edit ghi789 第三个commit（修改内容或信息）

# 保存后Git会依次处理每个commit
```

## 进阶技巧

### 1. Git Hooks 自动化
```bash
# 安装pre-commit hook进行代码检查
echo '#!/bin/sh
npm run lint
npm run test' > .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

### 2. Git 别名提升效率
```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit -m
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
```

### 3. 子模块管理
```bash
# 添加子模块
git submodule add https://github.com/user/repo.git path/to/submodule

# 初始化和更新子模块
git submodule init
git submodule update --init --recursive
```

### 4. 工作树管理
```bash
# 创建多个工作目录
git worktree add ../feature-branch feature-branch
git worktree list
git worktree remove ../feature-branch
```

## 常见问题

### 问题1: 提交后发现忘记添加文件
```bash
# 方案1: 添加到当前commit
git add forgotten-file
git commit --amend

# 方案2: 创建新的commit
git add forgotten-file
git commit -m "fix: 添加遗漏的文件"
```

### 问题2: 推送被拒绝（non-fast-forward）
```bash
# 先拉取远程更新
git pull origin main
# 解决冲突后
git push origin main

# 或者强制推送（谨慎使用）
git push -f origin main
```

### 问题3: 误删分支需要恢复
```bash
# 查找被删除的分支
git reflog

# 恢复分支
git checkout -b recovered-branch <commit-hash>
```

## 总结

### 重点回顾
- **Git三个区域**: 工作区、暂存区、仓库区
- **Orphan Branch**: 处理初始提交回退的最佳方案
- **Rebase vs Merge**: 前者保持线性历史，后者保留分支历史
- **远程仓库管理**: origin、upstream的概念和操作
- **历史修改**: amend、rebase的用法和注意事项

### 学习建议
1. **先掌握基础**: add、commit、push、pull
2. **实践分支管理**: feature分支工作流
3. **学会回滚**: reset、revert、checkout的区别
4. **掌握冲突解决**: merge冲突的处理技巧
5. **了解高级特性**: rebase、stash、worktree等

### 练习推荐
1. 在测试项目中练习所有回滚操作
2. 创建多个分支并练习合并冲突解决
3. 配置Git aliases提升日常效率
4. 学习使用Git GUI工具（SourceTree、GitKraken）

## 参考资料

- [Pro Git 中文版](https://git-scm.com/book/zh/v2)
- [GitHub Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials)
- [Git Interactive Rebase Tool](https://gitrebasetool.herokuapp.com/)

---
*文档创建时间: 2025-11-26*
*基于 G-desktop 项目实际操作经验*
*最后更新时间: 2025-11-26*