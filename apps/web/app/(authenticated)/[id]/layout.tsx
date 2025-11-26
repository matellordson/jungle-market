"use client";

import { useAccount } from "wagmi";
import { Layout } from "../../../components/layout";
import { useEffect, useState } from "react";
import { url } from "../../../utils/url";
import { Loading } from "../../../components/reusable/loading";

export default function AuthenticatedPage({
  children,
  seller,
  buyer,
}: {
  children: React.ReactNode;
  seller: React.ReactNode;
  buyer: React.ReactNode;
}) {
  const { address } = useAccount();
  const [roleData, setRoleData] = useState();
  const [roleLoading, setRoleLoading] = useState(true);
  useEffect(() => {
    async function GetRole() {
      const res = await fetch(`${url}/accounts/role/${address}`);
      const data = await res.json();
      setRoleData(data);
      setRoleLoading(false);
    }
    GetRole();
  }, [address, setRoleData]);
  return (
    <>
      <Layout
        page={
          <>
            {roleLoading ? (
              <Loading />
            ) : (
              <>
                {"Seller" == roleData ? (
                  <> {seller}</>
                ) : "Buyer" == roleData ? (
                  <> {buyer}</>
                ) : (
                  // TODO: do something when known of them match
                  ""
                )}
              </>
            )}
          </>
        }
      ></Layout>
      {children}
    </>
  );
}
