import { FeatureMovies } from "../components/FeatureMovies";
import MediaList from "../components/MediaList";
import { TOP_RATED_TABS, TRENDING_TABS } from "../libs/constants";

// Key: 7ac0bcdd08b6f892aef7428d1d900107
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWMwYmNkZDA4YjZmODkyYWVmNzQyOGQxZDkwMDEwNyIsIm5iZiI6MTczMDEwNjg2Mi4zMzc0NDcsInN1YiI6IjY3MWY1NGNiNDI3YzVjMTlmMDI2NmQ5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KB3-8QPnrNBjAhgpYsIzY8R3IhltkyXq9MC4UDtnj9U

function HomePage() {
  return (
    <>
      <FeatureMovies />
      <MediaList title="Trending" tabs={TRENDING_TABS} />
      <MediaList title="Top Rated" tabs={TOP_RATED_TABS} />
    </>
  );
}

export default HomePage;
