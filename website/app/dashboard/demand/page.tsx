"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  Search,
  Users,
  BarChart3,
  ArrowUpRight,
  ExternalLink,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { demandApi } from "@/lib/api";
import type { DemandEntry, DemandDetailResponse } from "@/types/api";
import { clsx } from "clsx";
import { useNFTMint } from "@/hooks/useNFTMint";
import { useWallet } from "@/components/providers/Web3Provider";
import { BSC_TESTNET } from "@/lib/contracts/DataOwnershipNFT";

export default function DemandPage() {
  const [leaderboard, setLeaderboard] = useState<DemandEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<DemandDetailResponse | null>(
    null
  );
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20;

  // NFT minting
  const { openModal, address, isConnected } = useWallet();
  const { mint, isLoading: isMinting, error: mintError, txHash, success: mintSuccess, reset: resetMint } = useNFTMint();

  useEffect(() => {
    fetchLeaderboard();
  }, [offset]);

  async function fetchLeaderboard() {
    setIsLoading(true);
    try {
      const response = await demandApi.getLeaderboard({
        limit,
        offset,
      });
      setLeaderboard(response.leaderboard || []);
      // Check if there's more data
      setHasMore((response.leaderboard?.length || 0) >= limit);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchUserDetail(username: string) {
    setIsLoadingDetail(true);
    try {
      const response = await demandApi.getUserDemand(username);
      setSelectedUser(response);
    } catch (err) {
      console.error("Error fetching user detail:", err);
    } finally {
      setIsLoadingDetail(false);
    }
  }

  const filteredLeaderboard = searchQuery
    ? leaderboard.filter((entry) =>
      entry.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : leaderboard;

  function getRankBadge(rank: number) {
    if (rank === 1) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    if (rank === 2) return "bg-gray-400/20 text-gray-300 border-gray-400/30";
    if (rank === 3) return "bg-amber-600/20 text-amber-400 border-amber-600/30";
    return "bg-white/5 text-gray-400 border-white/10";
  }

  const handleMint = async () => {
    if (!selectedUser) return;

    // If not connected, open wallet modal
    if (!isConnected) {
      openModal();
      return;
    }

    // Reset previous state
    resetMint();

    // Build target URL for the NFT
    const platform = selectedUser.platform.toLowerCase();
    const targetUrl = `https://${platform === "x" ? "x" : platform}.com/${selectedUser.username}`;

    await mint(targetUrl);
  };


  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0a0a0a] px-8 py-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Demand Marketplace</h1>
          <p className="mt-1 text-sm text-gray-400">
            See which creators are most requested by the community
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-white/10 bg-[#111111]">
              {/* Toolbar */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <h2 className="text-lg font-semibold text-white">
                  Demand Leaderboard
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search username..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-9 w-64 rounded-lg border border-white/10 bg-white/5 pl-9 pr-4 text-sm text-white placeholder-gray-500 focus:border-[#5800C3]/50 focus:outline-none focus:ring-1 focus:ring-[#5800C3]/50"
                  />
                </div>
              </div>

              {/* Table */}
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                </div>
              ) : filteredLeaderboard.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                  <TrendingUp className="h-12 w-12 mb-4 opacity-50" />
                  <p className="font-medium">No demand data yet</p>
                  <p className="text-sm mt-1">
                    Request creators to see them appear here
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {filteredLeaderboard.map((entry) => (
                    <button
                      key={`${entry.username}-${entry.platform}`}
                      onClick={() => fetchUserDetail(entry.username)}
                      className="flex w-full items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors text-left"
                    >
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div
                          className={clsx(
                            "flex h-8 w-8 items-center justify-center rounded-lg border text-sm font-bold",
                            getRankBadge(entry.rank)
                          )}
                        >
                          {entry.rank}
                        </div>

                        {/* User Info */}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">
                              @{entry.username}
                            </span>
                            <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-gray-400">
                              {entry.platform}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-3 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {entry.uniqueRequesters} requesters
                            </span>
                            <span className="flex items-center gap-1">
                              <BarChart3 className="h-3 w-3" />
                              {entry.totalRequests} requests
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-lg font-semibold text-white">
                            {entry.totalRequests.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            total requests
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-gray-500" />
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {(offset > 0 || hasMore) && leaderboard.length > 0 && (
                <div className="flex items-center justify-between border-t border-white/10 px-6 py-3">
                  <div className="text-sm text-gray-400">
                    Showing {offset + 1} - {offset + leaderboard.length}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setOffset((o) => Math.max(0, o - limit))}
                      disabled={offset <= 0}
                      className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setOffset((o) => o + limit)}
                      disabled={!hasMore}
                      className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-white/10 bg-[#111111] sticky top-8">
              {selectedUser ? (
                <>
                  <div className="border-b border-white/10 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">
                        @{selectedUser.username}
                      </h3>
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-gray-400">
                        {selectedUser.platform}
                      </span>
                    </div>
                  </div>

                  {isLoadingDetail ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    </div>
                  ) : (
                    <div className="p-6 space-y-6">
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-white/5 p-4">
                          <div className="text-2xl font-bold text-white">
                            {selectedUser.totalRequests?.toLocaleString() ?? 0}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Total Requests
                          </div>
                        </div>
                        <div className="rounded-lg bg-white/5 p-4">
                          <div className="text-2xl font-bold text-white">
                            {selectedUser.daysWithRequests ?? 0}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Days Active
                          </div>
                        </div>
                        <div className="rounded-lg bg-white/5 p-4">
                          <div className="text-2xl font-bold text-white">
                            {selectedUser.uniqueRequesters}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Unique Requesters
                          </div>
                        </div>
                        <div className="rounded-lg bg-white/5 p-4">
                          <div className="text-sm font-medium text-white">
                            {new Date(
                              selectedUser.lastRequested
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Last Requested
                          </div>
                        </div>
                      </div>

                      {/* History Chart Placeholder */}
                      {selectedUser.history &&
                        selectedUser.history.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-3">
                              Request History
                            </h4>
                            <div className="flex items-end gap-1 h-24">
                              {selectedUser.history
                                .slice(-14)
                                .map((point, index) => (
                                  <div
                                    key={index}
                                    className="flex-1 bg-gradient-to-t from-[#5800C3] to-[#8B5CF6] rounded-t opacity-80"
                                    style={{
                                      height: `${Math.min(
                                        100,
                                        (point.requests /
                                          Math.max(
                                            ...selectedUser.history!.map(
                                              (h) => h.requests
                                            )
                                          )) *
                                        100
                                      )}%`,
                                    }}
                                    title={`${point.date}: ${point.requests} requests`}
                                  />
                                ))}
                            </div>
                          </div>
                        )}

                      {/* Actions */}
                      <a
                        href={`https://${selectedUser.platform.toLowerCase()}.com/${selectedUser.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/5 transition-colors"
                      >
                        View Profile
                        <ExternalLink className="h-4 w-4" />
                      </a>

                      {/* Mint Button */}
                      <button
                        onClick={handleMint}
                        disabled={isMinting}
                        className={clsx(
                          "flex items-center justify-center gap-2 w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors",
                          mintSuccess
                            ? "bg-green-600 hover:bg-green-700"
                            : mintError
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-gradient-to-r from-[#5800C3] to-[#8B5CF6] hover:from-[#6b00e6] hover:to-[#9d6eff]",
                          isMinting && "opacity-70 cursor-not-allowed"
                        )}
                      >
                        {isMinting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Minting...
                          </>
                        ) : mintSuccess ? (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Minted!
                          </>
                        ) : mintError ? (
                          <>
                            <XCircle className="h-4 w-4" />
                            Try Again
                          </>
                        ) : !isConnected ? (
                          "Connect Wallet to Mint"
                        ) : (
                          "Mint as NFT"
                        )}
                      </button>

                      {/* Transaction Link */}
                      {txHash && (
                        <a
                          href={`${BSC_TESTNET.blockExplorer}/tx/${txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
                        >
                          View transaction
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}

                      {/* Error Message */}
                      {mintError && (
                        <p className="text-xs text-red-400 text-center">
                          {mintError}
                        </p>
                      )}

                      {/* Connected Wallet */}
                      {isConnected && address && (
                        <p className="text-xs text-gray-500 text-center truncate">
                          Wallet: {address.slice(0, 6)}...{address.slice(-4)}
                        </p>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-gray-500 px-6">
                  <TrendingUp className="h-10 w-10 mb-3 opacity-50" />
                  <p className="font-medium text-center">
                    Select a creator to view details
                  </p>
                  <p className="text-sm mt-1 text-center">
                    Click on any row in the leaderboard
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
