import ImageComponent from "@components/Image";

const ActorInfo = ({ id, name, character, profilePath, episodeCount }) => {
  return (
    <div className="rounded-lg border border-slate-300 bg-black shadow-sm">
      <ImageComponent
        className="rounded-lg object-cover"
        src={
          profilePath
            ? `https://media.themoviedb.org/t/p/w276_and_h350_face${profilePath}`
            : "/ActorNoImage.svg"
        }
        width={276}
        height={350}
      />
      <div className="p-4">
        <p className="font-bold">{name}</p>
        <p>{character}</p>
        <p>
          {episodeCount}
          {episodeCount > 1 ? " Episodes" : " Episode"}{" "}
        </p>
      </div>
    </div>
  );
};

export default ActorInfo;
