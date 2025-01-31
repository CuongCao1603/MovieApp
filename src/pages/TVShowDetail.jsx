import { useParams } from "react-router-dom";
import Loading from "@components/Loading";
import Banner from "@components/MediaDetail/Banner";
import ActorList from "@components/MediaDetail/ActorList";
import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import useFetch from "@hooks/useFetch";
import TVShowInformation from "@components/MediaDetail/TVShowInformation";
import SeasonsList from "@components/MediaDetail/SeasonsList";

const TVShowDetail = () => {
  const { id } = useParams(); // get dynamic value passed in via url at dom

  const { data: tvInfo, isLoading } = useFetch({
    url: `/tv/${id}?append_to_response=content_ratings,aggregate_credits`,
  });

  const { data: recomandationsResponse, isLoading: isRecommandationLoading } =
    useFetch({
      url: `/tv/${id}/recommendations`,
    });

  const relatedTVShow = recomandationsResponse.results || [];

  const certification =
    (tvInfo.content_ratings?.results || []).find(
      (result) => result.iso_3166_1 === "US",
    ) || (tvInfo.content_ratings?.results || [])[0];

  const crews = (tvInfo.aggregate_credits?.crew || [])
    .filter((crew) => {
      const jobs = (crew.jobs || []).map((j) => j.job);
      return ["Director", "Writer"].some((job) => jobs.find((j) => j === job));
    })
    .slice(0, 5)
    .map((crew) => ({ id: crew.id, job: crew.jobs[0].job, name: crew.name }));

  const certificationRating = certification?.rating || "Not Rated"; // Extract the 'rating' or provide a fallback

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Banner
        title={tvInfo.name}
        backdropPath={tvInfo.backdrop_path}
        posterPath={tvInfo.poster_path}
        certification={certificationRating}
        crews={crews}
        genres={tvInfo.genre_ids}
        releaseDate={tvInfo.first_air_date}
        point={tvInfo.vote_average}
        overview={tvInfo.overview}
      />
      <div className="bg-black text-white">
        <div className="mx-auto flex max-w-screen-xl gap-6 px-6 py-10">
          <div className="flex-[2]">
            <ActorList
              actors={(tvInfo.aggregate_credits?.cast || []).map((cast) => ({
                ...cast,
                character: cast.roles[0]?.character,
                episodeCount: cast.roles[0].episode_count,
              }))}
            />
            <SeasonsList seasons={(tvInfo.seasons || []).reverse()} />
            <RelatedMediaList
              mediaList={relatedTVShow}
              isLoading={isRecommandationLoading}
            />
          </div>
          <div className="flex-1">
            <TVShowInformation tvInfo={tvInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVShowDetail;
