import { useState } from 'react'
import {
  Terminal, Server, Package, CheckCircle, Copy, ChevronRight,
  AlertCircle, Settings, RefreshCw, Database, Shield, Book
} from 'lucide-react'

interface Section {
  id: string
  title: string
  icon: React.ReactNode
}

const SECTIONS: Section[] = [
  { id: 'quickstart', title: '快速开始', icon: <Terminal className="w-4 h-4" /> },
  { id: 'requirements', title: '环境要求', icon: <CheckCircle className="w-4 h-4" /> },
  { id: 'docker', title: 'Docker 部署', icon: <Package className="w-4 h-4" /> },
  { id: 'config', title: '配置说明', icon: <Settings className="w-4 h-4" /> },
  { id: 'database', title: '数据库设置', icon: <Database className="w-4 h-4" /> },
  { id: 'ssl', title: 'SSL 证书', icon: <Shield className="w-4 h-4" /> },
  { id: 'upgrade', title: '升级与备份', icon: <RefreshCw className="w-4 h-4" /> },
  { id: 'troubleshoot', title: '故障排查', icon: <AlertCircle className="w-4 h-4" /> },
]

function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="relative group my-4">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg">
        <span className="text-xs text-gray-400">{lang}</span>
        <button onClick={copy} className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors">
          {copied ? <><CheckCircle className="w-3.5 h-3.5 text-green-400" /><span className="text-green-400">已复制</span></> : <><Copy className="w-3.5 h-3.5" />复制</>}
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto text-sm leading-relaxed">{code}</pre>
    </div>
  )
}

