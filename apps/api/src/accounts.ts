import { corsHeaders } from ".";
import { sql } from "bun";

type BunRequest = {
  params: {
    id: string;
  };
};

interface ConnectWalletBody {
  address: string;
}

interface roleBody {
  role: string;
}

export const accountRoute = {
  "/create-account": {
    POST: async (req: Request) => {
      const body = (await req.json()) as ConnectWalletBody;
      const { address } = body;
      await sql`INSERT INTO accounts (address) VALUES (${address})`;
      return Response.json(body, { status: 201, headers: corsHeaders });
    },
    OPTIONS: () => {
      return new Response(null, { status: 204, headers: corsHeaders });
    },
  },
  "/check-account/:id": async (req: BunRequest) => {
    try {
      const data =
        await sql`SELECT address FROM accounts WHERE address = ${req.params.id} LIMIT 1`;
      if (data.length > 0) {
        return Response.json(
          { exist: true },
          { status: 200, headers: corsHeaders }
        );
      } else {
        return Response.json(
          { exist: false },
          { status: 200, headers: corsHeaders }
        );
      }
    } catch {
      return Response.json(
        { exist: false },
        { status: 200, headers: corsHeaders }
      );
    }
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
  "/switch-role/:id": {
    PUT: async (req: Request & { params: { id: string } }) => {
      try {
        const body = (await req.json()) as roleBody;
        const { role } = body;
        const { id } = req.params;
        await sql`UPDATE accounts SET role = ${role.toLowerCase()} WHERE address = ${id}`;
        return Response.json(body, { status: 200, headers: corsHeaders });
      } catch {
        return Response.json(null, { status: 200, headers: corsHeaders });
      }
    },
    OPTIONS: () => {
      return new Response(null, { status: 204, headers: corsHeaders });
    },
  },
};
