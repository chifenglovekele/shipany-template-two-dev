# ShipAny Template Two

> **📚 Supabase 迁移完成！** 查看 **[SUPABASE_README.md](./SUPABASE_README.md)** 了解所有文档和快速开始指南。

## 🚀 Quick Start with Supabase

This template uses **Supabase** as the PostgreSQL database provider.

### 1. Prerequisites

- Node.js 18+ installed
- pnpm package manager
- Supabase account ([Sign up here](https://supabase.com))

### 2. Environment Setup

**Step 1**: Copy environment configuration
```bash
# Create .env.local file in project root
# See ENV_SETUP.md for complete configuration guide
```

**Step 2**: Configure Supabase credentials in `.env.local`
```env
DATABASE_URL=your-supabase-connection-pooler-url
DATABASE_PROVIDER=postgresql
AUTH_SECRET=your-random-32-byte-secret
```

See **[ENV_SETUP.md](./ENV_SETUP.md)** for detailed setup instructions.

### 3. Initialize Database

```bash
# Install dependencies
pnpm install

# Push database schema to Supabase
pnpm db:push

# Initialize RBAC roles and permissions
pnpm rbac:init
```

### 4. Start Development

```bash
# Run development server
pnpm dev

# Open http://localhost:3000
```

### 5. Deploy to Vercel

See **[ENV_SETUP.md](./ENV_SETUP.md)** → "Vercel 部署配置" section for deployment instructions.

---

## 📚 Documentation

Read [ShipAny Document](https://shipany.ai/docs/quick-start) to start your AI SaaS project.

## 🛒 Buy Templates

Check [ShipAny Templates](https://shipany.ai/templates) to buy Business Templates.

## 💬 Feedback

Submit your feedbacks on [Github Issues](https://github.com/shipanyai/shipany-template-two/issues)

## 📄 LICENSE

!!! Please do not publicly release ShipAny's Code. Illegal use will be prosecuted

[ShipAny LICENSE](./LICENSE)
