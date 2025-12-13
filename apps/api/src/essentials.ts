import { corsHeaders } from ".";
import { sql } from "../client/neon";

type Request = {
  params: {
    id: string;
  };
};

export const essentialRoute = {
  "/essentials/:id": async (req: Request) => {
    try {
      const data =
        await sql`SELECT * FROM essentials WHERE store = ${req.params.id}`;
      return Response.json(data, { status: 200, headers: corsHeaders });
    } catch {
      return Response.json(null, { status: 200, headers: corsHeaders });
    }
  },
};
