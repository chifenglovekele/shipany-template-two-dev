# 📦 Vercel 部署指南

## 🚀 快速部署到 Vercel

### 前提条件

1. ✅ Supabase 数据库已创建并配置完成
2. ✅ 本地开发环境测试通过
3. ✅ Git 仓库已准备好
4. ✅ Vercel 账号已注册

---

## 步骤 1: 准备 Git 仓库

```bash
# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "feat: migrate to Supabase"

# 添加远程仓库（GitHub/GitLab/Bitbucket）
git remote add origin <your-repo-url>

# 推送到远程
git push -u origin main
```

---

## 步骤 2: 在 Vercel 创建项目

### 方式 1: 通过 Vercel Dashboard

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "Add New..." → "Project"
3. 选择您的 Git 仓库
4. 点击 "Import"

### 方式 2: 通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel
```

---

## 步骤 3: 配置环境变量

在 Vercel 项目设置中添加以下环境变量：

### 🔴 关键环境变量（必需）

进入 **Project Settings → Environment Variables**，添加以下变量：

#### 数据库配置

| 变量名 | 值 | 环境 |
|--------|-----|------|
| `DATABASE_URL` | `postgres://postgres.xvhejrgnzluvkxhzgqqc:chi_3785523@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x` | Production, Preview, Development |
| `DATABASE_PROVIDER` | `postgresql` | Production, Preview, Development |
| `DB_SINGLETON_ENABLED` | `false` | Production, Preview, Development |

#### 认证配置

| 变量名 | 值 | 环境 |
|--------|-----|------|
| `AUTH_SECRET` | **⚠️ 生成新的随机密钥！** | Production, Preview, Development |
| `AUTH_URL` | `https://your-domain.vercel.app` | Production |
| `AUTH_URL` | `https://your-preview.vercel.app` | Preview（可选，Vercel 会自动处理） |
| `AUTH_URL` | `http://localhost:3000` | Development |

**⚠️ 重要**: 生产环境的 `AUTH_SECRET` 必须与本地不同！

生成新密钥（PowerShell）:
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }) -as [byte[]])
```

#### 应用配置

| 变量名 | Production 值 | Preview 值 | Development 值 |
|--------|---------------|------------|----------------|
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.vercel.app` | `https://your-preview.vercel.app` | `http://localhost:3000` |
| `NEXT_PUBLIC_APP_NAME` | `PPP Calculator` | `PPP Calculator` | `PPP Calculator` |
| `NEXT_PUBLIC_THEME` | `default` | `default` | `default` |
| `NEXT_PUBLIC_APPEARANCE` | `system` | `system` | `system` |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | `en` | `en` | `en` |

---

### 🟡 可选环境变量

#### Supabase 客户端（如果使用 Supabase 额外功能）

| 变量名 | 值 |
|--------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xvhejrgnzluvkxhzgqqc.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

#### OAuth 社交登录

| 变量名 | 说明 |
|--------|------|
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret |
| `GITHUB_CLIENT_ID` | GitHub OAuth Client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth Client Secret |

**注意**: OAuth 配置也可以通过应用后台管理面板配置，不一定需要环境变量。

#### 支付服务

| 变量名 | 说明 |
|--------|------|
| `STRIPE_SECRET_KEY` | Stripe 私钥 |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook 密钥 |
| `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` | Stripe 公钥 |
| `PAYPAL_CLIENT_ID` | PayPal Client ID |
| `PAYPAL_CLIENT_SECRET` | PayPal Secret |
| `PAYPAL_WEBHOOK_ID` | PayPal Webhook ID |

#### 邮件服务

| 变量名 | 说明 |
|--------|------|
| `RESEND_API_KEY` | Resend 邮件服务 API Key |

#### AI 服务

| 变量名 | 说明 |
|--------|------|
| `REPLICATE_API_KEY` | Replicate AI API Key |
| `OPENAI_API_KEY` | OpenAI API Key |

#### 存储服务（Cloudflare R2 / AWS S3）

| 变量名 | 说明 |
|--------|------|
| `R2_ACCOUNT_ID` | Cloudflare R2 Account ID |
| `R2_ACCESS_KEY_ID` | R2 Access Key |
| `R2_SECRET_ACCESS_KEY` | R2 Secret Key |
| `R2_BUCKET_NAME` | R2 Bucket 名称 |
| `R2_PUBLIC_URL` | R2 公开访问 URL |

#### 分析服务

| 变量名 | 说明 |
|--------|------|
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | Google Analytics ID |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity ID |

---

## 步骤 4: 配置构建设置

在 Vercel 项目设置中确认以下配置：

### Build & Development Settings

| 设置项 | 值 |
|--------|-----|
| Framework Preset | **Next.js** |
| Build Command | `pnpm build` (默认) |
| Output Directory | `.next` (默认) |
| Install Command | `pnpm install` (默认) |
| Development Command | `pnpm dev` (默认) |

### Node.js Version

- ✅ 确保选择 **18.x** 或更高版本

---

## 步骤 5: 初始化生产数据库

### 方式 1: 通过 Vercel CLI 连接生产环境

```bash
# 链接到 Vercel 项目
vercel link

# 拉取环境变量到本地
vercel env pull .env.production

# 使用生产环境变量推送 schema
DATABASE_URL="<production-database-url>" pnpm db:push

# 初始化 RBAC
DATABASE_URL="<production-database-url>" pnpm rbac:init
```

