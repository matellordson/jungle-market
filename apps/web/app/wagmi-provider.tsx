"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider as Wagmi } from "wagmi";
import { config } from "../wagmi/config";

const queryClient = new QueryClient();

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return (
    <Wagmi config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Wagmi>
  );
}
