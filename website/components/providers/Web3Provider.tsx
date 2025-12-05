"use client";

import { type ReactNode, useEffect, useState, createContext, useContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Set up queryClient
const queryClient = new QueryClient();

// Context to share AppKit initialization state
interface AppKitContextType {
  isReady: boolean;
}

const AppKitContext = createContext<AppKitContextType>({ isReady: false });

export function useAppKitReady() {
  return useContext(AppKitContext);
}

// Initialize AppKit only on client side
let initialized = false;

async function initAppKit(): Promise<boolean> {
  if (initialized || typeof window === "undefined") return initialized;

  const { createAppKit } = await import("@reown/appkit/react");
  const { EthersAdapter } = await import("@reown/appkit-adapter-ethers");
  const { bsc } = await import("@reown/appkit/networks");

  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

  if (!projectId) {
    console.warn("WalletConnect Project ID is not defined");
    return false;
  }

  const ethersAdapter = new EthersAdapter();

  createAppKit({
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
    },
    themeMode: "dark",
    themeVariables: {
      "--w3m-accent": "#5800C3",
      "--w3m-border-radius-master": "2px",
    },
  });

  initialized = true;
  return true;
}

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initAppKit().then((success) => setIsReady(success));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppKitContext.Provider value={{ isReady }}>
        {children}
      </AppKitContext.Provider>
    </QueryClientProvider>
  );
}
