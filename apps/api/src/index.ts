import { sql } from "../client/neon";
import { accountRoute } from "./accounts";
import { connectWalletRoute } from "./connect-wallet";
import { storeRoutes } from "./stores";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const server = Bun.serve({
  port: 8080,
<<<<<<< HEAD
  routes: {},
=======
  routes: {
    "/products": async () => {
      const data = await sql`SELECT * FROM products`;
      return Response.json(data);
    },
    "/products/:id": async (req) => {1
      T 
      const data =
        await sql`SELECT * FROM products WHERE id = ${req.params.id}`;
      return Response.json(data);
    },
    ...connectWalletRoute,
    ...accountRoute,
    ...storeRoutes,
  },
>>>>>>> 38e672f66aeb9f9cff54258830ad7d5cb8058f8b
});
