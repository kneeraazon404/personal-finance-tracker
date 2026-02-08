import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, TrendingUp, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/navbar";
import { Footer as LandingFooter } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "About | Budget Tracker",
  description: "Learn about our mission to help you achieve financial freedom",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen relative overflow-hidden">
        {/* Decorative Background Bubbles */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-crimson/15 rounded-full opacity-60 blur-3xl" />
          <div className="absolute top-60 right-20 w-96 h-96 bg-ruby/15 rounded-full opacity-60 blur-3xl" />
          <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-primary/15 rounded-full opacity-60 blur-3xl" />
        </div>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
              Your Financial Freedom,{" "}
              <span className="text-crimson drop-shadow-lg">Our Mission</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We believe everyone deserves to master their money. Our platform
              empowers you with the tools and insights to take control of your
              financial future.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-8 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Budget Tracker was built with a simple goal: make financial
              management accessible, intuitive, and powerful for everyone. We
              know that tracking expenses and managing budgets can feel
              overwhelming, which is why we've created a platform that
              simplifies the process while providing deep insights into your
              financial health.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're saving for a home, paying off debt, or building
              your investment portfolio, we provide the tools you need to
              succeed—all in one place.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-12 text-center">
              What Makes Us Different
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl border border-border bg-card shadow-xl hover:shadow-2xl transition-shadow">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <Shield className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Bank-Level Security
                </h3>
                <p className="text-muted-foreground">
                  Your data is encrypted end-to-end. We use industry-standard
                  security protocols to keep your financial information safe.
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-border bg-card shadow-xl hover:shadow-2xl transition-shadow">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Insights</h3>
                <p className="text-muted-foreground">
                  Get personalized recommendations and insights based on your
                  spending patterns and financial goals.
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-border bg-card shadow-xl hover:shadow-2xl transition-shadow">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <Zap className="w-6 h-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Built with modern technology for instant updates and real-time
                  tracking of all your accounts.
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-border bg-card shadow-xl hover:shadow-2xl transition-shadow">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
                <p className="text-muted-foreground">
                  Join thousands of users who are taking control of their
                  finances and achieving their goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-8 text-center">
              Built with Modern Technology
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              We use cutting-edge tools to deliver a fast, reliable, and secure
              experience.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "Next.js",
                "PostgreSQL",
                "Prisma",
                "NextAuth",
                "TypeScript",
                "TailwindCSS",
                "React",
                "Supabase",
              ].map((tech) => (
                <div
                  key={tech}
                  className="p-6 rounded-xl bg-card border border-border text-center font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users who have taken control of their financial
              future.
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="rounded-full shadow-xl hover:shadow-2xl transition-all"
              >
                Start Tracking Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
      <LandingFooter />
    </>
  );
}
