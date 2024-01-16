import type * as Party from "partykit/server";

export default class VisionServer implements Party.Server {
  constructor(public room: Party.Room) {}

  async onRequest(req: Party.Request) {
    if (req.method === "POST") {
      const response = req;
      return Response.json(response);
    }

    return new Response("Method Not Allowed", { status: 405 });
  }
}
