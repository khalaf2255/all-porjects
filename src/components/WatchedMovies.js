export default function WatchedMovies({watched }) {
    console.log(watched);
  return (
    <div className="">
      <ul className="list list-movies">
        {watched?.map((movie) => (
          <MoviesList movie={movie} key={movie.imdbID} />
        ))}
      </ul>
    </div>
  );
}

function MoviesList({ movie }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.year}</span>
        </p>
      </div>
    </li>
  );
}
