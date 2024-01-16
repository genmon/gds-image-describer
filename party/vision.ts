import type * as Party from "partykit/server";
import OpenAI from "openai";

export default class VisionServer implements Party.Server {
  openai: any;
  constructor(public room: Party.Room) {
    this.openai = new OpenAI({ apiKey: room.env.OPENAI_API_KEY as string });
  }

  async onRequest(req: Party.Request) {
    const url = new URL(req.url);
    if (req.method === "POST") {
      if (url.pathname.endsWith("/images")) {
        const data = (await req.json()) as any;
        const response = {
          images: await this.fetchImageUrls(data.url),
        };
        return Response.json(response);
      } else if (url.pathname.endsWith("/describe")) {
        const data = (await req.json()) as any;
        const description = await this.describeImage(data.imageUrl);
        return Response.json({ description });
      }
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

  async describeImage(url: string) {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Describe this image for a web user with limited sight. Maximum 12 words",
            },
            {
              type: "image_url",
              image_url: { url, detail: "auto" },
            },
          ],
        },
      ],
    });
    console.log(response.choices[0]);
    return response.choices[0].message.content;
  }
}
