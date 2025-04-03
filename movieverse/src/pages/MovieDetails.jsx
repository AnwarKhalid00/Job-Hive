import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_URL = `https://api.themoviedb.org/3/movie/`;

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [message, setMessage] = useState(""); // ✅ State for confirmation message

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`${API_URL}${id}?api_key=${API_KEY}&append_to_response=credits`);
        const data = await res.json();

        if (data.success === false) {
          setError("Movie not found.");
        } else {
          setMovie(data);
        }
      } catch (err) {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();

    // Load watchlist from local storage
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
    setIsAdded(storedWatchlist.some((m) => m.id === Number(id))); // ✅ Check if movie is already added
  }, [id]);

  // 🔹 Function to add movie to Watchlist
  const addToWatchlist = () => {
    if (!movie) return;

    // 🔹 Get existing watchlist from local storage
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    // 🔹 Check if the movie is already in the watchlist
    const isAlreadyAdded = storedWatchlist.some((item) => item.id === movie.id);

    if (isAlreadyAdded) {
      setMessage("This movie is already in your watchlist!"); // ✅ Show message
      return;
    }

    // 🔹 Add new movie and update local storage
    const updatedWatchlist = [...storedWatchlist, movie];
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));

    setIsAdded(true); // ✅ Disable button after adding
    setMessage("Movie added to watchlist! ✅"); // ✅ Show success message

    // ✅ Hide message after 2 seconds
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!movie) return <p className="text-center text-gray-400 mt-5">Movie not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-5">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-5">
        {/* Movie Poster */}
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-md w-full md:w-1/3"
          />
        ) : (
          <p className="text-gray-400">No Image Available</p>
        )}

        {/* Movie Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-400 text-sm mt-1">
            Release Date: {movie.release_date} | ⭐ {movie.vote_average.toFixed(1)}
          </p>

          {/* Genres */}
          <div className="mt-3">
            <p className="text-sm font-semibold text-gray-300">Genres:</p>
            <div className="flex gap-2 mt-1">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="bg-gray-700 px-2 py-1 text-xs rounded-md">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          {/* Overview */}
          <p className="mt-4 text-gray-200">{movie.overview}</p>

          {/* Cast Section */}
          {movie.credits && movie.credits.cast && movie.credits.cast.length > 0 ? (
            <div className="mt-5">
              <p className="text-sm font-semibold text-gray-300">Top Cast:</p>
              <div className="flex gap-3 mt-2 overflow-x-auto">
                {movie.credits.cast.slice(0, 5).map((actor) => (
                  <div key={actor.id} className="text-center">
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt={actor.name}
                        className="w-16 h-16 rounded-full mx-auto"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto flex items-center justify-center">
                        <span className="text-xs">No Image</span>
                      </div>
                    )}
                    <p className="text-xs mt-1">{actor.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-400 mt-3">Cast information not available.</p>
          )}

          {/* Runtime */}
          <p className="mt-5 text-gray-300 text-sm">
            Runtime: {movie.runtime} min | Status: {movie.status}
          </p>
        </div>
      </div>

      {/* Watchlist Section */}
      <div className="p-5 text-center">
        {/* 🔹 Watchlist Button */}
        <button
          onClick={addToWatchlist}
          disabled={isAdded} // ✅ Disable button if already added
          className={`mt-4 px-4 py-2 rounded-md transition ${
            isAdded ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          {isAdded ? "✔ Added to Watchlist" : "➕ Add to Watchlist"}
        </button>

        {/* ✅ Show confirmation message */}
        {message && (
          <p className={`mt-2 ${isAdded ? "text-green-400" : "text-yellow-400"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
