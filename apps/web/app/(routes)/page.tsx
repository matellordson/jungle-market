import Link from "next/link";
<<<<<<< HEAD

export default function Home() {
  return <p>Home page</p>;
=======
import { ConnectWallet } from "../components/homepage/connect-wallet";

export default function Home() {
<<<<<<< HEAD:apps/web/app/(routes)/page.tsx
  return <p>Home page</p>;
=======
  return (
    <div>
      <ConnectWallet />
      <Link href={"/products"}>Products</Link>
    </div>
  );
>>>>>>> 38e672f66aeb9f9cff54258830ad7d5cb8058f8b:apps/web/app/page.tsx
>>>>>>> b7d43f0e09131914f16a66d9936907dbf1e27814
}
