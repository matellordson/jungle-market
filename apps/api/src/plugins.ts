import { corsHeaders } from ".";
import { sql } from "../client/neon";

type Request = {
  params: {
    id: string;
  };
};

const publicJson = {
  public: {
    metadata: {},
    requests: {},
  },
};

export const pluginsRoute = {
  "/plugins/all/:id": async (req: Request) => {
    try {
      const [data] =
        await sql`SELECT jsonb_agg(distinct_keys.plugin_name) AS all_plugins FROM ( SELECT DISTINCT jsonb_object_keys(plugins) AS plugin_name FROM products WHERE id = ${req.params.id}) AS distinct_keys `;
      return Response.json(data, { status: 200, headers: corsHeaders });
    } catch {
      return Response.json(null, { status: 200, headers: corsHeaders });
    }
  },

  // PUBLIC PLUGIN
  "/plugins/public/:id": {
    PUT: async (req: Request) => {
      try {
        const data =
          await sql`UPDATE products SET plugins = plugins || ${publicJson}::jsonb WHERE id = ${req.params.id}`;
        return Response.json(data, { status: 204, headers: corsHeaders });
      } catch {
        return Response.json(null, { status: 200, headers: corsHeaders });
      }
    },
    OPTIONS: () => {
      return new Response(null, { status: 204, headers: corsHeaders });
    },
  },

  // DOCS PLUGIN
  "/plugins/docs/:id": {
    PUT: async (req: Request) => {
      try {
        const data =
          await sql`UPDATE products SET plugins = plugins || '{"docs": {"metadata": {}}}'::jsonb WHERE id = ${req.params.id}`;
        return Response.json(data, { status: 200, headers: corsHeaders });
      } catch (error) {
        console.log(error);
        return Response.json(null, { status: 200, headers: corsHeaders });
      }
    },
    OPTIONS: () => {
      return new Response(null, { status: 204, headers: corsHeaders });
    },
  },
};
