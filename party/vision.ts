import type * as Party from "partykit/server";

export default class VisionServer implements Party.Server {
  constructor(public room: Party.Room) {}

  async onRequest(req: Party.Request) {
    if (req.method === "POST") {
      const response = {
        images: ["test URL 1", "test URL 2"],
      };
      return Response.json(response);
    }

    return new Response("Method Not Allowed", { status: 405 });
  }
}
