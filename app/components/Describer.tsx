import { useState, Suspense } from "react";
import URLInput from "./URLInput";
import ImageList from "./ImageList";
import Viewer from "./Viewer";

export default function Describer({ partykitHost }: { partykitHost: string }) {
  const [url, setUrl] = useState<string | null>(null);
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
          setUrl={setUrl}
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
