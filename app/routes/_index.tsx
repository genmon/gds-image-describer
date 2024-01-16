import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "partymix";
import Describer from "~/components/Describer";

// PartyKit will inject the host into the server bundle
// so let's read it here and expose it to the client
declare const PARTYKIT_HOST: string;
export function loader() {
  return { partykitHost: PARTYKIT_HOST };
}

export const meta: MetaFunction = () => {
  return [
    { title: "Image Describer" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { partykitHost } = useLoaderData<typeof loader>();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 max-w-6xl mx-auto">
      <div className="absolute top-2 right-2 max-w-80 border border-1 border-gray-300 rounded p-2 text-gray-500 text-sm">
        This demo uses the GPT-4 Vision API to generate alt text for images. It
        helps us understand where this can be useful and what the limitations
        are.{" "}
        <a
          className="text-blue-600/70 underline"
          href="https://github.com/genmon/gds-image-describer/blob/e505b26c1717757ba139ad1fad46fc073d9c29e7/party/vision.ts#L54"
        >
          See the prompt on GitHub.
        </a>
      </div>
      <Describer partykitHost={partykitHost} />
    </main>
  );
}
