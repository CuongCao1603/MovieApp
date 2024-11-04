import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Banner from "../components/MediaDetail/Banner";
import ActorList from "../components/MediaDetail/ActorList";

export const MovieDetail = () => {
  const { id } = useParams(); // get dynamic value passed in via url at dom
  const [movieInfo, setMovieInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // console.log(id);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?append_to_response=release_dates,credits`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWMwYmNkZDA4YjZmODkyYWVmNzQyOGQxZDkwMDEwNyIsIm5iZiI6MTczMDEwNjg2Mi4zMzc0NDcsInN1YiI6IjY3MWY1NGNiNDI3YzVjMTlmMDI2NmQ5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KB3-8QPnrNBjAhgpYsIzY8R3IhltkyXq9MC4UDtnj9U",
            },
          },
        );

        if (res.ok) {
          const data = await res.json();
          setMovieInfo(data);
        } else {
          console.error("Failed to fetch movies");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Banner mediaInfo={movieInfo} />
      <ActorList />
    </div>
  );
};
