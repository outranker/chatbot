import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: number };
    admin: { id: number };
    adminRefreshToken: { id: number };
  }
}
