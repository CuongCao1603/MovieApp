import { useState, useEffect } from "react";
import { Movie } from "./Movie";
import { PaginateIndicator } from "./PaginateIndicator";

export const FeatureMovies = () => {
  const [movies, setMovies] = useState([]);
  const [activeMovieId, setActiveMovieId] = useState();

  // Fetch movies only once when the component mounts
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWMwYmNkZDA4YjZmODkyYWVmNzQyOGQxZDkwMDEwNyIsIm5iZiI6MTczMDEwNjg2Mi4zMzc0NDcsInN1YiI6IjY3MWY1NGNiNDI3YzVjMTlmMDI2NmQ5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KB3-8QPnrNBjAhgpYsIzY8R3IhltkyXq9MC4UDtnj9U",
          },
        });

        if (res.ok) {
          const data = await res.json();
          const popularMovies = data.results.slice(0, 5);
          setMovies(popularMovies);
          setActiveMovieId(popularMovies[0].id);
        } else {
          console.error("Failed to fetch movies");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchMovies();
  }, []); // Empty dependency array to run once when the component mounts

  // Automatic movie transition every 5 seconds
  // useEffect(() => {
  //   if (movies.length === 0) return; // Prevent setting interval if movies are not fetched

  //   const intervalId = setInterval(() => {
  //     setActiveMovieId((prevActiveId) => {
  //       // Find the index of the current active movie
  //       const currentIndex = movies.findIndex(
  //         (movie) => movie.id === prevActiveId,
  //       );
  //       // Calculate the next index in a cyclic manner
  //       const nextIndex = (currentIndex + 1) % movies.length;
  //       return movies[nextIndex].id;
  //     });
  //   }, 5000); // 5 seconds interval

  //   // Clean up the interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, [movies]); // Depend on movies array

  // console.log("Movie ", movies);

  return (
    <div className="relative text-white">
      {movies
        .filter((movie) => movie.id === activeMovieId)
        .map((movie) => (
          <Movie key={movie.id} data={movie} />
        ))}
      <PaginateIndicator
        movies={movies}
        activeMovieId={activeMovieId}
        setActiveMovieId={setActiveMovieId}
      />
    </div>
  );
};
// export default FeatureMovies;
