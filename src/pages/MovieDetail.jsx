import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgressBar from "../components/CircularProgressBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { groupBy } from "lodash";

export const MovieDetail = () => {
  const { id } = useParams(); // get dynamic value passed in via url at dom
  const [movieInfo, setMovieInfo] = useState({});

  // console.log(id);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
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
      }
    };

    fetchMovies();
  }, [id]);

  const certification = (
    (movieInfo.release_dates?.results || []).find(
      (result) => result.iso_3166_1 === "US",
    )?.release_dates || []
  ).find((release_date) => release_date.certification)?.certification;

  const crews = (movieInfo.credits?.crew || [])
    .filter((crew) => ["Director", "Screenplay", "Writer"].includes(crew.job))
    .map((crew) => ({ id: crew.id, job: crew.job, name: crew.name }));

  const groupCrews = groupBy(crews, "job");
  console.log({ crews, groupCrews });

  // console.log(groupCrews[job])

  return (
    <div className="relative overflow-hidden text-white">
      <img
        className="absolute inset-0 brightness-[.2]"
        src={`https://image.tmdb.org/t/p/original${movieInfo.backdrop_path}`}
        alt=""
      />
      <div className="relative mx-auto flex max-w-screen-xl gap-6 px-6 py-10 lg:gap-8">
        <div className="flex-1">
          <img
            src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movieInfo.poster_path}`}
            alt=""
          />
        </div>
        <div className="flex-[2] text-[1.2vw]">
          <p className="mb-2 text-[2vw] font-bold">{movieInfo.title}</p>
          <div className="flex items-center gap-4">
            <span className="border border-gray-400 p-1 text-gray-400">
              {certification}
            </span>
            <p>{movieInfo.release_date}</p>
            <p>
              {(movieInfo.genres || []).map((genre) => genre.name).join(", ")}
            </p>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CircularProgressBar
                percent={Math.round(movieInfo.vote_average * 10)}
                size={3.5}
                strokeWidth={0.3}
              />{" "}
              Rating
            </div>
            <button>
              <FontAwesomeIcon icon={faPlay} className="mr-1" />
              Trailer
            </button>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-[1.3vw] font-bold">Overview</p>
            <p>{movieInfo.overview}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {Object.keys(groupCrews).map((job) => (
              <div key={job}>
                <p className="font-bold">{job}</p>
                <p>{groupCrews[job].map((crew) => crew.name).join(", ")}</p>
              </div>
            ))}
           
          </div>
        </div>
      </div>
    </div>
  );
};
