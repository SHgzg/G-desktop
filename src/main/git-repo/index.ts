import { simpleGit } from 'simple-git';

class GitManager {
  repos: Map<
    string,
    { git: ReturnType<typeof simpleGit>; localPath: string; remoteUrl: string }
  >
  constructor() {
    this.repos = new Map()
  }

  // 添加仓库配置
  addRepo(
    name,
    localPath,
    remoteUrl,
    credentials = { username: 'SHgzg', email: '1754737900@qq.com' }
  ) {
    const git = simpleGit(localPath)

    // 如果有独立认证，设置配置
    if (credentials) {
      git.addConfig('user.name', credentials.username)
      git.addConfig('user.email', credentials.email)
    }

    this.repos.set(name, { git, localPath, remoteUrl })
  }

  // 克隆仓库（带认证）
  async cloneRepo(name, username, password) {
    const repo = this.repos.get(name)
    if (!repo) throw new Error(`Repository ${name} not configured`)

    // 构建带认证的 URL
    const authUrl = repo.remoteUrl.replace(
      'https://',
      `https://${username}:${password}@`
    )

    await repo.git.clone(authUrl, repo.localPath)
  }

  // 批量拉取所有仓库
  async pullAll() {
    for (const [name, repo] of this.repos) {
      try {
        console.log(`Pulling ${name}...`)
        await repo.git.pull()
        console.log(`${name} updated successfully`)
      } catch (error) {
        console.error(`Failed to pull ${name}:`, error.message)
      }
    }
  }
}

// 使用示例
export const manager = new GitManager()
