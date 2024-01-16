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
      <img src={imageUrl} alt="Image" />
      <div>
        <button
          className="text-sm text-black/70 underline"
          onClick={() => setImageUrl(null)}
        >
          Try Another
        </button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <AltTextSuggest partykitHost={partykitHost} imageUrl={imageUrl} />
      </Suspense>
    </div>
  );
}
