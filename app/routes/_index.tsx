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
      <Describer partykitHost={partykitHost} />
    </main>
  );
}
