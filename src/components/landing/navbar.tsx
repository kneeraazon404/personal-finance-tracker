"use client";

import Link from "next/link";
import { Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-6 h-16 flex items-center fixed top-0 w-full z-50 border-b border-white/10 bg-background/50 backdrop-blur-md supports-[backdrop-filter]:bg-background/20"
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary border border-primary/20">
            <Wallet className="w-5 h-5" />
          </div>
          <span className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            FinanceTracker
          </span>
        </Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <Link
            href="#features"
            className="hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link href="#about" className="hover:text-primary transition-colors">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium hover:text-primary transition-colors hidden sm:block"
          >
            Login
          </Link>
          <Link href="/dashboard">
            <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
