# 🚀 Supabase 迁移完成指南

## ✅ 已完成的工作

1. ✅ 创建了环境变量配置文档 (`ENV_SETUP.md`)
2. ✅ 更新了 README.md，添加 Supabase 快速开始指南
3. ✅ 配置说明已准备完毕

---

## ⚠️ 重要：Node.js 版本要求

**检测到您当前使用 Node.js v14.21.3**

此项目需要 **Node.js 18 或更高版本**。

### 升级 Node.js

#### 选项 1: 使用 fnm (推荐 - 已检测到您在使用)

```powershell
# 安装 Node.js 18 LTS
fnm install 18

# 设置为默认版本
fnm default 18

# 验证版本
node --version
# 应该显示 v18.x.x
```

#### 选项 2: 使用 nvm-windows

```powershell
# 安装 Node.js 18
nvm install 18

# 使用 Node.js 18
nvm use 18

# 验证版本
node --version
```

#### 选项 3: 直接从官网下载

访问 [Node.js 官网](https://nodejs.org/) 下载 LTS 版本（v18 或 v20）

---

## 📋 接下来的步骤

### 1. 升级 Node.js 后，创建环境变量文件

在项目根目录创建 `.env.local` 文件：

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=ShipAny App
NEXT_PUBLIC_THEME=default
NEXT_PUBLIC_APPEARANCE=system
NEXT_PUBLIC_DEFAULT_LOCALE=en

# Supabase Database Configuration
DATABASE_URL=postgres://postgres.xvhejrgnzluvkxhzgqqc:chi_3785523@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x
DATABASE_PROVIDER=postgresql
DB_SINGLETON_ENABLED=false

# Supabase API Configuration (Optional)
NEXT_PUBLIC_SUPABASE_URL=https://xvhejrgnzluvkxhzgqqc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2aGVqcmduemx1dmt4aHpncXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyOTk0OTIsImV4cCI6MjA3OTg3NTQ5Mn0.XceyjXDLqfwp3igRATTUwRMVSaucFQWusB1EN6b2TAk

# Auth Configuration - ⚠️ IMPORTANT: Generate a secure secret!
AUTH_SECRET=CHANGE_THIS_TO_RANDOM_SECRET
AUTH_URL=http://localhost:3000
```

### 2. 生成安全的 AUTH_SECRET

**Windows PowerShell:**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }) -as [byte[]])
```

将生成的密钥替换 `.env.local` 中的 `CHANGE_THIS_TO_RANDOM_SECRET`

### 3. 安装依赖

```powershell
pnpm install
```

### 4. 推送数据库 Schema 到 Supabase

```powershell
pnpm db:push
```

这个命令会：
- 读取 `src/config/db/schema.ts` 中定义的所有表结构
- 在 Supabase 数据库中创建 17 个表：
  - 用户认证表：`user`, `session`, `account`, `verification`
  - 业务表：`order`, `subscription`, `credit`, `config`
  - 内容表：`post`, `taxonomy`
  - AI 功能表：`ai_task`, `chat`, `chat_message`
  - RBAC 表：`role`, `permission`, `role_permission`, `user_role`
  - API 表：`apikey`

### 5. 初始化 RBAC 权限数据

```powershell
pnpm rbac:init
```

这个命令会创建：
- 默认角色（admin, user 等）
- 默认权限
- 角色-权限关联

### 6. 启动开发服务器

```powershell
pnpm dev
```

访问 http://localhost:3000 测试应用

---

## 🔍 验证迁移成功

### 方式 1: 使用 Drizzle Studio（推荐）

```powershell
pnpm db:studio
```

会打开一个可视化界面 (https://local.drizzle.studio)，可以查看所有表和数据。

### 方式 2: 使用 Supabase Dashboard

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard/project/xvhejrgnzluvkxhzgqqc)
2. 点击 "Table Editor" 查看所有表
3. 应该能看到 17 个表已创建

### 方式 3: 测试应用功能

1. 访问 http://localhost:3000
2. 尝试注册新用户
3. 尝试登录
4. 检查是否能正常访问后台

---

## 📦 Vercel 部署配置

### 在 Vercel 项目中添加环境变量

进入 Vercel 项目设置 → Environment Variables，添加以下变量：

#### 必需变量（Production + Preview）

| 变量名 | 值 |
|--------|-----|
| `DATABASE_URL` | `postgres://postgres.xvhejrgnzluvkxhzgqqc:chi_3785523@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x` |
| `DATABASE_PROVIDER` | `postgresql` |
| `DB_SINGLETON_ENABLED` | `false` |
| `AUTH_SECRET` | **⚠️ 生成新的随机密钥（生产环境必须不同！）** |
| `AUTH_URL` | `https://your-domain.vercel.app` |
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.vercel.app` |
| `NEXT_PUBLIC_APP_NAME` | `ShipAny App` |
| `NEXT_PUBLIC_THEME` | `default` |
| `NEXT_PUBLIC_APPEARANCE` | `system` |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | `en` |

#### 可选变量（根据需要添加）

| 变量名 | 说明 |
|--------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xvhejrgnzluvkxhzgqqc.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 您的 Supabase 匿名密钥 |
| `GOOGLE_CLIENT_ID` | Google OAuth（可后台配置） |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Secret |
| `STRIPE_SECRET_KEY` | Stripe 支付 |
| `RESEND_API_KEY` | 邮件服务 |

### 部署流程

1. 确保所有环境变量已配置
2. 推送代码到 Git 仓库
3. Vercel 会自动构建和部署
4. 首次部署后，运行数据库初始化（如果需要）：
   ```bash
   # 在 Vercel CLI 或连接到生产数据库时运行
   pnpm db:push
   pnpm rbac:init
   ```

---

## 🔒 安全建议

### 1. 为生产环境生成独立的 AUTH_SECRET

```powershell
# 生成生产环境密钥
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }) -as [byte[]])
```

### 2. 启用 Supabase Row Level Security (RLS)

虽然当前使用 Connection Pooler 直连数据库（绕过 RLS），但建议为敏感表添加 RLS 策略作为额外安全层。

访问 [Supabase Authentication](https://supabase.com/dashboard/project/xvhejrgnzluvkxhzgqqc/auth/policies) 配置。

### 3. 配置数据库备份

在 Supabase Dashboard → Settings → Database → Backups 中启用自动备份。

### 4. 监控数据库连接

Supabase 免费计划有连接数限制，建议：
- 保持 `DB_SINGLETON_ENABLED=false` (Serverless 环境)
- 使用 Connection Pooler（已配置）
- 监控 Supabase Dashboard 的连接数使用情况

---

## 📊 迁移前后对比

| 项目 | 迁移前 | 迁移后 |
|------|--------|--------|
| 数据库 | 自建 PostgreSQL | Supabase PostgreSQL |
| ORM | Drizzle ORM | ✅ 保持不变 |
| 认证 | Better Auth | ✅ 保持不变 |
| 驱动 | postgres-js | ✅ 保持不变 |
| 代码改动 | - | ✅ **零代码改动** |
| 功能影响 | - | ✅ 无任何影响 |

**总结**: 仅更改了数据库连接字符串，所有业务代码保持不变！

---

## 🆘 常见问题

### Q: 推送 Schema 时连接超时？
A: 检查网络连接，确保能访问 `aws-1-us-east-1.pooler.supabase.com:6543`

### Q: AUTH_SECRET 错误？
A: 确保生成了完整的 32 字节 base64 密钥，不要有换行符

### Q: Vercel 部署后 500 错误？
A: 
1. 检查 Vercel 环境变量是否完整
2. 查看 Vercel 部署日志
3. 确认 `DATABASE_URL` 和 `AUTH_SECRET` 正确

### Q: 如何回滚？
A: 
1. 在 `.env.local` 中恢复旧的 `DATABASE_URL`
2. 重启开发服务器
3. Supabase 数据不会受影响

---

## ✅ 迁移检查清单

完成以下步骤后，迁移即可完成：

- [ ] 升级 Node.js 到 18+
- [ ] 创建 `.env.local` 文件
- [ ] 生成安全的 `AUTH_SECRET`
- [ ] 运行 `pnpm install`
- [ ] 运行 `pnpm db:push` 成功
- [ ] 运行 `pnpm rbac:init` 成功
- [ ] 运行 `pnpm dev` 启动成功
- [ ] 测试用户注册/登录
- [ ] 在 Vercel 配置环境变量
- [ ] 部署到 Vercel 成功
- [ ] 验证生产环境功能正常

---

## 📞 需要帮助？

- Supabase 文档: https://supabase.com/docs
- Drizzle ORM 文档: https://orm.drizzle.team
- Better Auth 文档: https://www.better-auth.com
- ShipAny 文档: https://shipany.ai/docs

祝您迁移顺利！🎉

