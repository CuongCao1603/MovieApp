import { faMagnifyingGlass, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  return (
    <>
      <header className="flex h-14 items-center justify-between bg-slate-900 px-8 text-white">
        <div className="flex items-center gap-4">
          <img src="./netflix.png" alt="" className="w-16 sm:w-28" />
          <a href="#">Phim</a>
          <a href="#">Truyền hình</a>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="cursor-pointer"
          />
        </div>
      </header>
      <div className="relative text-white">
        <img
          src="https://image.tmdb.org/t/p/original/xg27NrXi7VXCGUr7MG75UqLl6Vg.jpg"
          alt=""
          className="aspect-video brightness-50"
        />
        <div className="absolute bottom-[10%] left-8 w-1/2 sm:w-1/3">
          <p className="font-bold sm:text-[2vw]">Inside Out 2</p>
          <div>
            <p>PG13</p>
            <p>2024-06-11</p>
          </div>
          <div>
            <div className="hidden sm:block">
              <p>Overview</p>
              <p>
                Teenager Riley&apos;s mind headquarters is undergoing a sudden
                demolition to make room for something entirely unexpected: new
                Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long
                been running a successful operation by all accounts, aren’t sure
                how to feel when Anxiety shows up. And it looks like she’s not
                alone.
              </p>
            </div>
          </div>
          <div>
            <button>
              <FontAwesomeIcon icon={faPlay} />
              Trailer
            </button>
            <button>View Detail</button>
          </div>
        </div>
      </div>
      <div>
        <ul>
          <li className="h-0.5 w-4 cursor-pointer bg-slate-600"></li>
          <li className="h-0.5 w-4 cursor-pointer bg-slate-600"></li>
          <li className="h-0.5 w-4 cursor-pointer bg-slate-600"></li>
          <li className="h-0.5 w-4 cursor-pointer bg-slate-600"></li>
          <li className="h-0.5 w-4 cursor-pointer bg-slate-600"></li>
        </ul>
      </div>
    </>
  );
}

export default App;
