import { corsHeaders } from ".";
import { sql } from "../client/neon";

type Request = {
  params: {
    id: string;
  };
};

export const tablePropertiesRoute = {
  "/table-properties/tags/:id": async (req: Request) => {
    try {
      const [data] =
        await sql`SELECT properties->'essentials'->'tags' AS tags FROM table_properties WHERE store = ${req.params.id}`;
      return Response.json(data, { status: 200, headers: corsHeaders });
    } catch {
      return Response.json(null, { status: 200, headers: corsHeaders });
    }
  },
};
