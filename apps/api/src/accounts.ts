import { corsHeaders } from ".";
import { sql } from "../client/db";

type BunRequest = {
  params: {
    id: string;
  };
};

interface ConnectWalletBody {
  address: string;
  role: string;
}

export const accountRoute = {
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
  "/accounts": async () => {
    try {
      const data = await sql`SELECT * FROM accounts`;
      return Response.json(data, { status: 200, headers: corsHeaders });
    } catch {
      return Response.json(null, { status: 200, headers: corsHeaders });
    }
  },
  "/accounts/:id": async (req: BunRequest) => {
    try {
      const data =
        await sql`SELECT * FROM accounts WHERE address = ${req.params.id}`;
      return Response.json(data, { status: 200, headers: corsHeaders });
    } catch {
      return Response.json(null, { status: 200, headers: corsHeaders });
    }
  },
};
