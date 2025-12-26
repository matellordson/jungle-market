import { corsHeaders } from ".";
import { sql } from "../client/neon";

type Request = {
  params: {
    id: string;
  };
};

export const productRoute = {
  "/products/name/:id": async (req: Request) => {
    try {
      const data =
        await sql`SELECT name FROM products WHERE store_id = ${req.params.id} ORDER BY created_at DESC`;
      return Response.json(data, { status: 200, headers: corsHeaders });
    } catch {
      return Response.json(null, { status: 200, headers: corsHeaders });
    }
  },
};
