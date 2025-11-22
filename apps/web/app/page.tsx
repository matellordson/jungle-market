import Link from "next/link";
import { ConnectWallet } from "../components/homepage/connect-wallet";

export default function Home() {
  return (
    <div>
      <ConnectWallet />
      <Link href={"/products"}>Products</Link>
    </div>
  );
}
