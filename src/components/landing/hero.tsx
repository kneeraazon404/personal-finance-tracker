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
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px] opacity-50 animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-xl"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          New: AI-Powered Insights
          <ChevronRight className="w-3 h-3 ml-1" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
        >
          Master your money <br />
          <span className="bg-linear-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent pb-4">
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
          <Link href="/dashboard">
            <Button
              size="lg"
              className="h-12 px-8 rounded-full text-base bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/25"
            >
              Start for free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link
            href="https://github.com/kneeraazon/personal-finance-tracker"
            target="_blank"
          >
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 rounded-full text-base border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
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
            <h4 className="text-3xl font-bold text-foreground">10k+</h4>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-3xl font-bold text-foreground">$2M+</h4>
            <p className="text-sm text-muted-foreground">Tracked Assets</p>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-3xl font-bold text-foreground">4.9/5</h4>
            <p className="text-sm text-muted-foreground">User Rating</p>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-3xl font-bold text-foreground">99.9%</h4>
            <p className="text-sm text-muted-foreground">Uptime</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
