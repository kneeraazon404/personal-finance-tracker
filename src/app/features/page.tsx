import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Target,
  Wallet,
  CreditCard,
  Bell,
  TrendingUp,
  Shield,
  Zap,
  Users,
  Lock,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/navbar";
import { Footer as LandingFooter } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Features | Budget Tracker",
  description: "Discover powerful features to manage your finances effectively",
};

export default function FeaturesPage() {
  const features = [
    {
      icon: Wallet,
      title: "Multi-Account Tracking",
      description:
        "Connect and track unlimited bank accounts, credit cards, and wallets in one place. Get a complete view of your financial health.",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Visualize your spending patterns with beautiful charts and insights. Make data-driven financial decisions with ease.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Target,
      title: "Goal Setting & Tracking",
      description:
        "Set financial goals and track your progress automatically. Stay motivated with real-time updates and milestone celebrations.",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: CreditCard,
      title: "Loan Management",
      description:
        "Track loans, mortgages, and debts with automatic payment schedules. Never miss a payment and pay off debt faster.",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      icon: Bell,
      title: "Subscription Tracking",
      description:
        "Monitor all your recurring subscriptions and memberships. Get alerts before renewals and cancel unwanted subscriptions.",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      icon: TrendingUp,
      title: "Budget Planning",
      description:
        "Create custom budgets for different categories. Get real-time alerts when you're approaching your limits.",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description:
        "256-bit encryption keeps your financial data safe and secure.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Real-time sync across all devices. Access your data instantly.",
    },
    {
      icon: Users,
      title: "Multi-User Support",
      description: "Share budgets and goals with family members securely.",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your data belongs to you. We never sell your information.",
    },
    {
      icon: Download,
      title: "Data Export",
      description: "Export your financial data anytime in CSV or PDF format.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {/* Decorative elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-20 blur-3xl" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-emerald-500 rounded-full opacity-20 blur-3xl" />
        </div>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
              Powerful Features for{" "}
              <span className="text-crimson">Privacy</span> & Security
              <br />
              Complete Control
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Everything you need to master your finances, all in one beautiful
              platform.
            </p>
          </div>
        </section>

        {/* Main Features Grid */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group p-8 rounded-2xl border border-border bg-card shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div
                      className={`w-14 h-14 ${feature.bgColor} ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4">Built for You</h2>
              <p className="text-lg text-muted-foreground">
                Designed with security, speed, and simplicity in mind
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="flex gap-4 p-6 rounded-xl bg-card border border-border shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="shrink-0">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-center mb-12 text-crimson">
              Everything you need to manage your money
            </h2>
            <h2 className="text-3xl font-semibold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users taking control of their financial future.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="rounded-full shadow-xl hover:shadow-2xl transition-all"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <LandingFooter />
    </>
  );
}
