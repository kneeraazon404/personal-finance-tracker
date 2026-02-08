import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Wallet } from "lucide-react";
import { UserAuthForm } from "@/components/auth/user-auth-form";

export const metadata: Metadata = {
  title: "Login | Personal Finance Tracker",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="container relative h-[800px] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/"
        className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors z-50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="absolute inset-0 bg-linear-to-tr from-emerald-900/50 via-zinc-900/50 to-emerald-900/20" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Wallet className="mr-2 h-6 w-6 text-emerald-500" />
          FinanceTracker
        </div>
        <div className="relative z-20 m-auto max-w-sm text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-emerald-100">
            Master Your Money
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            &quot;Financial freedom is available to those who learn about it and
            work for it. Track every penny, set goals, and watch your wealth
            grow.&quot;
          </p>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <footer className="text-sm text-zinc-400">
              Secure & Confidential
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
