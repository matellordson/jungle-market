import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { metaMask, walletConnect, coinbaseWallet } from "wagmi/connectors";

const projectId = "5017419416780e05e6c302ff89c393ab";

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [metaMask(), walletConnect({ projectId }), coinbaseWallet()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
