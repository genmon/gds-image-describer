import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "partymix";
import WhosHere from "../components/whos-here";

// PartyKit will inject the host into the server bundle
// so let's read it here and expose it to the client
declare const PARTYKIT_HOST: string;
export function loader() {
  return { partykitHost: PARTYKIT_HOST };
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Partymix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { partykitHost } = useLoaderData<typeof loader>();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 max-w-6xl mx-auto">
      <h1 className="text-6xl font-semibold">Hello, World!</h1>
    </main>
  );
}
