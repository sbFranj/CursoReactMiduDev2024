//const URL_API = `https://www.omdbapi.com/?apikey=4287ad07&s=${search}`

export function Movies({ movies, search }) {
    const hasMovies = movies != null && movies.length > 0
    return (
        <>
            {hasMovies ? <ListMovies movies={movies} /> : <NoResult search={search} />}
        </>
    )
}

function ListMovies({ movies }) {
    return (
        <ul>
            {
                movies.map(movie => (
                    <li key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>{movie.year}</p>
                        <img src={movie.poster} alt={movie.title}></img>
                    </li>
                ))
            }
        </ul>
    )
}

function NoResult({ search }) {
    const text = search ? `No se han encontrado resultados para la pelicula ${search}` :
        "No se han encontrado resultados para esta película"
    return (
        <p>{text}</p>
    )
}