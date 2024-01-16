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
  setUrl,
  setImageUrl,
}: {
  partykitHost: string;
  url: string | null;
  setUrl: (url: string | null) => void;
  setImageUrl: (imageUrl: string | null) => void;
}) {
  const { images } = suspend(async () => {
    if (!url) return { images: [] };
    return await fetchImageList(partykitHost, url);
  }, [url]);

  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <div>
        <button
          className="text-sm text-black/70 underline"
          onClick={() => {
            setUrl(null);
            setImageUrl(null);
          }}
        >
          &larr; Back
        </button>
      </div>
      <h3 className="text-2xl font-semibold">Images</h3>
      <p className="text-xs text-black/70">
        <span className="font-semibold">From URL:</span> <code>{url}</code>
      </p>
      <div className="flex flex-row flex-wrap gap-4">
        {images.map((imageUrl: string) => (
          <div
            key={imageUrl}
            className="flex flex-col gap-2 justify-start items-start"
          >
            <img src={imageUrl} style={{ height: "200px", width: "auto" }} />
            <button
              className="bg-blue-300 hover:bg-blue-400 p-2 rounded-sm"
              onClick={() => setImageUrl(imageUrl)}
            >
              Describe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
