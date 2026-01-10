"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { url } from "../../utils/url";

export default function AuthenticatedRoutesLayout({
  client,
  store,
}: Readonly<{
  client: React.ReactNode;
  store: React.ReactNode;
}>) {
  const [role, setRole] = useState();
  const { address } = useAccount();
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      const roleApi = await fetch(`${url}/accounts/${address}`);
      const roleData = await roleApi.json();
      setRole(roleData[0].role);
      setRoleLoading(false);
    };
    checkRole();
  }, [address]);
  return (
    <div>
      {roleLoading ? "Loading..." : <> {role == "buyer" ? client : store}</>}

      {/* TODO: create an anonymous route where you can showcase with authenication */}
    </div>
  );
}
