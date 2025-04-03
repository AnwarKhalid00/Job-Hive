import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchPage from "./pages/SearchPage";
import MovieDetails from './pages/MovieDetails';
import Watchlist from './pages/WatchList';
import HomePage from './components/HomePage';

function App() {

  return (
    <>
     <Router>
      <Navbar />
      <HomePage />

      <Routes>
        {/* ✅ Main Routes */}
        <Route path="/" element={<SearchPage />} />
        <Route path="/watchlist" element={ <Watchlist />} />  {/* 🔹 Add Watchlist Route */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movie/:id" element={<MovieDetails />} /> {/* ✅ Movie Details Route */}
      </Routes>
     
    </Router>
    </>
  )
}

export default App
