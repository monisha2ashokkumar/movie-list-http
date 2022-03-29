import { useState } from "react";
import Movies from "./component/Movies";
import "./App.css";

/* const DUMMY_VALUES=[
  {name: 'abc'},
  {name:'xyz'},
  {name: 'kly'}
] */
function App() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchFromURL() {
    setIsLoading(true);
    setError(null);
    try {
      //if sync need to use const response = await fetch("https://swapi.dev/api/film").catch(); NO TRY CATCH
      const response = await fetch("https://swapi.dev/api/film");
      if (response.status !== 200) {
        setIsLoading(false);
        throw new Error("Something went wrong!!");
      }
      const data = await response.json();
      const transformedData = data.results.map((item) => {
        return {
          id: item.episode_id,
          title: item.title,
          openingText: item.opening_crawl,
          releaseDate: item.release_date,
        };
      });
      setMovieList(transformedData);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }

    /* fetch("https://swapi.dev/api/films")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedData = data.results.map((item) => {
          return {
            id: item.episode_id,
            title: item.title,
            openingText: item.opening_crawl,
            releaseDate:item.release_date
          };
        });
        setMovieList(transformedData);
        setIsLoading(false)
      }); */
  }

  return (
    <div className="App">
      <h1>Movies list</h1>
      <section>
        <button onClick={fetchFromURL}>Check the movies</button>
        {!isLoading && movieList.length > 0 && (
          <Movies movieList={movieList}></Movies>
        )}
        {!isLoading && error === null && movieList.length === 0 && <p>No movies found!!</p>}
        {!isLoading && error && <p>{error}</p> }
        {isLoading && <p>Loading...</p>}
       
      </section>
    </div>
  );
}

export default App;
