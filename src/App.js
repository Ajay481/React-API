import React, { useEffect, useState, useRef, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const ref = useRef();

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch("https://swapi.dev/api/films/");
    if (response.status === 404) {
      setIsLoading(false);
      setError(true);
    } else if (response.status === 200) {
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
      setIsLoading(false);
      clearInterval(ref.current);
      setError(false);
    }
  },[])
  const cancelHandler = () => {
    setError(false);
    clearInterval(ref.current);
  };

  useEffect(() => {
    fetchMoviesHandler()
  },[fetchMoviesHandler])

  useEffect(() => {
    if (error) {
      ref.current = setInterval(() => {
        fetchMoviesHandler();
      }, 5000);
    }
  }, [fetchMoviesHandler,error]);

  let content = <p>Found no movie.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = (
      <div>
        <p>Something went wrong. Retrying.....</p>
        <button onClick={cancelHandler}>Cancel</button>
      </div>
    );
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