function Alert({ type, children }: { type: 'info' | 'warning' | 'tip'; children: React.ReactNode }) {
  const cfg = {
    info:    { bg: 'bg-blue-50 border-blue-200',   icon: <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" /> },
    warning: { bg: 'bg-yellow-50 border-yellow-200', icon: <AlertCircle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" /> },
    tip:     { bg: 'bg-green-50 border-green-200',  icon: <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> },
  }[type]
  return (
    <div className={`flex gap-3 p-4 rounded-lg border ${cfg.bg} my-4 text-sm`}>
      {cfg.icon}
      <div>{children}</div>
    </div>
  )
}

const CONTENT: Record<string, React.ReactNode> = {
  quickstart: (
    <div>
      <p className="text-gray-600 mb-6">使用一键脚本在 5 分钟内完成 HamR 的私有部署。</p>
      <h3 className="font-semibold text-gray-900 mb-2">一键安装</h3>
      <CodeBlock code={`# 下载并运行安装脚本
curl -fsSL https://deploy.hamr.top/install.sh | bash

# 或者手动下载后执行
curl -O https://deploy.hamr.top/install.sh
chmod +x install.sh
./install.sh`} />
      <Alert type="tip">安装脚本会自动检测系统环境，安装 Docker、生成配置文件并启动所有服务。</Alert>
      <h3 className="font-semibold text-gray-900 mb-2 mt-6">安装后访问</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead><tr className="bg-gray-50"><th className="text-left p-3 border border-gray-200">服务</th><th className="text-left p-3 border border-gray-200">默认地址</th></tr></thead>
          <tbody>
            {[
              ['管家应用', 'http://localhost:3000'],
              ['账号中心', 'http://localhost:3001'],
              ['API 网关', 'http://localhost:8090'],
              ['管理面板', 'http://localhost:3001/admin'],
            ].map(([s, u]) => (
              <tr key={s}><td className="p-3 border border-gray-200">{s}</td><td className="p-3 border border-gray-200 font-mono text-xs">{u}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),

  requirements: (
    <div>
      <p className="text-gray-600 mb-6">部署 HamR 的最低和推荐配置。</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          { label: '最低配置', items: ['CPU：2 核', '内存：2 GB', '磁盘：20 GB', '系统：Ubuntu 20.04+'] },
          { label: '推荐配置', items: ['CPU：4 核', '内存：8 GB', '磁盘：100 GB SSD', '系统：Ubuntu 22.04 LTS'] },
        ].map(cfg => (
          <div key={cfg.label} className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3">{cfg.label}</h3>
            <ul className="space-y-1.5">
              {cfg.items.map(item => <li key={item} className="flex items-center gap-2 text-sm text-gray-600"><ChevronRight className="w-3 h-3 text-gray-400" />{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">软件依赖</h3>
      <CodeBlock code={`# 检查 Docker 版本（需要 20.10+）
docker --version

# 检查 Docker Compose 版本（需要 2.0+）
docker compose version

# 如未安装，执行自动安装
curl -fsSL https://get.docker.com | bash
sudo usermod -aG docker $USER`} />
    </div>
  ),

  docker: (
    <div>
      <p className="text-gray-600 mb-6">使用 Docker Compose 进行完整的容器化部署。</p>
      <h3 className="font-semibold text-gray-900 mb-2">1. 克隆配置</h3>
      <CodeBlock code={`git clone https://github.com/hamr-org/hamr-infra.git
cd hamr-infra/services/proxy`} />
      <h3 className="font-semibold text-gray-900 mb-2 mt-6">2. 配置环境变量</h3>
      <CodeBlock code={`cp .env.example .env
# 编辑 .env，设置数据库密码和 JWT 密钥
nano .env`} />
      <h3 className="font-semibold text-gray-900 mb-2 mt-6">3. 启动服务</h3>
      <CodeBlock code={`# 启动所有服务
docker compose up -d

# 查看服务状态
docker compose ps

# 查看日志
docker compose logs -f`} />
      <Alert type="info">首次启动会自动拉取镜像并运行数据库迁移，约需 3-5 分钟。</Alert>
      <h3 className="font-semibold text-gray-900 mb-2 mt-6">管理命令</h3>
      <CodeBlock code={`# 停止服务
docker compose down

# 重启单个服务
docker compose restart hamr-app-api

# 更新到最新版本
docker compose pull && docker compose up -d`} />
    </div>
  ),

  config: (
    <div>
      <p className="text-gray-600 mb-6">完整的环境变量配置说明。</p>
      <div className="space-y-6">
        {[
          {
            title: '数据库配置',
            vars: [
              ['POSTGRES_USER', 'hamr', '数据库用户名'],
              ['POSTGRES_PASSWORD', '必填', '数据库密码（建议 32 位随机字符串）'],
              ['POSTGRES_DB', 'hamr', '主数据库名称'],
            ],
          },
          {
            title: '安全配置',
            vars: [
              ['JWT_SECRET', '必填', 'JWT 签名密钥（建议 64 位随机字符串）'],
              ['JWT_EXPIRES_IN', '3600', 'Access Token 有效期（秒）'],
              ['REFRESH_TOKEN_EXPIRES_IN', '2592000', 'Refresh Token 有效期（秒，默认 30 天）'],
            ],
          },
          {
            title: '应用配置',
            vars: [
              ['RATE_LIMIT_PER_MINUTE', '60', 'API 限流：每 IP 每分钟请求数'],
              ['GRAFANA_ADMIN_USER', 'admin', 'Grafana 管理员用户名'],
              ['GRAFANA_ADMIN_PASSWORD', '必填', 'Grafana 管理员密码'],
            ],
          },
        ].map(group => (
          <div key={group.title}>
            <h3 className="font-semibold text-gray-900 mb-2">{group.title}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="bg-gray-50"><th className="text-left p-3 border border-gray-200">变量名</th><th className="text-left p-3 border border-gray-200">默认值</th><th className="text-left p-3 border border-gray-200">说明</th></tr></thead>
                <tbody>
                  {group.vars.map(([k, v, d]) => (
                    <tr key={k}><td className="p-3 border border-gray-200 font-mono text-xs">{k}</td><td className="p-3 border border-gray-200 font-mono text-xs text-gray-500">{v}</td><td className="p-3 border border-gray-200 text-gray-600">{d}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      <h3 className="font-semibold text-gray-900 mb-2 mt-6">生成强密钥</h3>
      <CodeBlock code={`# 生成 32 位随机密码
openssl rand -base64 32

# 生成 64 位 JWT 密钥
openssl rand -hex 32`} />
    </div>
  ),

  database: (
    <div>
      <p className="text-gray-600 mb-6">HamR 使用 PostgreSQL 作为主数据库，Redis 用于缓存和会话。</p>
      <Alert type="info">数据库迁移在服务启动时自动执行，无需手动操作。</Alert>
      <h3 className="font-semibold text-gray-900 mb-2 mt-4">连接数据库</h3>
      <CodeBlock code={`# 进入 PostgreSQL 容器
docker exec -it hamr-postgres psql -U hamr -d hamr_account

# 查看所有数据库
\\l

# 查看账号中心表结构
\\c hamr_account
\\dt`} />
      <h3 className="font-semibold text-gray-900 mb-2 mt-6">手动备份</h3>
      <CodeBlock code={`# 备份账号数据库
docker exec hamr-postgres pg_dump -U hamr hamr_account > backup_account_$(date +%Y%m%d).sql

# 备份管家应用数据库
docker exec hamr-postgres pg_dump -U hamr hamr_app > backup_app_$(date +%Y%m%d).sql`} />
      <h3 className="font-semibold text-gray-900 mb-2 mt-6">恢复数据库</h3>
      <CodeBlock code={`# 恢复数据库
cat backup_account_20260310.sql | docker exec -i hamr-postgres psql -U hamr hamr_account`} />
    </div>
  ),

  ssl: (
    <div>
      <p className="text-gray-600 mb-6">为 HamR 配置 HTTPS，保护数据传输安全。</p>
      <h3 className="font-semibold text-gray-900 mb-2">Let's Encrypt 自动证书</h3>
      <CodeBlock code={`# 安装 Certbot
apt install certbot python3-certbot-nginx

# 申请通配符证书（需要 DNS 验证）
certbot certonly --manual --preferred-challenges dns \\
  -d "*.hamr.store" -d "hamr.store" \\
  -d "*.hamr.top" -d "hamr.top"

# 证书文件位置
# /etc/letsencrypt/live/hamr.store/fullchain.pem
# /etc/letsencrypt/live/hamr.store/privkey.pem`} />
      <Alert type="warning">通配符证书需要手动添加 DNS TXT 记录，建议使用阿里云 DNS API 自动化续期。</Alert>
      <h3 className="font-semibold text-gray-900 mb-2 mt-6">自动续期</h3>
      <CodeBlock code={`# 添加 crontab 定时任务
crontab -e

# 每天凌晨 2 点检查并续期
0 2 * * * certbot renew --quiet && docker exec nginx-proxy nginx -s reload`} />
    </div>
  ),

  upgrade: (
    <div>
      <p className="text-gray-600 mb-6">安全地升级 HamR 到最新版本。</p>
      <Alert type="warning">升级前请先备份数据库，升级过程中服务会短暂停止（约 1-2 分钟）。</Alert>
      <h3 className="font-semibold text-gray-900 mb-2 mt-4">标准升级流程</h3>
      <CodeBlock code={`cd hamr-infra/services/proxy

# 1. 备份数据
./../../scripts/backup.sh

# 2. 拉取最新镜像
docker compose pull

# 3. 重启服务（数据库迁移自动执行）
docker compose up -d

# 4. 验证服务状态
docker compose ps
curl http://localhost/health`} />
      <h3 className="font-semibold text-gray-900 mb-2 mt-6">回滚到上一版本</h3>
      <CodeBlock code={`# 查看可用版本
docker images | grep hamr

# 回滚到指定版本
docker compose down
# 编辑 docker-compose.yml，将 image 标签改为历史版本
# 例如：hamr-account:v1.2.0
docker compose up -d`} />
      <h3 className="font-semibold text-gray-900 mb-2 mt-6">自动备份配置</h3>
      <CodeBlock code={`# 配置 crontab 每日备份
crontab -e

# 每天凌晨 3 点执行备份，保留 30 天
0 3 * * * /path/to/hamr-infra/scripts/backup.sh >> /var/log/hamr-backup.log 2>&1`} />
    </div>
  ),

  troubleshoot: (
    <div>
      <p className="text-gray-600 mb-6">常见问题的排查和解决方案。</p>
      <div className="space-y-6">
        {[
          {
            q: '服务启动失败，提示端口被占用',
            a: '检查端口占用情况，修改 docker-compose.yml 中的端口映射。',
            code: `# 查看端口占用
ss -tlnp | grep :80
ss -tlnp | grep :443

# 释放端口（找到占用进程的 PID）
kill -9 <PID>`,
          },
          {
            q: '数据库连接失败',
            a: '确认数据库容器正常运行，环境变量配置正确。',
            code: `# 检查数据库容器状态
docker logs hamr-postgres

# 测试数据库连接
docker exec -it hamr-postgres psql -U hamr -c "SELECT 1;"`,
          },
          {
            q: 'API 返回 401 Unauthorized',
            a: '检查 JWT_SECRET 环境变量是否在所有服务中保持一致。',
            code: `# 查看 API 网关环境变量
docker exec hamr-api-gateway env | grep JWT

# 查看账号中心环境变量
docker exec hamr-account-api env | grep JWT`,
          },
          {
            q: '磁盘空间不足',
            a: '清理 Docker 未使用的镜像和容器。',
            code: `# 查看磁盘使用
df -h
docker system df

# 清理未使用资源（不影响运行中的容器）
docker system prune -f

# 清理旧镜像
docker image prune -a -f`,
          },
        ].map(item => (
          <div key={item.q} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-start gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <h3 className="font-semibold text-gray-900 text-sm">{item.q}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2 ml-6">{item.a}</p>
            <CodeBlock code={item.code} />
          </div>
        ))}
      </div>
    </div>
  ),
}

export default function App() {
  const [activeSection, setActiveSection] = useState('quickstart')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <Server className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">HamR 部署指南</h1>
            <p className="text-xs text-gray-500">deploy.hamr.top · 私有部署文档</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <a href="https://docs.hamr.top" className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
              <Book className="w-3.5 h-3.5" />技术文档
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 flex gap-8">
        <nav className="w-52 shrink-0">
          <div className="sticky top-20 space-y-1">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                  activeSection === s.id
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className={activeSection === s.id ? 'text-primary-600' : 'text-gray-400'}>
                  {s.icon}
                </span>
                {s.title}
              </button>
            ))}
          </div>
        </nav>

        <main className="flex-1 min-w-0">
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
              <span className="text-gray-400">{SECTIONS.find(s => s.id === activeSection)?.icon}</span>
              {SECTIONS.find(s => s.id === activeSection)?.title}
            </h2>
            <hr className="border-gray-100 mb-6" />
            {CONTENT[activeSection]}
          </div>
        </main>
      </div>

      <footer className="text-center text-xs text-gray-400 py-8 border-t border-gray-200">
        <p>HamR 部署指南 · <a href="https://hamr.store" className="hover:text-gray-600">hamr.store</a> · <a href="https://github.com/hamr-org" className="hover:text-gray-600">GitHub</a></p>
      </footer>
    </div>
  )
}
