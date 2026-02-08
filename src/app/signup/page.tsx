import type { Metadata } from "next";
import Link from "next/link";
import { UserAuthForm } from "@/components/auth/user-auth-form";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Sign Up | Budget Tracker",
  description: "Create your account and start managing your finances",
};

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen relative overflow-hidden">
        {/* Decorative Background Bubbles */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-ruby/20 rounded-full opacity-60 blur-3xl" />
          <div className="absolute top-40 left-20 w-96 h-96 bg-crimson/20 rounded-full opacity-60 blur-3xl" />
          <div className="absolute bottom-20 right-1/3 w-80 h-80 bg-primary/20 rounded-full opacity-60 blur-3xl" />
        </div>

        <div className="container mx-auto px-6 min-h-screen flex items-center justify-center py-20">
          <div className="max-w-lg w-full">
            {/* Signup Card */}
            <div className="p-10 rounded-2xl border border-border bg-card shadow-2xl">
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-3xl font-semibold tracking-tight">
                    Create an account
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Start your journey to financial freedom
                  </p>
                </div>

                <UserAuthForm />

                <p className="px-4 text-center text-xs text-muted-foreground">
                  By continuing, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="underline underline-offset-4 hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="underline underline-offset-4 hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">
                    Already have an account?{" "}
                  </span>
                  <Link
                    href="/login"
                    className="font-medium text-primary hover:underline"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
