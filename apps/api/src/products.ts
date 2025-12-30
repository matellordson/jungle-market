import { corsHeaders } from ".";
import { sql } from "../client/neon";

type GetRequest = {
  params: {
    id: string;
  };
};

interface ProductValues {
  name: string;
  store_id: string;
}

const pluginData = {
  metadata: {},
};

export const productRoute = {
  "/products/name/:id": async (req: GetRequest) => {
    try {
      const data =
        await sql`SELECT name FROM products WHERE store_id = ${req.params.id} ORDER BY created_at DESC`;
      return Response.json(data, { status: 200, headers: corsHeaders });
    } catch {
      return Response.json(null, { status: 200, headers: corsHeaders });
    }
  },
  "/products/new": {
    POST: async (req: Request) => {
      try {
        const body = (await req.json()) as ProductValues;
        const { name, store_id } = body;
        await sql`INSERT INTO products (name, store_id, plugins) VALUES (${name}, ${store_id}, ${pluginData})`;
        return Response.json(body, { status: 201, headers: corsHeaders });
      } catch (error) {
        console.log(error);
      }
    },
    OPTIONS: () => {
      return new Response(null, { status: 204, headers: corsHeaders });
    },
  },
};
