import type * as Party from "partykit/server";

export default class VisionServer implements Party.Server {
  constructor(public room: Party.Room) {}

  async onRequest(req: Party.Request) {
    if (req.method === "POST") {
      const data = (await req.json()) as any;
      const response = {
        images: await this.fetchImageUrls(data.url),
      };
      return Response.json(response);
    }

    return new Response("Method Not Allowed", { status: 405 });
  }

  async fetchImageUrls(url: string) {
    const response = await fetch(url);
    const html = await response.text();

    // This is awful but use regexps to get img.src
    // Only inside div.entry-content
    const imgSrcRegex = /<img.*?src="(.*?)"/g;
    const matches = html.matchAll(imgSrcRegex);
    const urls = [];
    for (const match of matches) {
      urls.push(match[1]);
    }

    return urls;
  }
}
