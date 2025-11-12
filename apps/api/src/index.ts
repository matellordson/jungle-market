import { sql } from "../client/neon";

const server = Bun.serve({
  port: 8080,
  routes: {
    "/products": async () => {
      const data = await sql`SELECT * FROM product`;
      return Response.json(data);
    },
  },
});
