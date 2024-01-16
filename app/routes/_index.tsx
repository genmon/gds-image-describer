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
      <div className="absolute top-2 right-2 sm:w-1/3 border border-1 border-gray-300 rounded p-2 text-gray-500 text-sm">
        This demo uses GPT-4 with Vision to generate alt text for images. It
        helps us understand where this can be useful and what the limitations
        are.
      </div>
      <Describer partykitHost={partykitHost} />
    </main>
  );
}
