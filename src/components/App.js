import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "./header";
import Movie from "./movie";
import Search from "./search";


const MOVIE_API_URL = "https://cors-anywhere.herokuapp.com/https://www.doesthedogdie.com/search?q=woman"; // you should replace this with yours
const HEADERS = new Headers({
  "Accept": "application/json",
  "Content-Type": "application/json",
  "X-API-KEY": "30789b54f5732cbcaa666f9bbe2ebbad"
});

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
    fetch(MOVIE_API_URL, {headers: HEADERS, method: "GET"})
      .then(response => response.json())
      .then(jsonResponse => {
        console.log(jsonResponse);
        setMovies(jsonResponse.items);
        setLoading(false);
      });
  }, []);

    const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://cors-anywhere.herokuapp.com/https://www.doesthedogdie.com/search?q=${searchValue}`, {headers: HEADERS, method: "GET"})
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.items);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
    };

    
    return (
     <div className="App">
      <Header text="Le Best" />
      <Search search={search} />
      <p className="App-intro">Des flims</p>
      <div className="movies">
        {loading && !errorMessage ? (
         <span>loading...</span>
         ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};


export default App;