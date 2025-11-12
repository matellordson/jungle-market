const server = Bun.serve({
  port: 8080,
  routes: {
    "/home": new Response("Hello"),
  },
});
