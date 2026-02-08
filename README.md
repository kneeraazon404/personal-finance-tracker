This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Configuration

To run this project, you need to set up several environment variables. Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Then open `.env` and update the following values:

### 1. Database (Prisma + PostgreSQL)

You need a PostgreSQL database.

**Local Development:**

- Install PostgreSQL locally.
- Create a database (e.g., `finance_tracker`).
- Connection string: `postgresql://user:password@localhost:5432/finance_tracker`

**Cloud Providers (Recommended for Production):**

- [Neon](https://neon.tech/)
- [Supabase](https://supabase.com/)
- [Railway](https://railway.app/)

Update `DATABASE_URL` in `.env` with your connection string.

### 2. NextAuth Configuration

- **NEXTAUTH_SECRET**: Used to encrypt sessions. Generate one using:
  ```bash
  openssl rand -base64 32
  ```
- **NEXTAUTH_URL**: The canonical URL of your site.
  - Development: `http://localhost:3000`
  - Production: `https://your-domain.com`

### 3. Authentication Providers

#### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/applications/new).
2. Register a new OAuth App.
3. Set **Homepage URL** to `http://localhost:3000` (or your production URL).
4. Set **Authorization callback URL** to `http://localhost:3000/api/auth/callback/github`.
5. Copy standard **Client ID** and generate a **Client Secret**.
6. Update `GITHUB_ID` and `GITHUB_SECRET` in `.env`.

#### Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Create a new Project and configure the OAuth Consent Screen.
3. Create Credentials > OAuth client ID > Web application.
4. Add **Authorized JavaScript origins**: `http://localhost:3000`.
5. Add **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`.
6. Copy **Client ID** and **Client Secret**.
7. Update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
