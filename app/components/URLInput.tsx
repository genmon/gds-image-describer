import { useState } from "react";

// can be null
const DEFAULT_URL =
  "https://gds.blog.gov.uk/2024/01/12/how-were-making-it-easier-to-access-government-forms-online/";

export default function URLInput({
  url,
  setUrl,
}: {
  url: string | null;
  setUrl: (url: string | null) => void;
}) {
  const [input, setInput] = useState<string>(url ?? "");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) {
      setError("Please enter a URL");
      return;
    }
    if (!input.match(/^https:\/\/gds.blog.gov.uk\/.*/)) {
      setError("Please enter a valid GDS blog post URL");
      return;
    }
    setUrl(input);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row justify-center items-center gap-2 w-full"
    >
      <label htmlFor="url">
        <a href="https://gds.blog.gov.uk" className="text-blue-600 underline">
          GDS blog
        </a>{" "}
        post URL
      </label>
      <div className="relative">
        <input
          type="text"
          className="grow-1 border border-gray-400 rounded-sm p-2"
          value={input}
          placeholder="e.g. https://gds.blog.gov.uk/..."
          onChange={(e) => handleChange(e)}
        />
        {error && (
          <div className="absolute left-0 -bottom-7 text-sm text-red-400">
            {error}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-300 hover:bg-blue-400 p-2 rounded-sm"
      >
        Submit
      </button>
    </form>
  );
}
