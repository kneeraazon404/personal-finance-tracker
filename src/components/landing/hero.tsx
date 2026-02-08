"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-crimson/20 rounded-full shadow-2xl blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-ruby/20 rounded-full shadow-2xl blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-primary/20 rounded-full shadow-2xl blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 shadow-lg"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
          New: AI-Powered Insights
          <ChevronRight className="w-3 h-3 ml-1" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-semibold tracking-tight mb-8"
        >
          Master your money <br />
          <span className="bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent font-semibold drop-shadow-xl">
            with confidence.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Stop guessing where your money goes. Track expenses, manage accounts,
          and reach your financial goals with a platform designed for the modern
          investor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/signup">
            <Button
              size="lg"
              className="h-12 px-8 rounded-full text-base bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all shadow-xl"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link
            href="https://github.com/kneeraazon404/personal-finance-tracker"
            target="_blank"
          >
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 rounded-full text-base bg-[#24292e] text-white border-[#24292e] hover:bg-[#2f363d] hover:border-[#2f363d] transition-colors"
            >
              View on GitHub
            </Button>
          </Link>
        </motion.div>

        {/* Stats / Trust Markers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 pt-10 border-t border-border/40 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="flex flex-col items-center">
            <h4 className="text-3xl font-semibold text-foreground">10k+</h4>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-3xl font-semibold text-foreground">Rs. 2M+</h4>
            <p className="text-sm text-muted-foreground">Tracked Assets</p>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-3xl font-semibold text-foreground">4.9/5</h4>
            <p className="text-sm text-muted-foreground">User Rating</p>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-3xl font-semibold text-foreground">99.9%</h4>
            <p className="text-sm text-muted-foreground">Uptime</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
