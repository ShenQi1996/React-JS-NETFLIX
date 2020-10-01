import React, { useState, useEffect } from "react";
import axios from "./axios";

import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  //useEffect:
  //A snippet of code which runs based on a specific condition/varaible
  //Every time after the Row is loaded useEffect will load up all the
  // items in that Row
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // getting "https://api.themoviedb.org/3"
      console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); //If the second value is [] emtry means: run once and done.
  //If the second value is not emtry means: every time
  // the second value changes, it will run again.
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id} // will give eacth movie it's id and will only refash the movie that is new.
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
