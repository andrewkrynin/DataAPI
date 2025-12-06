"use client";

import { useState } from "react";
import {
  Wallet, Key, Shield, Bell, Trash2,
  Save, Camera, Moon, Sun, Settings, Link as LinkIcon
} from "lucide-react";
import { motion } from "framer-motion";

export default function NFTAccountPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [saleNotifications, setSaleNotifications] = useState(true);
  const [claimAlerts, setClaimAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  return (
    <main className="min-h-screen bg-black text-zinc-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
          <p className="text-zinc-400">Manage your profile, wallet, and preferences</p>
        </div>

        {/* Wallet & Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Wallet className="h-5 w-5 text-[#C2C4F9]" />
            <h2 className="text-xl font-semibold text-white">Wallet & Profile</h2>
          </div>

          <div className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold">
                  D
                </div>
                <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-[#5800C3] flex items-center justify-center border-2 border-black hover:bg-[#6800E3] transition-colors">
                  <Camera className="h-4 w-4 text-white" />
                </button>
              </div>
              <div>
                <h3 className="text-white font-semibold">DataCollector</h3>
                <p className="text-sm text-zinc-400">Member since Jan 2024</p>
              </div>
            </div>

            {/* Wallet Address */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Connected Wallet
              </label>
              <div className="flex items-center gap-3 p-4 bg-black/50 border border-white/10 rounded-lg">
                <Wallet className="h-5 w-5 text-green-400" />
                <span className="flex-1 text-white font-mono text-sm">
                  0x742d35Cc6634C0532925a3b844Bc9e7595f9c8a
                </span>
                <button className="px-3 py-1.5 rounded-lg bg-white/5 text-white text-sm hover:bg-white/10 transition-colors">
                  Disconnect
                </button>
              </div>
            </div>

            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Display Name
              </label>
              <input
                type="text"
                defaultValue="DataCollector"
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#5800C3]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#5800C3]"
              />
              <p className="mt-2 text-xs text-zinc-500">
                Used for notifications and important updates
              </p>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Bio (Optional)
              </label>
              <textarea
                placeholder="Tell us about yourself..."
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#5800C3] resize-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Social Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <LinkIcon className="h-5 w-5 text-[#C2C4F9]" />
            <h2 className="text-xl font-semibold text-white">Social Links</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Twitter / X
              </label>
              <input
                type="text"
                placeholder="@username"
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#5800C3]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Website
              </label>
              <input
                type="url"
                placeholder="https://yoursite.com"
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#5800C3]"
              />
            </div>
          </div>
        </motion.div>

        {/* Security Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Shield className="h-5 w-5 text-[#C2C4F9]" />
            <h2 className="text-xl font-semibold text-white">Security</h2>
          </div>

          <div className="space-y-4">
            {/* Backup Wallet */}
            <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/5">
              <div className="flex items-center gap-3">
                <Wallet className="h-5 w-5 text-zinc-400" />
                <div>
                  <h3 className="text-white font-medium">Backup Wallet</h3>
                  <p className="text-sm text-zinc-400">Add a recovery wallet address</p>
                </div>
              </div>
              <button className="px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors">
                Add
              </button>
            </div>

            {/* Password Protection */}
            <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/5">
              <div className="flex items-center gap-3">
                <Key className="h-5 w-5 text-zinc-400" />
                <div>
                  <h3 className="text-white font-medium">Password Protection</h3>
                  <p className="text-sm text-zinc-400">Require password for transactions</p>
                </div>
              </div>
              <button className="px-4 py-2 rounded-lg bg-gradient-primary text-white hover:opacity-90 transition-opacity">
                Enable
              </button>
            </div>

            {/* Transaction History */}
            <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/5">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-zinc-400" />
                <div>
                  <h3 className="text-white font-medium">Transaction History</h3>
                  <p className="text-sm text-zinc-400">View all blockchain transactions</p>
                </div>
              </div>
              <button className="px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors">
                View
              </button>
            </div>
          </div>
        </motion.div>

        {/* Notifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Bell className="h-5 w-5 text-[#C2C4F9]" />
            <h2 className="text-xl font-semibold text-white">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/5">
              <div>
                <h3 className="text-white font-medium">NFT Sales & Offers</h3>
                <p className="text-sm text-zinc-400">Get notified of new offers and sales</p>
              </div>
              <button
                onClick={() => setSaleNotifications(!saleNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  saleNotifications ? "bg-[#5800C3]" : "bg-zinc-700"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    saleNotifications ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/5">
              <div>
                <h3 className="text-white font-medium">Claim Activity</h3>
                <p className="text-sm text-zinc-400">Updates on your data stream claims</p>
              </div>
              <button
                onClick={() => setClaimAlerts(!claimAlerts)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  claimAlerts ? "bg-[#5800C3]" : "bg-zinc-700"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    claimAlerts ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/5">
              <div>
                <h3 className="text-white font-medium">Marketing & Updates</h3>
                <p className="text-sm text-zinc-400">New features and promotions</p>
              </div>
              <button
                onClick={() => setMarketingEmails(!marketingEmails)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  marketingEmails ? "bg-[#5800C3]" : "bg-zinc-700"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    marketingEmails ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Preferences Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Settings className="h-5 w-5 text-[#C2C4F9]" />
            <h2 className="text-xl font-semibold text-white">Preferences</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Theme
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    theme === "dark"
                      ? "bg-[#5800C3] text-white"
                      : "bg-white/5 text-zinc-400 hover:bg-white/10"
                  }`}
                >
                  <Moon className="h-4 w-4" />
                  Dark
                </button>
                <button
                  onClick={() => setTheme("light")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    theme === "light"
                      ? "bg-[#5800C3] text-white"
                      : "bg-white/5 text-zinc-400 hover:bg-white/10"
                  }`}
                >
                  <Sun className="h-4 w-4" />
                  Light
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Default Currency Display
              </label>
              <select className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#5800C3]">
                <option>Points (pts)</option>
                <option>ETH</option>
                <option>USD</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Trash2 className="h-5 w-5 text-red-400" />
            <h2 className="text-xl font-semibold text-white">Danger Zone</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Delete Account</h3>
                <p className="text-sm text-zinc-400">Permanently delete your account. NFTs will remain on blockchain.</p>
              </div>
              <button className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <button className="px-6 py-3 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors">
            Cancel
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-primary text-white hover:opacity-90 transition-opacity">
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>
    </main>
  );
}
