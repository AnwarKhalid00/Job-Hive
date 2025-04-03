import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []);

  const removeFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-white">Your Watchlist</h1>

      {watchlist.length === 0 ? (
        <p className="text-gray-400 mt-4">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
          {watchlist.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`} className="hover:no-underline">
              <div className="bg-gray-800 p-4 rounded-md text-center hover:bg-gray-700 transition">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-md hover:opacity-80 transition"
                  />
                ) : (
                  <p className="text-gray-400">No Image Available</p>
                )}
                <h3 className="text-white mt-2">{movie.title}</h3>

                {/* 🔹 Disable button if movie is not in the watchlist */}

                <button
                onClick={() => removeFromWatchlist(movie.id)}
                disabled={!watchlist.some((item) => item.id === movie.id)}
                className={`mt-2 px-4 py-2 rounded-md transition ${
                  watchlist.some((item) => item.id === movie.id)
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-gray-500 cursor-not-allowed text-gray-300"
                }`}
              >
                {watchlist.some((item) => item.id === movie.id) ? "Remove from Watchlist" : "Not in Watchlist"}
              </button>

              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
