export default function MoviesApi({ apimovies, selectedIdFunc}) {  
  return (
    <div className="">
      <ul className="list list-movies">
        {apimovies?.map(movie => <MoviesList selectedIdFunc={selectedIdFunc} movie={movie} key={movie.imdbID} /> )}
        
      </ul>
    </div>
  );
}

function MoviesList({movie, selectedIdFunc}) {
  return <li onClick={() => selectedIdFunc(movie.imdbID)}>
  <img src={movie.Poster} alt={`${movie.Title} poster`} />
  <h3>{movie.Title}</h3>
  <div>
    <p>
      <span>🗓</span>
      <span>{movie.Year}</span>
    </p>
  </div>
</li>
}

