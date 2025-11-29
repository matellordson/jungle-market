import { sql } from "../client/neon";
import { accountRoute } from "./accounts";
import { connectWalletRoute } from "./connect-wallet";
import { storeRoutes } from "./stores";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const server = Bun.serve({
  port: 8080,
  routes: {},
});
