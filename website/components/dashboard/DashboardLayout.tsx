"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clsx } from "clsx";
import {
  LayoutDashboard,
  Terminal,
  Key,
  FileText,
  CreditCard,
  Receipt,
  User,
  Mail,
  LogOut,
  ChevronLeft,
  TrendingUp,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "MCP", href: "/dashboard/mcp", icon: Terminal },
  { label: "API Keys", href: "/dashboard/api-keys", icon: Key },
  { label: "Docs", href: "/dashboard/docs", icon: FileText },
  { label: "Top-up", href: "/dashboard/top-up", icon: CreditCard },
  { label: "Billing", href: "/dashboard/billing", icon: Receipt },
  { label: "Account", href: "/dashboard/account", icon: User },
  { label: "Contact", href: "/dashboard/contact", icon: Mail },
  { label: "Demand", href: "/dashboard/demand", icon: TrendingUp },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, developer } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed left-0 top-0 z-40 h-screen border-r border-white/10 bg-[#0f0f0f] transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#5800C3] to-[#8B5CF6] flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-semibold text-white">ContextAPI.com</span>
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
          >
            <ChevronLeft
              className={clsx(
                "h-4 w-4 transition-transform",
                isCollapsed && "rotate-180"
              )}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
          {!isCollapsed && developer && (
            <a
              href="https://contextapi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-xs text-gray-500 hover:text-gray-400 px-3"
            >
              https://contextapi.com
            </a>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main
        className={clsx(
          "flex-1 transition-all duration-300",
          isCollapsed ? "ml-16" : "ml-64"
        )}
      >
        {children}
      </main>
    </div>
  );
}
