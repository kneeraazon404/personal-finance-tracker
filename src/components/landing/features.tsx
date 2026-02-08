"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Lock,
  PieChart,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "Visualize your spending patterns with beautiful, interactive charts and get actionable insights to save more.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },

  {
    icon: Lock,
    title: "Bank-Grade Security",
    description:
      "Your financial data is encrypted with AES-256 bit encryption. We prioritize your privacy and never sell your data.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: ArrowUpRight,
    title: "Investment Tracking",
    description:
      "Keep track of your stocks, crypto, and other assets. See your portfolio performance at a glance.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: PieChart,
    title: "Budget Planning",
    description:
      "Set smart budgets for different categories and get notified when you're close to hitting your limits.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    icon: CreditCard,
    title: "Subscription Manager",
    description:
      "Identify recurring charges and cancel unwanted subscriptions with a single click.",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    icon: PieChart,
    title: "Advance Charts",
    description:
      "Visualize your financial health with interactive Radar and Stacked Line charts powered by Chart.js.",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
];

export function Features() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="features" className="py-24 px-6 relative bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">
            Everything you need to{" "}
            <span className="text-primary">grow wealth</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful tools to help you take control of your financial future,
            all in one intuitive dashboard.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="group p-8 rounded-3xl bg-background border border-border/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
