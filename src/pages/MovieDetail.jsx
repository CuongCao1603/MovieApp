import { useParams } from "react-router-dom";
import Loading from "@components/Loading";
import Banner from "@components/MediaDetail/Banner";
import ActorList from "@components/MediaDetail/ActorList";
import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import MovieInformation from "@components/MediaDetail/MovieInformation";
import useFetch from "@hooks/useFetch";

export const MovieDetail = () => {
  const { id } = useParams(); // get dynamic value passed in via url at dom

  const { data: movieInfor, isLoading } = useFetch({
    url: `/movie/${id}?append_to_response=release_dates,credits`,
  });

  const { data: recomandationsResponse, isLoading: isRelatedMoviesLoading } =
    useFetch({
      url: `/movie/${id}/recommendations`,
    });

  const relatedMovies = recomandationsResponse.results || [];

  if (isLoading) {
    return <Loading />;
  }

  const certification = (
    (movieInfor.release_dates?.results || []).find(
      (result) => result.iso_3166_1 === "US",
    )?.release_dates || []
  ).find((release_date) => release_date.certification)?.certification;

  const crews = (movieInfor.credits?.crew || [])
    .filter((crew) => ["Director", "Screenplay", "Writer"].includes(crew.job))
    .map((crew) => ({ id: crew.id, job: crew.job, name: crew.name }));

  return (
    <div>
      <Banner
        title={movieInfor.title}
        backdropPath={movieInfor.backdrop_path}
        posterPath={movieInfor.poster_path}
        certification={certification}
        crews={crews}
        genres={movieInfor.genre_ids}
        releaseDate={movieInfor.release_date}
        point={movieInfor.vote_average}
        overview={movieInfor.overview}
      />
      <div className="bg-black text-white">
        <div className="mx-auto flex max-w-screen-xl gap-6 px-6 py-10">
          <div className="flex-[2]">
            <ActorList actors={movieInfor.credits?.cast?.slice(0, 4) || []} />
            <RelatedMediaList
              mediaList={relatedMovies}
              isLoading={isRelatedMoviesLoading}
            />
          </div>
          <div className="flex-1">
            <MovieInformation movieInfo={movieInfor} />
          </div>
        </div>
      </div>
    </div>
  );
};
