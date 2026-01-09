import Link from "next/link";

export default function ClientHomepage() {
  return (
    <div>
      <p>Client Homepage</p>
      <Link href={"/switch-role"}>Switch Role</Link>
    </div>
  );
}