### 方式 2: 直接在本地连接生产数据库

临时修改 `.env.local` 中的 `DATABASE_URL` 为生产环境数据库：

```bash
# 推送 schema
pnpm db:push

# 初始化 RBAC
pnpm rbac:init

# 完成后恢复 .env.local
```

⚠️ **注意**: 完成后记得恢复本地配置！

---

## 步骤 6: 部署

### 自动部署

每次推送到主分支，Vercel 会自动构建和部署：

```bash
git add .
git commit -m "update: configuration"
git push origin main
```

### 手动部署

```bash
vercel --prod
```

---

## 步骤 7: 验证部署

### 1. 检查构建日志

在 Vercel Dashboard → Deployments → 最新部署 → "Building" 查看构建日志，确保无错误。

### 2. 访问应用

访问 `https://your-domain.vercel.app`，测试：

- ✅ 首页加载正常
- ✅ 用户注册功能
- ✅ 用户登录功能
- ✅ 后台管理访问
- ✅ 支付流程（如已配置）

### 3. 检查数据库

在 [Supabase Dashboard](https://supabase.com/dashboard/project/xvhejrgnzluvkxhzgqqc/editor) 中验证：

- ✅ 所有表已创建
- ✅ RBAC 数据已初始化
- ✅ 用户注册后数据正确写入

---

## 🔧 常见问题排查

### 问题 1: 部署失败 - "DATABASE_URL is not set"

**解决方案:**
1. 检查 Vercel 环境变量是否正确添加
2. 确保环境变量应用到了 "Production" 环境
3. 重新部署

### 问题 2: 500 Internal Server Error

**解决方案:**
1. 查看 Vercel 部署日志（Functions → 选择函数 → Logs）
2. 常见原因：
   - `AUTH_SECRET` 未设置或格式错误
   - `DATABASE_URL` 无法连接
   - 数据库 Schema 未推送

### 问题 3: 数据库连接超时

**解决方案:**
1. 确认使用 Connection Pooler URL (端口 6543)
2. 检查 Supabase 项目状态
3. 确认 `DB_SINGLETON_ENABLED=false` (Serverless 环境)

### 问题 4: OAuth 登录回调失败

**解决方案:**
1. 更新 OAuth 提供商的回调 URL:
   - Google: `https://your-domain.vercel.app/api/auth/callback/google`
   - GitHub: `https://your-domain.vercel.app/api/auth/callback/github`
2. 确保 `AUTH_URL` 和 `NEXT_PUBLIC_APP_URL` 正确

### 问题 5: 支付 Webhook 失败

**解决方案:**
1. 更新 Stripe/PayPal Webhook URL:
   - Stripe: `https://your-domain.vercel.app/api/payment/notify`
2. 确认 Webhook Secret 正确配置

---

## 🔒 安全检查清单

部署前请确认：

- [ ] 生产环境使用独立的 `AUTH_SECRET`（与本地不同）
- [ ] 所有敏感密钥已在 Vercel 环境变量中配置
- [ ] `.env.local` 文件已加入 `.gitignore`（不提交到 Git）
- [ ] OAuth 回调 URL 已更新到生产域名
- [ ] 支付 Webhook URL 已更新到生产域名
- [ ] Supabase 数据库备份已启用
- [ ] 启用了 Vercel 的 HTTPS（自动）
- [ ] 配置了自定义域名（可选）

---

## 📊 性能优化建议

### 1. 启用 Vercel Analytics

在 Vercel 项目设置中启用 Analytics，监控性能。

### 2. 配置 ISR (Incremental Static Regeneration)

对于内容页面，可以使用 ISR 提升性能：

```typescript
// app/blog/[slug]/page.tsx
export const revalidate = 3600; // 每小时重新生成
```

### 3. 监控 Supabase 连接数

免费计划有连接限制，定期检查 Supabase Dashboard → Reports。

### 4. 启用 Vercel Edge Network

确保静态资源通过 CDN 分发（Vercel 自动处理）。

---

## 🎯 生产环境最佳实践

1. **分离环境**: 使用独立的 Supabase 项目用于 Production 和 Preview
2. **监控告警**: 配置 Supabase 和 Vercel 的告警通知
3. **定期备份**: 启用 Supabase 自动备份，定期测试恢复
4. **日志收集**: 集成 Sentry 或其他日志服务
5. **负载测试**: 部署后进行压力测试
6. **回滚计划**: 熟悉 Vercel 的 Rollback 功能

---

## 📚 相关资源

- [Vercel 文档](https://vercel.com/docs)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Supabase 生产环境最佳实践](https://supabase.com/docs/guides/platform/going-into-prod)
- [Vercel 环境变量文档](https://vercel.com/docs/projects/environment-variables)

---

## ✅ 部署检查清单

- [ ] Git 仓库已准备
- [ ] Vercel 项目已创建
- [ ] 所有必需环境变量已配置
- [ ] Node.js 版本设置为 18.x+
- [ ] 数据库 Schema 已推送到生产环境
- [ ] RBAC 数据已初始化
- [ ] 首次部署成功
- [ ] 用户注册/登录功能测试通过
- [ ] OAuth 登录测试通过（如已配置）
- [ ] 支付功能测试通过（如已配置）
- [ ] 自定义域名已配置（可选）
- [ ] SSL 证书已启用（Vercel 自动）
- [ ] 监控和告警已设置

完成以上步骤后，您的应用就成功部署到 Vercel 了！🎉

