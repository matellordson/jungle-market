import { corsHeaders } from ".";
import { sql } from "../client/neon";

type Request = {
  params: {
    id: string;
  };
};

export const accountRoute = {
  "/accounts/all": async () => {
    const data = await sql`SELECT * FROM accounts`;
    return Response.json(data, { status: 200, headers: corsHeaders });
  },
  // getting wallet address only
  "/accounts/wallet_address/:id": async (req: Request) => {
    const [data] =
      await sql`SELECT (wallet_address) FROM accounts WHERE wallet_address = ${req.params.id}`;
    if (data?.wallet_address) {
      return Response.json(data?.wallet_address, {
        status: 200,
        headers: corsHeaders,
      });
    } else {
      return Response.json(null, {
        status: 200,
        headers: corsHeaders,
      });
    }
  },
};
