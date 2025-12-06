"use client";

import { useState } from "react";
import {
  Wallet, TrendingUp, DollarSign,
  Database, Settings, ArrowRight,
  Twitter, Youtube, Linkedin, Instagram,
  Eye, Edit
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// Mock user data
const USER_DATA = {
  username: "DataCollector",
  walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f9c8a",
  avatarUrl: null,
  joinedDate: "2024-01-15",
  totalClaims: 3,
  totalEarnings: 12450,
  monthlyEarnings: 3200,
  totalQueries: 245000,
  monthlyQueries: 68000,
};

const MY_CLAIMS = [
  {
    id: "1",
    platform: "twitter" as const,
    username: "sama",
    claimedDate: "2024-02-20",
    totalQueries: 67000,
    totalEarnings: 5100,
    dailyQueries: 290,
    dailyEarnings: 45,
    isListed: true,
    listPrice: 3500,
  },
  {
    id: "2",
    platform: "youtube" as const,
    username: "veritasium",
    claimedDate: "2024-03-10",
    totalQueries: 52000,
    totalEarnings: 4900,
    dailyQueries: 220,
    dailyEarnings: 38,
    isListed: false,
    listPrice: null,
  },
  {
    id: "3",
    platform: "linkedin" as const,
    username: "satyanadella",
    claimedDate: "2024-04-05",
    totalQueries: 45000,
    totalEarnings: 3200,
    dailyQueries: 180,
    dailyEarnings: 28,
    isListed: true,
    listPrice: 2500,
  },
];

const PlatformIcon = ({ platform }: { platform: string }) => {
  const iconClass = "h-5 w-5";
  switch (platform) {
    case "twitter": return <Twitter className={`${iconClass} text-blue-400`} />;
    case "youtube": return <Youtube className={`${iconClass} text-red-500`} />;
    case "linkedin": return <Linkedin className={`${iconClass} text-blue-600`} />;
    case "instagram": return <Instagram className={`${iconClass} text-pink-500`} />;
    default: return null;
  }
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"claims" | "earnings">("claims");

  return (
    <main className="min-h-screen bg-black text-zinc-100 p-8 selection:bg-[#5800C3]/30">
      {/* Header with Profile */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold">
              {USER_DATA.username[0]}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{USER_DATA.username}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Wallet className="h-3 w-3 text-zinc-500" />
                <span className="text-sm text-zinc-400 font-mono">{USER_DATA.walletAddress}</span>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors">
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-500 uppercase tracking-wider">Total Earnings</span>
              <DollarSign className="h-5 w-5 text-[#C2C4F9]" />
            </div>
            <div className="text-3xl font-bold text-white">{USER_DATA.totalEarnings.toLocaleString()} pts</div>
            <div className="text-xs text-green-400 mt-1">+{USER_DATA.monthlyEarnings} this month</div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-500 uppercase tracking-wider">My Claims</span>
              <Database className="h-5 w-5 text-[#C2C4F9]" />
            </div>
            <div className="text-3xl font-bold text-white">{USER_DATA.totalClaims}</div>
            <div className="text-xs text-zinc-400 mt-1">Active streams</div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-500 uppercase tracking-wider">Total Queries</span>
              <Eye className="h-5 w-5 text-[#C2C4F9]" />
            </div>
            <div className="text-3xl font-bold text-white">{(USER_DATA.totalQueries / 1000).toFixed(1)}K</div>
            <div className="text-xs text-green-400 mt-1">+{(USER_DATA.monthlyQueries / 1000).toFixed(1)}K this month</div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-500 uppercase tracking-wider">Avg. Daily</span>
              <TrendingUp className="h-5 w-5 text-[#C2C4F9]" />
            </div>
            <div className="text-3xl font-bold text-white">{Math.floor(USER_DATA.monthlyQueries / 30).toLocaleString()}</div>
            <div className="text-xs text-zinc-400 mt-1">Queries per day</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab("claims")}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === "claims" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            My Claims
            {activeTab === "claims" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5800C3]"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("earnings")}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === "earnings" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Earnings Analytics
            {activeTab === "earnings" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5800C3]"
              />
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "claims" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MY_CLAIMS.map((claim, index) => (
              <motion.div
                key={claim.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-xl border border-white/10 bg-[#0A0A0A] overflow-hidden hover:border-[#5800C3]/50 transition-all"
              >
                {/* Header */}
                <div className="relative h-32 bg-gradient-to-br from-[#5800C3]/20 to-[#C2C4F9]/20 flex items-center justify-center border-b border-white/10">
                  <PlatformIcon platform={claim.platform} />
                  {claim.isListed && (
                    <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-green-500/20 border border-green-500/50 text-xs text-green-300">
                      Listed
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">@{claim.username}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-zinc-400 capitalize">
                      {claim.platform}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Total Queries:</span>
                      <span className="text-white font-semibold">{claim.totalQueries.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Total Earnings:</span>
                      <span className="text-[#C2C4F9] font-semibold">{claim.totalEarnings} pts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Daily Avg:</span>
                      <span className="text-zinc-300">{claim.dailyQueries} queries</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-white/10">
                    {claim.isListed ? (
                      <>
                        <button className="flex-1 px-3 py-2 rounded-lg bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-colors">
                          Unlist
                        </button>
                        <div className="flex-1 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium text-center">
                          {claim.listPrice} pts
                        </div>
                      </>
                    ) : (
                      <button className="flex-1 px-3 py-2 rounded-lg bg-gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity">
                        List for Sale
                      </button>
                    )}
                    <button className="px-3 py-2 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Add New Claim Card */}
            <Link
              href="/claim"
              className="group rounded-xl border border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center min-h-[300px] hover:border-[#5800C3]/50 hover:bg-white/10 transition-all"
            >
              <div className="h-12 w-12 rounded-full bg-[#5800C3]/20 flex items-center justify-center mb-4 group-hover:bg-[#5800C3]/30 transition-colors">
                <Database className="h-6 w-6 text-[#C2C4F9]" />
              </div>
              <span className="text-white font-semibold mb-2">Claim New Stream</span>
              <span className="text-sm text-zinc-500">Browse open requests</span>
              <ArrowRight className="h-4 w-4 text-zinc-500 mt-2 group-hover:text-[#C2C4F9] transition-colors" />
            </Link>
          </div>
        )}

        {activeTab === "earnings" && (
          <div className="space-y-6">
            {/* Earnings Chart Placeholder */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Earnings Overview</h3>
                <select className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5800C3]">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                </select>
              </div>
              
              {/* Mock Chart */}
              <div className="h-64 flex items-end justify-between gap-2">
                {[120, 180, 150, 220, 190, 280, 340].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}px` }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="w-full bg-gradient-to-t from-[#5800C3] to-[#C2C4F9] rounded-t-lg"
                    />
                    <span className="text-xs text-zinc-600">Day {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Per-Stream Breakdown */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-white mb-6">Earnings by Stream</h3>
              <div className="space-y-4">
                {MY_CLAIMS.map((claim) => (
                  <div key={claim.id} className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center">
                        <PlatformIcon platform={claim.platform} />
                      </div>
                      <div>
                        <div className="font-semibold text-white">@{claim.username}</div>
                        <div className="text-xs text-zinc-500">{claim.dailyQueries} queries/day</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#C2C4F9]">{claim.totalEarnings} pts</div>
                      <div className="text-xs text-green-400">+{claim.dailyEarnings} today</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
    </main>
  );
}

