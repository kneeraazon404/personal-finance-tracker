"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Wallet,
  ArrowRightLeft,
  Target,
  Tag,
  CalendarClock,
  PieChart,
  Banknote,
} from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Accounts",
    icon: Wallet,
    href: "/accounts",
    color: "text-violet-500",
  },
  {
    label: "Transactions",
    icon: ArrowRightLeft,
    href: "/transactions",
    color: "text-pink-700",
  },
  {
    label: "Goals",
    icon: Target,
    href: "/goals",
    color: "text-orange-700",
  },
  {
    label: "Subscriptions",
    icon: CalendarClock,
    href: "/subscriptions",
    color: "text-emerald-500",
  },
  {
    label: "Categories",
    icon: Tag,
    href: "/categories",
    color: "text-green-700",
  },
  {
    label: "Budgets",
    icon: PieChart,
    href: "/budgets",
    color: "text-red-500",
  },
  {
    label: "Loans",
    icon: Banknote,
    href: "/loans",
    color: "text-indigo-500",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-sidebar border-r border-sidebar-border text-sidebar-foreground">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            FinanceTracker
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-sidebar-accent-foreground hover:bg-sidebar-accent rounded-lg transition",
                pathname === route.href
                  ? "text-sidebar-primary-foreground bg-sidebar-primary hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground"
                  : "text-muted-foreground",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
