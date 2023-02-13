import React from "react";
import Movie from "./Movie";
import classes from "./MoviesList.module.css";

const MovieList = (props) => {
  const removeMovieHandler = async (id) => {
    const response = await fetch(
      `https://react-http-2dd6e-default-rtdb.firebaseio.com/movies/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    props.fetchMoviesHandler();
  };
  return (
    <ul className={classes["movies-list"]}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          onClick={() => removeMovieHandler(movie.id)}
        />
      ))}
    </ul>
  );
};

export default MovieList;
