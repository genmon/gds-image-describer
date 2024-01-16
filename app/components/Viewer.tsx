import { Suspense } from "react";
import AltTextSuggest from "./AltTextSuggest";

export default function Viewer({
  partykitHost,
  imageUrl,
  setImageUrl,
}: {
  partykitHost: string;
  imageUrl: string;
  setImageUrl: (imageUrl: string | null) => void;
}) {
  return (
    <div className="flex flex-col justify-start items-start gap-2">
      <div>
        <button
          className="text-sm text-black/70 underline"
          onClick={() => setImageUrl(null)}
        >
          &larr; Try Another
        </button>
      </div>
      <img src={imageUrl} alt="Image" />
      <Suspense fallback={<div>Generating description...</div>}>
        <AltTextSuggest partykitHost={partykitHost} imageUrl={imageUrl} />
      </Suspense>
    </div>
  );
}
