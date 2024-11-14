import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "@components/Loading";
import Banner from "@components/MediaDetail/Banner";
import ActorList from "@components/MediaDetail/ActorList";
import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import MovieInformation from "@components/MediaDetail/MovieInformation";
import useFetch from "@hooks/useFetch";

export const MovieDetail = () => {
  const { id } = useParams(); // get dynamic value passed in via url at dom
  const [relatedMovies, setRelatedMovies] = useState([]);

  const { data: movieInfo, isLoading } = useFetch({
    url: `/movie/${id}?append_to_response=release_dates,credits`,
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // setIsRelatedMediaListLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
          },
        );

        if (res.ok) {
          const data = await res.json();
          console.log({ recommandation: data });
          const currentRelatedMovies = (data.results || []).slice(0, 12);
          setRelatedMovies(currentRelatedMovies);
          // setMovieInfo(data);
        } else {
          console.error("Failed to fetch relate movies");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        // setIsRelatedMediaListLoading(false);
      }
    };

    fetchMovies();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  // if (isRelatedMediaListLoading) {
  //   return <Loading />;
  // }

  console.log("actors ", { movieInfo });
  return (
    <div>
      <Banner mediaInfo={movieInfo} />
      <div className="text-white bg-black">
        <div className="flex max-w-screen-xl gap-6 px-6 py-10 mx-auto">
          <div className="flex-[2]">
            <ActorList actors={movieInfo.credits?.cast?.slice(0, 4) || []} />
            <RelatedMediaList mediaList={relatedMovies} />
          </div>
          <div className="flex-1">
            <MovieInformation movieInfo={movieInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};
