import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/navbar";
import { Footer as LandingFooter } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Pricing | Budget Tracker",
  description: "Choose the perfect plan for your financial journey",
};

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "Rs. 0",
      period: "forever",
      description: "Perfect for getting started with personal finance",
      features: [
        "Up to 3 accounts",
        "Basic transaction tracking",
        "Monthly budgets",
        "Expense categorization",
        "Basic charts & insights",
      ],
      limitations: [
        "No goal tracking",
        "No loan management",
        "Limited export options",
      ],
      cta: "Get Started",
      href: "/dashboard",
      popular: false,
    },
    {
      name: "Pro",
      price: "Rs. 999",
      period: "per month",
      description: "For serious budgeters and savers",
      features: [
        "Unlimited accounts",
        "Advanced transaction tracking",
        "Unlimited budgets",
        "Goal setting & tracking",
        "Loan & debt management",
        "Subscription tracking",
        "Advanced analytics",
        "Data export (CSV, PDF)",
        "Priority email support",
      ],
      limitations: [],
      cta: "Start Free Trial",
      href: "/dashboard",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Multi-user access",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantees",
        "Custom training",
        "Phone support",
        "Advanced security features",
      ],
      limitations: [],
      cta: "Contact Sales",
      href: "mailto:sales@financetracker.com",
      popular: false,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative overflow-hidden">
        {/* Decorative Background Bubbles */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-ruby/15 rounded-full opacity-60 blur-3xl" />
          <div className="absolute top-60 left-20 w-96 h-96 bg-crimson/15 rounded-full opacity-60 blur-3xl" />
          <div className="absolute bottom-40 right-1/3 w-80 h-80 bg-primary/15 rounded-full opacity-60 blur-3xl" />
        </div>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
              Simple, Transparent{" "}
              <span className="text-crimson drop-shadow-lg">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Choose the plan that fits your needs. Upgrade, downgrade, or
              cancel anytime.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative p-8 rounded-2xl border ${
                    plan.popular
                      ? "border-primary bg-primary/5 shadow-2xl"
                      : "border-border bg-card shadow-xl"
                  } hover:shadow-2xl transition-all`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-semibold">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">
                        /{plan.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>
                  <Link href={plan.href}>
                    <Button
                      className={`w-full rounded-full mb-6 shadow-lg hover:shadow-xl transition-all ${
                        plan.popular
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation) => (
                      <div key={limitation} className="flex items-start gap-3">
                        <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {limitation}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Can I switch plans later?
                </h3>
                <p className="text-muted-foreground">
                  Absolutely! You can upgrade, downgrade, or cancel your plan at
                  any time. Changes take effect immediately.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Is there a free trial for Pro?
                </h3>
                <p className="text-muted-foreground">
                  Yes! We offer a 14-day free trial of our Pro plan. No credit
                  card required.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards (Visa, MasterCard, American
                  Express) and PayPal.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Is my financial data secure?
                </h3>
                <p className="text-muted-foreground">
                  Yes! We use bank-level encryption and security protocols to
                  protect your data. We never sell your information to third
                  parties.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Do you offer refunds?
                </h3>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee. If you&apos;re not
                  satisfied, contact us for a full refund.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our team is here to help. Reach out and we&apos;ll get back to you
              within 24 hours.
            </p>
            <Link href="mailto:support@financetracker.com">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Contact Support
              </Button>
            </Link>
          </div>
        </section>
      </div>
      <LandingFooter />
    </>
  );
}
