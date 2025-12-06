# Supabase 环境变量配置指南

## 📋 快速开始

### 1. 创建环境变量文件

复制以下内容到项目根目录的 `.env.local` 文件（本地开发）：

```bash
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=PPP Calculator
NEXT_PUBLIC_THEME=default
NEXT_PUBLIC_APPEARANCE=system
NEXT_PUBLIC_DEFAULT_LOCALE=en

# Supabase Database Configuration
DATABASE_URL=postgres://postgres.xvhejrgnzluvkxhzgqqc:chi_3785523@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x
DATABASE_PROVIDER=postgresql
DB_SINGLETON_ENABLED=false

# Supabase API Configuration (Optional - only if using Supabase client features)
NEXT_PUBLIC_SUPABASE_URL=https://xvhejrgnzluvkxhzgqqc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2aGVqcmduemx1dmt4aHpncXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyOTk0OTIsImV4cCI6MjA3OTg3NTQ5Mn0.XceyjXDLqfwp3igRATTUwRMVSaucFQWusB1EN6b2TAk

# Auth Configuration
# Generate a random secret: openssl rand -base64 32
AUTH_SECRET=your-random-secret-replace-this-in-production
AUTH_URL=http://localhost:3000
```

### 2. 生成 AUTH_SECRET

⚠️ **重要**：请生成一个安全的随机密钥

**Windows PowerShell:**
```powershell
# 生成随机密钥
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }) -as [byte[]])
```

**Mac/Linux:**
```bash
openssl rand -base64 32
```

将生成的密钥替换 `.env.local` 文件中的 `AUTH_SECRET` 值。

---

## 🚀 初始化数据库

### 3. 推送数据库 Schema

```bash
# 确保依赖已安装
pnpm install

# 推送 schema 到 Supabase
pnpm db:push
```

### 4. 初始化 RBAC 权限数据

```bash
# 创建默认角色和权限
pnpm rbac:init
```

---

## 📦 Vercel 部署配置

在 Vercel 项目设置中添加以下环境变量：

### 必需变量

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `DATABASE_URL` | `postgres://postgres.xvhejrgnzluvkxhzgqqc:chi_3785523@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x` | Supabase 数据库连接（使用 Connection Pooler） |
| `DATABASE_PROVIDER` | `postgresql` | 数据库类型 |
| `DB_SINGLETON_ENABLED` | `false` | Serverless 环境建议 false |
| `AUTH_SECRET` | `你生成的随机密钥` | 认证加密密钥（⚠️ 生产环境必须使用新密钥） |
| `AUTH_URL` | `https://your-domain.vercel.app` | 生产环境域名 |
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.vercel.app` | 应用 URL |
| `NEXT_PUBLIC_APP_NAME` | `PPP Calculator` | 应用名称 |

### 可选变量

| 变量名 | 说明 |
|--------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL（仅在使用 Supabase 客户端功能时需要） |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名密钥（仅在使用 Supabase 客户端功能时需要） |
| `GOOGLE_CLIENT_ID` | Google OAuth（可在管理后台配置） |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Secret |
| `GITHUB_CLIENT_ID` | GitHub OAuth |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth Secret |
| `STRIPE_SECRET_KEY` | Stripe 支付 |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook |
| `RESEND_API_KEY` | 邮件服务 |

---

## ✅ 验证配置

### 本地测试

```bash
# 启动开发服务器
pnpm dev

# 访问 http://localhost:3000
# 尝试注册/登录功能
```

### 数据库连接测试

```bash
# 打开 Drizzle Studio（可视化数据库管理）
pnpm db:studio
```

---

## 🔒 安全注意事项

1. ✅ **绝对不要**提交 `.env.local` 或 `.env` 文件到 Git
2. ✅ **生产环境**必须使用独立的、安全的 `AUTH_SECRET`
3. ✅ 定期轮换 API 密钥和 Secrets
4. ✅ 在 Supabase 启用 Row Level Security (RLS) 以增强安全性

---

## 📚 相关链接

- [Supabase Dashboard](https://supabase.com/dashboard/project/xvhejrgnzluvkxhzgqqc)
- [Drizzle ORM 文档](https://orm.drizzle.team/)
- [Better Auth 文档](https://www.better-auth.com/)
- [Vercel 环境变量文档](https://vercel.com/docs/projects/environment-variables)

---

## 🆘 常见问题

### Q: 数据库连接失败？
A: 检查 `DATABASE_URL` 是否正确，确保使用 Connection Pooler (端口 6543)

### Q: AUTH_SECRET 错误？
A: 确保生成了 32 字节的 base64 编码密钥

### Q: Vercel 部署后无法访问数据库？
A: 检查 Vercel 环境变量是否正确配置，特别是 `DATABASE_URL` 和 `AUTH_SECRET`

### Q: 如何查看 Supabase 数据库？
A: 
- 方式1: 访问 [Supabase Dashboard - Table Editor](https://supabase.com/dashboard/project/xvhejrgnzluvkxhzgqqc/editor)
- 方式2: 本地运行 `pnpm db:studio`

