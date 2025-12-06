import Link from "next/link";
import { Zap, Shield, TrendingUp, ArrowRight, Sparkles, DollarSign, Lock } from "lucide-react";

export default function DataStreamsLanding() {
  return (
    <main className="min-h-screen bg-black text-zinc-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-sm text-purple-300 border border-purple-500/20">
              <Sparkles className="h-4 w-4" />
              Own Data. Earn Rewards.
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl mb-6">
              DataStreams NFTs
            </h1>
            <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              Claim social media profiles as NFTs and earn passive income when developers query your data streams. Turn content into assets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/claim"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-primary px-8 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90 shadow-lg shadow-purple-500/30"
              >
                Connect Wallet <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-white/10"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/10 bg-white/5 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">15.2M</div>
              <div className="text-sm text-zinc-400 uppercase tracking-wider">Total Value Locked</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">12.4K</div>
              <div className="text-sm text-zinc-400 uppercase tracking-wider">Active Claims</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">892</div>
              <div className="text-sm text-zinc-400 uppercase tracking-wider">Fulfilled Today</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">$2.4K</div>
              <div className="text-sm text-zinc-400 uppercase tracking-wider">Avg. Monthly Earnings</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How DataStreams Works</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Three simple steps to start earning from your claimed data streams
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative rounded-xl border border-white/10 bg-white/5 p-8">
              <div className="absolute -top-4 left-8 inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-sm font-bold text-white">
                1
              </div>
              <div className="mb-4 inline-flex rounded-lg bg-[#5800C3]/20 p-3">
                <Zap className="h-8 w-8 text-[#C2C4F9]" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">Claim a Profile</h3>
              <p className="text-zinc-400">
                Search for any Twitter, YouTube, Instagram, LinkedIn, or TikTok profile. First come, first served - claim high-value accounts early.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-xl border border-white/10 bg-white/5 p-8">
              <div className="absolute -top-4 left-8 inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-sm font-bold text-white">
                2
              </div>
              <div className="mb-4 inline-flex rounded-lg bg-[#5800C3]/20 p-3">
                <Lock className="h-8 w-8 text-[#C2C4F9]" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">Mint Your NFT</h3>
              <p className="text-zinc-400">
                Smart contracts verify ownership and mint a unique NFT representing your data stream. One profile per NFT, secured on the blockchain.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-xl border border-white/10 bg-white/5 p-8">
              <div className="absolute -top-4 left-8 inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-sm font-bold text-white">
                3
              </div>
              <div className="mb-4 inline-flex rounded-lg bg-[#5800C3]/20 p-3">
                <DollarSign className="h-8 w-8 text-[#C2C4F9]" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">Earn Passively</h3>
              <p className="text-zinc-400">
                Receive a percentage of API fees every time developers query data from your claimed stream. Watch your earnings grow automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-8">
              <Shield className="mb-4 h-8 w-8 text-[#C2C4F9]" />
              <h3 className="mb-3 text-xl font-semibold text-white">Verified Ownership</h3>
              <p className="text-zinc-400">
                Smart contracts ensure only one person can claim each profile. Your ownership is cryptographically secured on the blockchain.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-8">
              <TrendingUp className="mb-4 h-8 w-8 text-[#C2C4F9]" />
              <h3 className="mb-3 text-xl font-semibold text-white">Real-Time Earnings</h3>
              <p className="text-zinc-400">
                Track your earnings in real-time. See exactly how much you&apos;re earning from each claimed stream in your dashboard.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-8">
              <Sparkles className="mb-4 h-8 w-8 text-[#C2C4F9]" />
              <h3 className="mb-3 text-xl font-semibold text-white">Trade on Marketplace</h3>
              <p className="text-zinc-400">
                List your NFTs for sale on our marketplace. Transfer ownership and let others earn from your claimed streams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20 p-12 text-center shadow-2xl shadow-purple-500/10">
            <h2 className="mb-4 text-4xl font-bold text-white">Ready to Start Earning?</h2>
            <p className="mb-8 text-xl text-zinc-400 max-w-2xl mx-auto">
              Connect your wallet and claim your first data stream today. Turn social media content into passive income.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/claim"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-black transition-colors hover:bg-zinc-200"
              >
                Connect Wallet <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-white/10"
              >
                Browse Marketplace
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

