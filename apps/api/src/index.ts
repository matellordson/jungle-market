import { sql } from "../client/neon";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface ConnectWalletBody {
  wallet_address: string;
  connector: string;
  role: string;
}

const server = Bun.serve({
  port: 8080,
  routes: {
    "/products": async () => {
      const data = await sql`SELECT * FROM products`;
      return Response.json(data);
    },
    "/products/:id": async (req) => {
      const data =
        await sql`SELECT * FROM products WHERE id = ${req.params.id}`;
      return Response.json(data);
    },
    "/connect-wallet": {
      POST: async (req) => {
        const body = (await req.json()) as ConnectWalletBody;
        const { wallet_address, connector, role } = body;
        await sql`INSERT INTO accounts (wallet_address, connector, role) VALUES (${wallet_address}, ${connector}, ${role})`;
        return Response.json(body, { status: 201, headers: corsHeaders });
      },
      OPTIONS: () => {
        return new Response(null, { status: 204, headers: corsHeaders });
      },
    },
  },
});
