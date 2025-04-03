import { useState } from "react";
import Search from "../components/Search";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async (query) => {
    if (!query.trim()) return; // Prevent empty search
    setLoading(true);
    setError("");

    try {
      const res = await fetch(API_URL + query);
      const data = await res.json();

      if (data.results.length === 0) {
        setError("No movies found.");
        setMovies([]); // Clear previous results
      } else {
        setMovies(data.results);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <Search onSearch={searchMovies} />

      {loading && <p className="text-center text-gray-400 mt-5">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-5">{error}</p>}


{/* ✅ Movie Rendering Section - Replace This Part */}

<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="hover:no-underline">
            <div className="bg-gray-800 p-4 rounded-md text-center hover:bg-gray-700 transition">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-md"
                />
              ) : (
                <p className="text-gray-400">No Image Available</p>
              )}
              <h3 className="text-white mt-2">{movie.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
