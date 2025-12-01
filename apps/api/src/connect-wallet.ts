import { corsHeaders } from ".";
import { sql } from "../client/neon";

interface ConnectWalletBody {
  address: string;
  role: string;
}

export const connectWalletRoute = {
  "/connect-wallet": {
    POST: async (req: Request) => {
      const body = (await req.json()) as ConnectWalletBody;
      const { address, role } = body;
      await sql`INSERT INTO accounts (address,  role) VALUES (${address},  ${role})`;
      return Response.json(body, { status: 201, headers: corsHeaders });
    },
    OPTIONS: () => {
      return new Response(null, { status: 204, headers: corsHeaders });
    },
  },
};
