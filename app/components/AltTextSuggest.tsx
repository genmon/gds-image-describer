import PartySocket from "partysocket";
import { suspend } from "suspend-react";

async function fetchDescription(partykitHost: string, imageUrl: string) {
  const response = await PartySocket.fetch(
    {
      host: partykitHost,
      party: "vision",
      room: "api",
      path: "describe",
    },
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    }
  );
  const { description } = await response.json();
  return description;
}

export default function AltTextSuggest({
  partykitHost,
  imageUrl,
}: {
  partykitHost: string;
  imageUrl: string;
}) {
  const description = suspend(async () => {
    return await fetchDescription(partykitHost, imageUrl);
  }, [imageUrl]);

  return <div>Description: {description}</div>;
}
