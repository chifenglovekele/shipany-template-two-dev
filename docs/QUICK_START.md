# ⚡ 快速启动指南

## 🎯 5 步开始使用 Supabase

### 前置要求

- ✅ Node.js 18+ ([下载](https://nodejs.org/))
- ✅ pnpm ([安装](https://pnpm.io/installation): `npm install -g pnpm`)
- ✅ Supabase 账号已创建
- ✅ 数据库连接信息已获取

---

## 步骤 1️⃣: 升级 Node.js

**检查当前版本：**
```powershell
node --version
```

**如果版本 < 18，升级 Node.js：**

### 使用 fnm (推荐)
```powershell
fnm install 18
fnm default 18
node --version  # 验证版本
```

### 使用 nvm-windows
```powershell
nvm install 18
nvm use 18
node --version  # 验证版本
```

---

## 步骤 2️⃣: 配置环境变量

在项目根目录创建 `.env.local` 文件：

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=ShipAny App
NEXT_PUBLIC_THEME=default
NEXT_PUBLIC_APPEARANCE=system
NEXT_PUBLIC_DEFAULT_LOCALE=en

# Supabase Database
DATABASE_URL=postgres://postgres.xvhejrgnzluvkxhzgqqc:chi_3785523@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x
DATABASE_PROVIDER=postgresql
DB_SINGLETON_ENABLED=false

# Supabase API (Optional)
NEXT_PUBLIC_SUPABASE_URL=https://xvhejrgnzluvkxhzgqqc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2aGVqcmduemx1dmt4aHpncXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyOTk0OTIsImV4cCI6MjA3OTg3NTQ5Mn0.XceyjXDLqfwp3igRATTUwRMVSaucFQWusB1EN6b2TAk

# Auth Configuration
AUTH_SECRET=REPLACE_THIS_WITH_RANDOM_SECRET
AUTH_URL=http://localhost:3000
```

**生成 AUTH_SECRET (PowerShell):**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }) -as [byte[]])
```

复制生成的密钥，替换 `REPLACE_THIS_WITH_RANDOM_SECRET`

---

## 步骤 3️⃣: 安装依赖

```powershell
pnpm install
```

---

## 步骤 4️⃣: 初始化数据库

```powershell
# 推送数据库 Schema（创建表结构）
pnpm db:push

# 初始化 RBAC 权限数据
pnpm rbac:init
```

**这会创建 17 个表：**
- 用户认证表：user, session, account, verification
- 业务表：order, subscription, credit, config
- 内容表：post, taxonomy
- AI 功能表：ai_task, chat, chat_message
- 权限表：role, permission, role_permission, user_role
- API 表：apikey

---

## 步骤 5️⃣: 启动开发服务器

```powershell
pnpm dev
```

🎉 访问 **http://localhost:3000**

---

## ✅ 验证安装

### 方式 1: Drizzle Studio (本地可视化)

```powershell
pnpm db:studio
```

打开 https://local.drizzle.studio 查看数据库表

### 方式 2: Supabase Dashboard (在线查看)

访问 [Table Editor](https://supabase.com/dashboard/project/xvhejrgnzluvkxhzgqqc/editor)

### 方式 3: 测试应用

1. 访问 http://localhost:3000
2. 注册新用户
3. 登录测试
4. 访问后台管理

---

## 📚 下一步

### 配置可选功能

#### 1. OAuth 社交登录

**配置 Google OAuth:**
1. 创建 [Google Cloud Console](https://console.cloud.google.com/) 项目
2. 获取 Client ID 和 Secret
3. 添加到 `.env.local`:
   ```env
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

**配置 GitHub OAuth:**
1. 创建 [GitHub OAuth App](https://github.com/settings/developers)
2. 获取 Client ID 和 Secret
3. 添加到 `.env.local`:
   ```env
   GITHUB_CLIENT_ID=your-client-id
   GITHUB_CLIENT_SECRET=your-client-secret
   ```

或者在应用后台管理面板中配置（推荐）

#### 2. 支付服务

**Stripe:**
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
```

**PayPal:**
```env
PAYPAL_CLIENT_ID=your-client-id
PAYPAL_CLIENT_SECRET=your-secret
```

#### 3. 邮件服务 (Resend)

```env
RESEND_API_KEY=re_...
```

#### 4. AI 服务

```env
REPLICATE_API_KEY=your-key
OPENAI_API_KEY=sk-...
```

---

## 🚀 部署到 Vercel

查看详细指南: **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)**

### 快速步骤：

1. 推送代码到 Git
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量（⚠️ 生产环境使用不同的 AUTH_SECRET）
4. 部署

---

## 🆘 遇到问题？

| 问题 | 解决方案 | 详细文档 |
|------|---------|---------|
| Node 版本错误 | 升级到 18+ | [SUPABASE_MIGRATION_GUIDE.md](./SUPABASE_MIGRATION_GUIDE.md) |
| 数据库连接失败 | 检查 DATABASE_URL | [ENV_SETUP.md](./ENV_SETUP.md) |
| pnpm 不存在 | `npm install -g pnpm` | - |
| AUTH_SECRET 错误 | 重新生成密钥 | [ENV_SETUP.md](./ENV_SETUP.md) |

---

## 📖 完整文档

| 文档 | 用途 |
|------|------|
| [MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md) | 📋 迁移工作总结 |
| [ENV_SETUP.md](./ENV_SETUP.md) | 🔧 环境变量详细配置 |
| [SUPABASE_MIGRATION_GUIDE.md](./SUPABASE_MIGRATION_GUIDE.md) | 📚 完整迁移指南 |
| [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) | 🚀 部署详细说明 |
| [README.md](./README.md) | 📖 项目介绍 |

---

## ⏱️ 预计时间

| 步骤 | 时间 |
|------|------|
| 升级 Node.js | 5 分钟 |
| 配置环境变量 | 3 分钟 |
| 安装依赖 | 2-5 分钟 |
| 初始化数据库 | 2 分钟 |
| 启动测试 | 1 分钟 |
| **总计** | **约 15-20 分钟** |

---

## 🎯 检查清单

- [ ] Node.js 版本 ≥ 18
- [ ] 创建 `.env.local` 文件
- [ ] 配置 `DATABASE_URL`
- [ ] 生成并配置 `AUTH_SECRET`
- [ ] 运行 `pnpm install`
- [ ] 运行 `pnpm db:push`
- [ ] 运行 `pnpm rbac:init`
- [ ] 运行 `pnpm dev`
- [ ] 访问 http://localhost:3000
- [ ] 测试注册/登录功能

---

**🎉 完成以上步骤，您就可以开始开发了！**

**Made with ❤️ for ShipAny**

