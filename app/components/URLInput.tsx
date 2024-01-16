import { useState } from "react";

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
      className="flex flex-row justify-start items-center gap-2"
    >
      <label htmlFor="url">GDS blog post URL</label>
      <div className="relative">
        <input
          type="text"
          size={40}
          className="border border-gray-400 rounded-sm p-2"
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
