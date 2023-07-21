import Navbar from "./Navbar.js";
import MoviesApi from "./MoviesApi.js";
import WatchedMovies from "./WatchedMovies.js";
import { useEffect } from "react";
import { useState } from "react";
// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "45181333";
// const query = "interstellar";
export default function App() {
  const [apimovies, setApiMovies] = useState([]);
  const [query, setQuery] = useState("interstellar");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [noSearch, setNoSearch] = useState(false);
  const [showBox, setShowBox] = useState(true);
  const [showBox2, setShowBox2] = useState(true);
  const [selectedID, setSelectedID] = useState("");
  const [movieSelected, setSatechedList] = useState("");
  const [watched, setWatched] = useState([]);
  const [closeDetails, setCloseDetails] = useState(false);
  
  useEffect(() => {
    async function getApiMovies() {
      try {
        setError("");
        setLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
        );
        if (!res.ok) throw new Error();

        const data = await res.json();
        if (data.Response === "False") throw new Error();

        setApiMovies(data.Search);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (query === "") setNoSearch(true);
    if (query.length < 3) {
      setApiMovies([]);
      setError("");
      return;
    }
    getApiMovies();
  }, [query]);

  useEffect(() => {
    async function showSelectedMovie() {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
      );

      const data = await res.json();
      setSatechedList(data);
    }
    showSelectedMovie();
  }, [selectedID]);

  function toggleBox() {
    setShowBox((showBox) => !showBox);
    console.log(showBox);
  }
  function toggleBox2() {
    setShowBox2((showBox2) => !showBox2);
    console.log(showBox);
  }

  function selectedIdFunc(id) {
    setSelectedID(selectedID => selectedID === id ? null : id);
  }

  function makeWatchedArray(movie) {
    console.log(movie);
    setWatched([...watched, movie]);
  }
  function handleCloseDetails() {
    // setCloseDetails((closeDetails) => !closeDetails);
    setSelectedID("");
  }
  return (
    <div className="app">
      <Navbar query={query} setQuery={setQuery} />
      <div className="main">
        <div className="box">
          <button onClick={toggleBox} class="btn-toggle">
            {showBox ? " –" : "+"}
          </button>

          {showBox && loading && <Loader />}
          {showBox && !loading && !error && (
            <MoviesApi
              showBox={showBox}
              toggleBox={toggleBox}
              apimovies={apimovies}
              selectedIdFunc={selectedIdFunc}
            />
          )}
          {showBox && error && <Error />}
          {showBox && !loading && !error && noSearch && <NoSearch />}
        </div>

        <div className="box">
          <button onClick={toggleBox2} class="btn-toggle">
            {showBox2 ? " –" : "+"}
          </button>

          {showBox2 && (
            <>
              {!selectedID && (
                <>
                <WatchedSummary movieSelected={movieSelected} />
                <WatchedMovies
                  selectedID={selectedID}
                  tempWatchedData={tempWatchedData}
                  watched={watched}
                />
                </>
              )}

              { selectedID && (
                <MovieDetails
                  toggleBox={toggleBox}
                  makeWatchedArray={makeWatchedArray}
                  movieSelected={movieSelected}
                  handleCloseDetails={handleCloseDetails}
                  selectedID={selectedID}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div >
      <p className="loader">Loading....</p>
    </div>
  );
}
function NoSearch() {
  return (
    <div >
      <p className="loader">Choose Your Movie 👌</p>
    </div>
  );
}
function Error({ error }) {
  console.log(error);
  return (
    <div >
      <p className="loader">
        <span>⛔</span> Movie Not Found
      </p>
    </div>
  );
}

function MovieDetails({ movieSelected, makeWatchedArray, handleCloseDetails, selectedID, watched }) {
  const {
    Title: title,
    // Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieSelected; 
  
  function addMovie(movieSelected) {
    const newWatechedMovie = {
      imdbID: selectedID,
      title, 
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime), 
    };
console.log(watched);
    console.log(watched?.filter(watched => watched.imdbID ));
    console.log( newWatechedMovie.imdbID);
    makeWatchedArray(newWatechedMovie);
    handleCloseDetails();
  }
 
  return (
    <div className="details">
      <header>
        <button onClick={handleCloseDetails} className="btn-back">
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${title} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre} </p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDB rating{" "}
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {/* <RatingStart maxLength={10} size={24} onRatre={setUserRating} /> */}
        </div>
        {
            <button className="btn-add" onClick={() => addMovie(watched)}>
              + Add to list
            </button>
        }
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors} </p>
        <p>Directored By {director} </p>
      </section>
    </div>
  );
}

function WatchedSummary({ watched, movieSelected }) {
    // const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    // const avgUserRating = average(watched.map((movie) => movie.userRating));
    // const avgRuntime = average(watched.map((movie) => movie.runtime)); 
    return (
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{movieSelected.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            {/* <span>{avgImdbRating}</span> */}
          </p>
          <p>
            <span>🌟</span>
            {/* <span>{avgUserRating}</span> */}
          </p>
          <p>
            <span>⏳</span>
            {/* <span>{avgRuntime} min</span> */}
          </p>
        </div>
      </div>
    );
  }