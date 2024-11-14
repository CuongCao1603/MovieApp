const ActorInfo = ({ id, name, character, profilePath }) => {
  return (
    <div className="bg-black border rounded-lg shadow-sm border-slate-300">
      <img
        className="object-cover rounded-lg"
        src={
          profilePath
            ? `https://media.themoviedb.org/t/p/w276_and_h350_face${profilePath}`
            : "/ActorNoImage.svg"
        }
        alt=""
      />
      <div className="p-4">
        <p className="font-bold">{name}</p>
        <p>{character}</p>
      </div>
    </div>
  );
};

export default ActorInfo;
