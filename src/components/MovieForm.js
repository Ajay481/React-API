import React, { useState } from "react";
import classes from "./MovieForm.module.css";

export const MovieForm = () => {
  const [title, setTitle] = useState("");
  const [openingText, setOpeningText] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const openingTextHandler = (e) => {
    setOpeningText(e.target.value);
  };
  const releaseDateHandler = (e) => {
    setReleaseDate(e.target.value);
  };
  const submitHandler = () => {
    console.log(
      `Title: ${title} Opening Text: ${openingText} Release Date: ${releaseDate}`
    );
  };
  return (
    <div className={classes.form}>
      <div>
        <label>Title</label>
      </div>
      <input
        name="title"
        placeholder=""
        onChange={titleHandler}
        value={title}
      />
      <div>
        <label>Opening Text</label>
      </div>
      <input
        name="opening text"
        placeholder=""
        onChange={openingTextHandler}
        value={openingText}
      />
      <div>
        <label>Release Date</label>
      </div>
      <input
        name="release date"
        placeholder=""
        onChange={releaseDateHandler}
        value={releaseDate}
      />
      <div>
        <button onClick={submitHandler}>Add Movie</button>
      </div>
    </div>
  );
};
