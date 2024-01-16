import { useState, Suspense } from "react";
import URLInput from "./URLInput";
import ImageList from "./ImageList";
import Viewer from "./Viewer";

// can be null
const DEFAULT_URL =
  "https://gds.blog.gov.uk/2024/01/12/how-were-making-it-easier-to-access-government-forms-online/";

export default function Describer({ partykitHost }: { partykitHost: string }) {
  const [url, setUrl] = useState<string | null>(DEFAULT_URL);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  if (!url) {
    return <URLInput url={url} setUrl={setUrl} />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {url && !imageUrl && (
        <ImageList
          partykitHost={partykitHost}
          url={url}
          setImageUrl={setImageUrl}
        />
      )}
      {imageUrl && (
        <Viewer
          partykitHost={partykitHost}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
        />
      )}
    </Suspense>
  );
}
