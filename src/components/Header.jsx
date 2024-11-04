import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 text-white h-14 bg-slate-900 lg:h-20">
      <div className="flex items-center gap-4 lg:gap-6">
        <Link to="/">
          <img src="/netflix.png" alt="" className="w-16 sm:w-28" />
        </Link>
        <a href="#" className="lg:text-xl">
          Phim
        </a>
        <a href="#" className="lg:text-xl">
          Truyền hình
        </a>
      </div>
      <div>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="cursor-pointer" />
      </div>
    </header>
  );
};
