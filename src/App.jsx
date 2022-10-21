import { useEffect, useState } from 'react'
import './App.css'
import MovieCard from './components/MovieCard.jsx'
import SearchIcon from './search.svg'

const API_URL = 'https://omdbapi.com?apikey=6c67d7e3'

const movie1 = {
  "Title": "Undefined",
  "Year": "2006",
  "imdbID": "tt1436480",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMTgzNzkxMzk5Nl5BMl5BanBnXkFtZTgwMTQ2MzA2MDE@._V1_SX300.jpg"
}

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')
  
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
  
    setMovies(data.Search)
  }
  
  useEffect(() => {
    searchMovies()
  }, [])
  
  
  return (
    <div className="app">
      <h1>MovieLand</h1>
      
      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
  
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
  
      {movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
    </div>
  );
}

export default App;
