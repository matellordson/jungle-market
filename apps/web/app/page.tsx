import Link from "next/link";
import { Account } from "../../../packages/ui/src/blocks/account";
import ConnectWallet from "../../../packages/ui/src/blocks/connect-wallet";

export default function Home() {
  return (
    <div>
      <ConnectWallet />
      <Account />
      <Link href={"/products"}>Products</Link>
    </div>
  );
}
