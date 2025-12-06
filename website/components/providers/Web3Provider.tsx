"use client";

import { type ReactNode, useEffect, useState, createContext, useContext, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Set up queryClient
const queryClient = new QueryClient();

// Context to share AppKit state and methods
interface AppKitContextType {
  isReady: boolean;
  openModal: () => Promise<void>;
  address: string | null;
  isConnected: boolean;
}

const AppKitContext = createContext<AppKitContextType>({
  isReady: false,
  openModal: async () => {},
  address: null,
  isConnected: false,
});

export function useWallet() {
  return useContext(AppKitContext);
}

// Keep for backwards compatibility
export function useAppKitReady() {
  const { isReady } = useContext(AppKitContext);
  return { isReady };
}

// Store appKit instance globally
let appKitInstance: ReturnType<typeof import("@reown/appkit/react").createAppKit> | null = null;
let initialized = false;

async function initAppKit() {
  if (initialized || typeof window === "undefined") return;

  const { createAppKit } = await import("@reown/appkit/react");
  const { EthersAdapter } = await import("@reown/appkit-adapter-ethers");
  const { bsc } = await import("@reown/appkit/networks");

  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

  if (!projectId) {
    console.warn("WalletConnect Project ID is not defined");
    return;
  }

  const ethersAdapter = new EthersAdapter();

  appKitInstance = createAppKit({
    adapters: [ethersAdapter],
    projectId,
    networks: [bsc],
    defaultNetwork: bsc,
    metadata: {
      name: "DataAPI",
      description: "The Unified Social Media Data API",
      url: typeof window !== "undefined" ? window.location.origin : "https://dataapi.io",
      icons: ["https://dataapi.io/icon.png"],
    },
    features: {
      analytics: true,
      email: false,
      socials: false,
    },
    themeMode: "dark",
    themeVariables: {
      "--w3m-accent": "#5800C3",
      "--w3m-border-radius-master": "2px",
    },
  });

  initialized = true;
}

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    initAppKit().then(() => {
      setIsReady(true);
    });
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (!isReady || typeof window === "undefined") return;

    const checkConnection = async () => {
      const ethereum = window.ethereum as { request: (args: { method: string }) => Promise<string[]> } | undefined;
      if (ethereum) {
        try {
          const accounts = await ethereum.request({ method: "eth_accounts" });
          if (accounts && accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
          } else {
            setAddress(null);
            setIsConnected(false);
          }
        } catch {
          setAddress(null);
          setIsConnected(false);
        }
      }
    };

    checkConnection();

    // Listen for account changes
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setIsConnected(true);
      } else {
        setAddress(null);
        setIsConnected(false);
      }
    };

    const eth = window.ethereum as { on?: (event: string, cb: (accounts: string[]) => void) => void; removeListener?: (event: string, cb: (accounts: string[]) => void) => void } | undefined;
    if (eth?.on) {
      eth.on("accountsChanged", handleAccountsChanged);
    }

    // Poll for changes (backup)
    const interval = setInterval(checkConnection, 2000);

    return () => {
      clearInterval(interval);
      if (eth?.removeListener) {
        eth.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, [isReady]);

  const openModal = useCallback(async () => {
    if (appKitInstance) {
      await appKitInstance.open();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppKitContext.Provider value={{ isReady, openModal, address, isConnected }}>
        {children}
      </AppKitContext.Provider>
    </QueryClientProvider>
  );
}
