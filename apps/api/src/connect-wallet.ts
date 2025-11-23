import { corsHeaders } from ".";
import { sql } from "../client/neon";

interface ConnectWalletBody {
  wallet_address: string;
  connector: string;
  role: string;
}

export const connectWalletRoute = {
  "/connect-wallet": {
    POST: async (req: Request) => {
      const body = (await req.json()) as ConnectWalletBody;
      const { wallet_address, connector, role } = body;
      await sql`INSERT INTO accounts (wallet_address, connector, role) VALUES (${wallet_address}, ${connector}, ${role})`;
      return Response.json(body, { status: 201, headers: corsHeaders });
    },
    OPTIONS: () => {
      return new Response(null, { status: 204, headers: corsHeaders });
    },
  },
};
