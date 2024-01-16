import PartySocket from "partysocket";
import { suspend } from "suspend-react";

async function fetchImageList(partykitHost: string, url: string) {
  const response = await PartySocket.fetch(
    {
      host: partykitHost,
      party: "vision",
      room: "api",
      path: "images",
    },
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    }
  );
  return await response.json();
}

export default function ImageList({
  partykitHost,
  url,
}: {
  partykitHost: string;
  url: string | null;
}) {
  const { images } = suspend(async () => {
    if (!url) return { images: [] };
    return await fetchImageList(partykitHost, url);
  }, [url]);

  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <h3 className="text-2xl font-semibold">Images</h3>
      <p className="text-xs text-black/70">
        <span className="font-semibold">From URL:</span> <code>{url}</code>
      </p>
      <ul className="list-disc">
        {images.map((imageUrl: string) => (
          <li key={imageUrl}>
            <code>{imageUrl}</code>
          </li>
        ))}
      </ul>
    </div>
  );
}
