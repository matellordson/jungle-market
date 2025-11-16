import { sql } from "../client/neon";

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
  },
});
