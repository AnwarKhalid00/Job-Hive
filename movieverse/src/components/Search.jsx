import { useState } from "react";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && typeof onSearch === "function") {
      onSearch(query); // Call the parent function to fetch movies
    }
  };

  // Function to clear search input
  const handleClear = () => {
    setQuery("");
    if (typeof onSearch === "function") {
      onSearch(""); // ✅ Ensures onSearch is called only if it's a function
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
        className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Search Button */}
      <button
        type="submit"
        className="p-2 !bg-blue-500 !text-white !rounded-md hover:!bg-blue-600 !transition !duration-300 !ease-in-out"

      >
        Search
      </button>

      {/* Clear Button */}
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="p-2 !bg-gray-500 !text-white !rounded-md hover:!bg-gray-600 !transition !duration-300 !ease-in-out"

        >
          Clear
        </button>
      )}
    </form>
  );
};

export default Search;
