import { useMemo, useRef, useState } from "react"
import { searchMovies } from "../services/movies"

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const previousSearch = useRef(search)

  const getMovies = async () => {
    if (previousSearch === search) return
    const newMovies = await searchMovies({ search })
    setMovies(newMovies)
  }

  const sortedMovies = useMemo(() => {
    if (!movies) return;
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies }
}
