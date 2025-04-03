import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [watchlistCount, setWatchlistCount] = useState(0);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlistCount(storedWatchlist.length);
  }, []);


  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          🎬 MovieVerse
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Links */}
        <ul
          className={`md:flex md:space-x-6 absolute md:static top-16 left-0 w-full bg-gray-900 md:w-auto transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          
          <li className="p-2 md:p-0">
            <Link to="/" className="hover:text-yellow-400">Home</Link>
          </li>

          <li className="p-2 md:p-0">
            <Link to="/watchlist" className="hover:text-yellow-400">
            Watchlist
            
             {/* Show count badge only if watchlistCount > 0 */}
             {watchlistCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {watchlistCount}
                </span>
              )}

            </Link>
          </li>

          <li className="p-2 md:p-0">
            <Link to="/search" className="hover:text-yellow-400">Search</Link>
          </li>
        </ul>
      </div>


          


    </nav>
  );
};

export default Navbar;
