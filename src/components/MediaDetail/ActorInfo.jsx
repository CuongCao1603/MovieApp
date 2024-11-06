const ActorInfo = ({ id, name, character, profilePath }) => {
  return (
    <div className="rounded-lg border border-slate-300 bg-black shadow-sm">
      <img
        className="rounded-lg object-cover"
        src={
          profilePath
            ? `https://media.themoviedb.org/t/p/w276_and_h350_face${profilePath}`
            : "/ActorNoImage.svg"
        }
        alt=""
      />
      <div>
        <p className="font-bold">{name}</p>
        <p>{character}</p>
      </div>
    </div>
  );
};

export default ActorInfo;
