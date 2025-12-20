import Link from "next/link";
import { ArrowRight, BarChart3, Lock, Wallet } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="px-6 h-16 flex items-center border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl mr-auto">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
            <Wallet className="w-5 h-5" />
          </div>
          FinanceTracker
        </div>
        <nav className="flex gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/login" className="hover:text-foreground transition-colors">Login</Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="py-24 px-6 text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-sm font-medium text-muted-foreground backdrop-blur-xl">
            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            v1.0 is now live
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent pb-2">
            Master your money <br /> with confidence.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Track expenses, manage accounts, and reach your financial goals with a platform designed for modern life.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link
              href="/dashboard"
              className="h-12 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium flex items-center gap-2 transition-transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="https://github.com/kneeraazon/personal-finance-tracker"
              target="_blank"
              className="h-12 px-8 rounded-full border border-border bg-background hover:bg-muted font-medium flex items-center gap-2 transition-colors"
            >
              View on GitHub
            </Link>
          </div>
        </section>

        <section id="features" className="py-24 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">Everything you need to grow wealth</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-background border border-border shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Analytics & Insights</h3>
                <p className="text-muted-foreground">Visualize your spending patterns with beautiful charts and get actionable insights.</p>
              </div>
              <div className="p-8 rounded-2xl bg-background border border-border shadow-sm">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-6">
                  <Wallet className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Account Management</h3>
                <p className="text-muted-foreground">Connect all your accounts in one place and track your net worth in real-time.</p>
              </div>
              <div className="p-8 rounded-2xl bg-background border border-border shadow-sm">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
                <p className="text-muted-foreground">Your financial data is encrypted and secure. We prioritize your privacy above all.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-6 border-t border-border/40 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Personal Finance Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}
