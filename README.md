# HamR 部署指南站 (deploy.hamr.top)

> HamR 私有部署支持中心 - Docker/Kubernetes 一键部署

[![Status](https://img.shields.io/badge/status-开发中-yellow)](https://github.com/hamr-hub/hamr-deploy)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Framework](https://img.shields.io/badge/framework-Vite+React-61dafb)](https://vitejs.dev)

## 📋 项目概述

**项目编号**: PROJ-009  
**域名**: deploy.hamr.top  
**优先级**: ⭐⭐ 中  
**状态**: 待开发

HamR 部署指南站提供完整的私有部署方案、一键安装脚本、运维指导和故障排查文档。

## 🎯 核心内容

### 1. 部署方案
- **Docker Compose**: 快速部署（适合个人/小团队）
- **Kubernetes**: 生产部署（适合企业）
- **Helm Chart**: K8s 包管理

### 2. 部署脚本
- 一键安装脚本（自动检测环境）
- 交互式配置引导
- 自动环境检测与依赖安装

### 3. 运维指导
- 数据备份与恢复
- 版本升级与回滚
- 故障排查指南

### 4. 配置文档
- **数据库配置**: PostgreSQL/MongoDB/Redis
- **应用配置**: JWT/SMTP/Storage
- **网络配置**: 域名/SSL/代理

### 5. 域名与 SSL
- Let's Encrypt 自动申请
- 自签名证书生成
- 商业证书配置

### 6. 辅助工具
- `backup.sh` - 数据备份
- `restore.sh` - 数据恢复
- `upgrade.sh` - 版本升级
- `healthcheck.sh` - 健康检查

## 🛠️ 技术栈

| 技术 | 用途 | 备注 |
|-----|------|------|
| **Vite** | 构建工具 | 文档站 |
| **React 18** | 前端框架 | TypeScript |
| **Tailwind CSS** | 样式框架 | 响应式 |
| **Docker** | 容器化 | 部署方案 |
| **Kubernetes** | 编排平台 | 生产环境 |
| **Helm** | 包管理 | K8s Chart |
| **Vercel** | 托管 | 文档站 |

## 🚀 快速部署

### Docker Compose (推荐新手)

```bash
# 下载安装脚本
curl -fsSL https://deploy.hamr.top/install.sh | bash

# 或手动部署
git clone https://github.com/hamr-hub/hamr-deploy.git
cd hamr-deploy
./scripts/install.sh
```

安装脚本会：
1. 检测系统环境（OS/Docker/网络）
2. 生成配置文件（.env）
3. 拉取 Docker 镜像
4. 启动所有服务
5. 配置域名和 SSL

### Kubernetes (推荐企业)

```bash
# 添加 Helm 仓库
helm repo add hamr https://charts.hamr.top
helm repo update

# 安装 HamR
helm install hamr hamr/hamr \
  --set domain=hamr.example.com \
  --set postgresql.enabled=true \
  --set redis.enabled=true
```

## 📦 项目结构

```
hamr-deploy/
├── docs/                     # 文档站源码
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Docker.tsx
│   │   │   ├── Kubernetes.tsx
│   │   │   ├── Troubleshooting.tsx
│   │   │   └── Configuration.tsx
│   │   └── App.tsx
│   └── package.json
├── docker/                   # Docker 部署
│   ├── docker-compose.yml
│   ├── .env.example
│   └── nginx.conf
├── kubernetes/               # K8s 部署
│   ├── charts/               # Helm Charts
│   ├── manifests/            # YAML 清单
│   └── kustomize/            # Kustomize 配置
├── scripts/                  # 辅助脚本
│   ├── install.sh            # 一键安装
│   ├── backup.sh             # 数据备份
│   ├── restore.sh            # 数据恢复
│   ├── upgrade.sh            # 版本升级
│   └── healthcheck.sh        # 健康检查
└── README.md
```

## ⚙️ 环境变量

### 数据库配置
```env
# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=hamr
POSTGRES_USER=hamr
POSTGRES_PASSWORD=your-password

# MongoDB
MONGO_URI=mongodb://localhost:27017/hamr

# Redis
REDIS_URL=redis://localhost:6379
```

### 应用配置
```env
# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m

# SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@hamr.store
SMTP_PASSWORD=your-password

# Storage
S3_BUCKET=hamr-files
S3_REGION=us-east-1
S3_ACCESS_KEY=your-access-key
S3_SECRET_KEY=your-secret-key
```

### 域名配置
```env
# 主域名
MAIN_DOMAIN=hamr.store
DEV_DOMAIN=hamr.top

# 子域名
ACCOUNT_URL=account.hamr.store
APP_URL=app.hamr.store
API_URL=api.hamr.top
```

## 🔧 常用命令

### Docker Compose

```bash
# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 备份数据
./scripts/backup.sh

# 恢复数据
./scripts/restore.sh backup-2026-03-05.tar.gz

# 升级版本
./scripts/upgrade.sh v1.1.0
```

### Kubernetes

```bash
# 查看 Pod 状态
kubectl get pods -n hamr

# 查看日志
kubectl logs -f deployment/hamr-app -n hamr

# 重启服务
kubectl rollout restart deployment/hamr-app -n hamr

# 扩容
kubectl scale deployment/hamr-app --replicas=3 -n hamr

# 升级版本
helm upgrade hamr hamr/hamr --version 1.1.0
```

## 🩺 健康检查

```bash
# 运行健康检查脚本
./scripts/healthcheck.sh

# 检查项目：
# ✓ Docker 运行状态
# ✓ PostgreSQL 连接
# ✓ MongoDB 连接
# ✓ Redis 连接
# ✓ 服务端口监听
# ✓ SSL 证书有效期
```

## 📊 里程碑

- [ ] **2026-04-15**: Docker 方案
- [ ] **2026-04-30**: K8s 方案
- [ ] **2026-05-05**: 故障排查
- [ ] **2026-05-10**: 测试上线

## 🔗 相关链接

- [技术文档](https://docs.hamr.top) - API 参考
- [开发者门户](https://hamr.top) - 技术社区
- [服务监控](https://status.hamr.top) - 状态页面

## 📄 许可证

MIT License

---

**最后更新**: 2026-03-05  
**部署环境**: https://deploy.hamr.top (即将上线)
