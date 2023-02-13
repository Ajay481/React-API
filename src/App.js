import React, { useEffect, useState, useRef, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { MovieForm } from "./components/MovieForm";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const ref = useRef();

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://react-http-2dd6e-default-rtdb.firebaseio.com/movies.json"
    );
    console.log(response)
    if (response.status === 404) {
      setIsLoading(false);
      setError(true);
    } else if (response.status === 200) {
      const data = await response.json();
      console.log(data)

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(loadedMovies);
      setIsLoading(false);
      clearInterval(ref.current);
      setError(false);
    }
  }, []);
  const cancelHandler = () => {
    setError(false);
    clearInterval(ref.current);
  };

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  useEffect(() => {
    if (error) {
      ref.current = setInterval(() => {
        fetchMoviesHandler();
      }, 5000);
    }
  }, [fetchMoviesHandler, error]);

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://react-http-2dd6e-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    fetchMoviesHandler()
  }; 

  let content = <p>Found no movie.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} fetchMoviesHandler={fetchMoviesHandler}/>;
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
        <MovieForm onAddMovie={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
