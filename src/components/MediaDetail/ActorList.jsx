import ActorInfo from "./ActorInfo";

const ActorList = ({ actors = [] }) => {
  return (
    <div>
      <p className="mb-4 text-[1.4vw] font-bold">Actor</p>
      <div className="grid gap-4 grid-flow-cols-3 sm:grid-cols-4 sm:gap-6">
        {actors.map((actor) => (
          <ActorInfo
            key={actor.id}
            id={actor.id}
            name={actor.name}
            character={actor.character}
            profilePath={actor.profile_path}
          />
        ))}
      </div>
    </div>
  );
};

export default ActorList;
