import { useState } from "react";
import URLInput from "./URLInput";

export default function Describer({ partykitHost }: { partykitHost: string }) {
  const [url, setUrl] = useState<string | null>(null);

  return <URLInput url={url} setUrl={setUrl} />;
}
