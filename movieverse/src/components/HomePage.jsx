import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_URL = "https://api.themoviedb.org/3";

const HomePage = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const trendingRes = await fetch(`${API_URL}/trending/movie/week?api_key=${API_KEY}`);
        const topRatedRes = await fetch(`${API_URL}/movie/top_rated?api_key=${API_KEY}`);
        const upcomingRes = await fetch(`${API_URL}/movie/upcoming?api_key=${API_KEY}`);
        const nowPlayingRes = await fetch(`${API_URL}/movie/now_playing?api_key=${API_KEY}`);

        const trendingData = await trendingRes.json();
        const topRatedData = await topRatedRes.json();
        const upcomingData = await upcomingRes.json();
        const nowPlayingData = await nowPlayingRes.json();

        setTrending(trendingData.results || []);
        setTopRated(topRatedData.results || []);
        setUpcoming(upcomingData.results || []);
        setNowPlaying(nowPlayingData.results || []);

        // Set the first trending movie as the featured banner
        if (trendingData.results.length > 0) {
          setFeaturedMovie(trendingData.results[0]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      {featuredMovie && (
        <div
          className="relative w-full h-[400px] md:h-[500px] bg-cover bg-center flex items-end p-6"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold">{featuredMovie.title}</h1>
            <p className="mt-2 text-gray-300 hidden md:block">{featuredMovie.overview.substring(0, 150)}...</p>
            <Link
              to={`/movie/${featuredMovie.id}`}
              className="inline-block mt-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
            >
              Watch Now
            </Link>
          </div>
        </div>
      )}

      {/* Movie Sections */}
      <div className="p-6">
        <MovieSection title="Trending Movies" movies={trending} />
        <MovieSection title="Top Rated Movies" movies={topRated} />
        <MovieSection title="Upcoming Movies" movies={upcoming} />
        <MovieSection title="Now Playing" movies={nowPlaying} />
      </div>
    </div>
  );
};

// Movie Row Component
const MovieSection = ({ title, movies }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="flex-none w-40 md:w-52">
            <div className="relative group">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg transition-transform transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition">
                <p className="text-white text-sm hidden group-hover:block">{movie.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
