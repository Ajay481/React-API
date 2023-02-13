import React, { useRef } from "react";
import classes from "./MovieForm.module.css";

export const MovieForm = (props) => {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };
    props.onAddMovie(movie);
    titleRef.current.value = "";
    openingTextRef.current.value = "";
    releaseDateRef.current.value = "";
  };
  return (
    <form className={classes.form}>
      <div>
        <label>Title:</label>
      </div>
      <input type="text" id="title" ref={titleRef} />
      <div>
        <label>Opening Text:</label>
      </div>
      <textarea rows="5" id="opening text" ref={openingTextRef} />
      <div>
        <label>Release Date:</label>
      </div>
      <input type="text" id="release date" ref={releaseDateRef} />
      <button onClick={submitHandler}>Add Movie</button>
    </form>
  );
};
