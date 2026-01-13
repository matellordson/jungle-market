import { sql } from "bun";
import { corsHeaders } from ".";

interface StoreInterface {
  name: string;
  owners: string;
}

type BunRequest = {
  params: {
    id: string;
  };
};

export const storeRoutes = {
  "/stores/create": {
    POST: async (req: Request) => {
      const body = (await req.json()) as StoreInterface;
      const { name, owners } = body;
      await sql`INSERT INTO stores (name, owners) VALUES (${name}, ${owners})`;
      return Response.json(body, { status: 201, headers: corsHeaders });
    },
    OPTIONS: () => {
      return Response.json(null, { status: 204, headers: corsHeaders });
    },
  },
  "/stores": async () => {
    const body = await sql`SELECT * FROM stores`;
    return Response.json(body, { status: 200, headers: corsHeaders });
  },
  // Store name is used as filter
  "/stores/name/:id": async (req: BunRequest) => {
    const [body] =
      await sql`SELECT id, name, owner FROM stores WHERE name = ${req.params.id}`;
    return Response.json(body, { status: 200, headers: corsHeaders });
  },
  // Store id is used as filter
  "/stores/:id": async (req: BunRequest) => {
    try {
      const [body] =
        await sql`SELECT * FROM stores WHERE id = ${req.params.id}`;
      return Response.json(body, { status: 200, headers: corsHeaders });
    } catch {
      return Response.json(null, { status: 200, headers: corsHeaders });
    }
  },
  // This route will get the store id by using the owner as a reference
  "/stores/owner/:id": async (req: BunRequest) => {
    try {
      const [body] =
        await sql`SELECT * FROM stores WHERE owner = ${req.params.id}`;
      return Response.json(body, { status: 200, headers: corsHeaders });
    } catch {
      return Response.json(null, { status: 200, headers: corsHeaders });
    }
  },
};
