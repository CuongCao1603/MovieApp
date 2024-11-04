import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";

const MediaList = ({ title, tabs }) => {
  const [mediaList, setMediaList] = useState([]);
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  useEffect(() => {
    const url = tabs.find((tab) => tab.id === activeTabId)?.url;
    const fetchMovies = async () => {
      if (!url) return;
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWMwYmNkZDA4YjZmODkyYWVmNzQyOGQxZDkwMDEwNyIsIm5iZiI6MTczMDEwNjg2Mi4zMzc0NDcsInN1YiI6IjY3MWY1NGNiNDI3YzVjMTlmMDI2NmQ5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KB3-8QPnrNBjAhgpYsIzY8R3IhltkyXq9MC4UDtnj9U",
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log({ data });
          const trendingMediaList = data.results.slice(0, 12);
          setMediaList(trendingMediaList);
        } else {
          console.error("Failed to fetch movies");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchMovies();
  }, [activeTabId, tabs]); // Empty dependency array to run once when the component mounts

  return (
    <div className="bg-black px-8 py-10 text-[1.2vw] text-white">
      <div className="mb-6 flex items-center gap-4">
        <p className="text-[2vw] font-bold">{title}</p>
        <ul className="flex rounded border border-white">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer rounded px-2 py-1 ${tab.id === activeTabId ? "bg-white text-black" : ""}`}
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6">
        {mediaList.map((media) => (
          <MovieCard
            id={media.id}
            key={media.id}
            title={media.title || media.name}
            releaseDate={media.release_date || media.first_air_date}
            poster={media.poster_path}
            point={media.vote_average}
            mediaType={media.media_type || activeTabId}
          />
        ))}
      </div>
    </div>
  );
};
export default MediaList;
