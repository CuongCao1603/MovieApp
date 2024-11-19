import { useParams } from "react-router-dom";
import Loading from "@components/Loading";
import Banner from "@components/MediaDetail/Banner";
import ActorList from "@components/MediaDetail/ActorList";
import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import MovieInformation from "@components/MediaDetail/MovieInformation";
import useFetch from "@hooks/useFetch";

const TVShowDetail = () => {
  const { id } = useParams(); // get dynamic value passed in via url at dom

  const { data: tvInfo, isLoading } = useFetch({
    url: `/tv/${id}?append_to_response=release_dates,credits`,
  });

  const { data: recomandationsResponse, isLoading: isRelatedMoviesLoading } =
    useFetch({
      url: `/tv/${id}/recommendations`,
    });

  const relatedMovies = recomandationsResponse.results || [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Banner
        title={tvInfo.title}
        backdropPath={tvInfo.backdrop_path}
        posterPath={tvInfo.poster_path}
        // certification={certification}
        // crews={crews}
        genres={tvInfo.genre_ids}
        releaseDate={tvInfo.release_date}
        point={tvInfo.vote_average}
        overview={tvInfo.overview}
      />
      <div className="bg-black text-white">
        <div className="mx-auto flex max-w-screen-xl gap-6 px-6 py-10">
          <div className="flex-[2]">
            <ActorList actors={tvInfo.credits?.cast?.slice(0, 4) || []} />
            <RelatedMediaList
              mediaList={relatedMovies}
              isLoading={isRelatedMoviesLoading}
            />
          </div>
          <div className="flex-1">
            <MovieInformation movieInfo={tvInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVShowDetail;
