# 💰 Personal Finance Tracker

A modern, full-stack personal finance management application built with Next.js 16, featuring real-time transaction tracking, budget management, goal setting, and comprehensive financial analytics.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7.2-2D3748?logo=prisma)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 💳 Account Management

- Connect multiple bank accounts and credit cards
- Track balances in real-time
- Support for various account types (checking, savings, credit, investment)

### 📊 Transaction Tracking

- Automated transaction categorization
- Merchant recognition and tagging
- Advanced filtering and search
- Transaction history with pagination

### 📈 Budget Planning

- Create custom budgets by category
- Visual progress tracking
- Budget alerts and notifications
- Month-over-month comparison

### 🎯 Financial Goals

- Set and track savings goals
- Progress visualization
- Target date tracking
- Achievement milestones

### 💸 Loan Management

- Track multiple loans (mortgages, auto, personal)
- Calculate payment schedules
- Monitor interest and principal breakdowns
- Payoff projections

### 🔄 Subscription Tracking

- Identify recurring charges
- Manage active subscriptions
- Cost analysis and optimization
- Cancellation reminders

### 📉 Analytics & Insights

- Interactive charts and graphs (powered by Chart.js)
- Spending trends analysis
- Category breakdowns
- Net worth tracking
- Custom date range reporting

### 🔐 Security & Authentication

- Secure OAuth 2.0 authentication (GitHub, Google)
- NextAuth.js integration
- Bank-grade encryption
- Session management
- Protected API routes

## 🚀 Tech Stack

### Frontend

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Charts**: Chart.js + react-chartjs-2
- **State Management**: TanStack Query (React Query)

### Backend

- **API**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma 7
- **Authentication**: NextAuth.js 4
- **Adapter**: Prisma Adapter for NextAuth

### DevOps & Tools

- **Hosting**: Vercel (recommended)
- **Database**: Supabase / Neon / Railway
- **Version Control**: Git
- **Package Manager**: npm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** database (local or cloud)
- **Git**

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/kneeraazon404/personal-finance-tracker.git
cd personal-finance-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

#### Database Configuration

Get a PostgreSQL connection string from:

- **Local**: `postgresql://username:password@localhost:5432/database`
- **Supabase**: [supabase.com](https://supabase.com)
- **Neon**: [neon.tech](https://neon.tech)
- **Railway**: [railway.app](https://railway.app)

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
```

#### NextAuth Configuration

Generate a secret:

```bash
openssl rand -base64 32
```

```env
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="http://localhost:3000"
```

#### GitHub OAuth (Optional)

1. Go to [GitHub Settings → Developer settings → OAuth Apps](https://github.com/settings/applications/new)
2. Create new OAuth App:
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
3. Copy credentials:

```env
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

#### Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create OAuth 2.0 Client ID:
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
3. Copy credentials:

```env
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Database Setup

Run Prisma migrations to set up your database schema:

```bash
npx prisma migrate dev
```

Generate Prisma Client:

```bash
npx prisma generate
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

| Script                   | Description                          |
| ------------------------ | ------------------------------------ |
| `npm run dev`            | Start development server             |
| `npm run build`          | Build for production                 |
| `npm start`              | Start production server              |
| `npm run lint`           | Run ESLint                           |
| `npx prisma studio`      | Open Prisma Studio (database GUI)    |
| `npx prisma migrate dev` | Create and apply database migrations |
| `npx prisma generate`    | Generate Prisma Client               |

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kneeraazon404/personal-finance-tracker)

1. Push your code to GitHub
2. Import project to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your hosting platform:

```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.com"
GITHUB_ID="your-github-id"
GITHUB_SECRET="your-github-secret"
GOOGLE_CLIENT_ID="your-google-id"
GOOGLE_CLIENT_SECRET="your-google-secret"
```

### Database Migration in Production

After deployment, run migrations:

```bash
npx prisma migrate deploy
```

## 📁 Project Structure

```
personal-finance-tracker/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/           # Protected routes
│   │   │   ├── dashboard/
│   │   │   ├── accounts/
│   │   │   ├── transactions/
│   │   │   ├── budgets/
│   │   │   ├── goals/
│   │   │   ├── loans/
│   │   │   ├── subscriptions/
│   │   │   └── categories/
│   │   ├── api/              # API routes
│   │   ├── login/
│   │   ├── signup/
│   │   ├── about/
│   │   ├── features/
│   │   └── pricing/
│   ├── components/           # React components
│   │   ├── landing/         # Landing page components
│   │   ├── layout/          # Layout components
│   │   ├── features/        # Feature-specific components
│   │   └── ui/              # shadcn/ui components
│   └── lib/                 # Utility functions
├── .env.example             # Environment template
├── package.json
└── tsconfig.json
```

## 🔒 Security Best Practices

- ✅ All API routes are protected with NextAuth sessions
- ✅ Environment variables for sensitive data
- ✅ SQL injection protection via Prisma ORM
- ✅ CSRF protection built-in with NextAuth
- ✅ Secure session cookies with HttpOnly flag
- ✅ Password-less authentication via OAuth

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Neeraj Budhathoki**

- GitHub: [@kneeraazon404](https://github.com/kneeraazon404)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components

---

<p align="center">Made with ❤️ by Neeraj Budhathoki</p>
