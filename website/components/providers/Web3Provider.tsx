"use client";

import { type ReactNode, useEffect, useState, createContext, useContext, useCallback, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Set up queryClient
const queryClient = new QueryClient();

// Context to share AppKit state and methods
interface AppKitContextType {
  isReady: boolean;
  openModal: () => Promise<void>;
  address: string | null;
  isConnected: boolean;
  getProvider: () => Promise<import("ethers").BrowserProvider | null>;
}

const AppKitContext = createContext<AppKitContextType>({
  isReady: false,
  openModal: async () => {},
  address: null,
  isConnected: false,
  getProvider: async () => null,
});

export function useWallet() {
  return useContext(AppKitContext);
}

// Keep for backwards compatibility
export function useAppKitReady() {
  const { isReady } = useContext(AppKitContext);
  return { isReady };
}

type AppKitType = ReturnType<typeof import("@reown/appkit/react").createAppKit>;

// Store appKit instance globally
let appKitInstance: AppKitType | null = null;
let initialized = false;
let stateListeners: Array<(address: string | undefined, isConnected: boolean) => void> = [];

async function initAppKit(): Promise<AppKitType | null> {
  if (initialized || typeof window === "undefined") return appKitInstance;

  const { createAppKit } = await import("@reown/appkit/react");
  const { EthersAdapter } = await import("@reown/appkit-adapter-ethers");
  const { bscTestnet } = await import("@reown/appkit/networks");

  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

  if (!projectId) {
    console.warn("WalletConnect Project ID is not defined");
    return null;
  }

  const ethersAdapter = new EthersAdapter();

  appKitInstance = createAppKit({
    adapters: [ethersAdapter],
    projectId,
    networks: [bscTestnet],
    defaultNetwork: bscTestnet,
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

  // Subscribe to state changes
  appKitInstance.subscribeState((state) => {
    const addr = state.selectedNetworkId ? appKitInstance?.getAddress() : undefined;
    const connected = !!addr;
    stateListeners.forEach(listener => listener(addr, connected));
  });

  initialized = true;
  return appKitInstance;
}

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const listenerRef = useRef<((addr: string | undefined, connected: boolean) => void) | null>(null);

  useEffect(() => {
    initAppKit().then((kit) => {
      setIsReady(true);
      // Check initial state
      if (kit) {
        const addr = kit.getAddress();
        const connected = !!addr;
        setIsConnected(connected);
        setAddress(addr || null);
      }
    });
  }, []);

  // Subscribe to AppKit state changes
  useEffect(() => {
    if (!isReady) return;

    const listener = (addr: string | undefined, connected: boolean) => {
      setAddress(addr || null);
      setIsConnected(connected);
    };

    listenerRef.current = listener;
    stateListeners.push(listener);

    return () => {
      stateListeners = stateListeners.filter(l => l !== listener);
    };
  }, [isReady]);

  const openModal = useCallback(async () => {
    if (appKitInstance) {
      await appKitInstance.open();
    }
  }, []);

  const getProvider = useCallback(async () => {
    if (!appKitInstance || !isConnected) return null;
    try {
      const walletProvider = appKitInstance.getWalletProvider();
      if (!walletProvider) return null;
      const { BrowserProvider } = await import("ethers");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return new BrowserProvider(walletProvider as any);
    } catch {
      return null;
    }
  }, [isConnected]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppKitContext.Provider value={{ isReady, openModal, address, isConnected, getProvider }}>
        {children}
      </AppKitContext.Provider>
    </QueryClientProvider>
  );
}
