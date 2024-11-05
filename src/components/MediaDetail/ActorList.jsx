import ActorInfo from "./ActorInfo";

const ActorList = () => {
  return (
    <div>
      <p className="mb-4 text-[1.4vw] font-bold">Actor</p>
      <div className="grid-flow-cols-3 grid gap-4 sm:grid-cols-4">
        <ActorInfo />
        <ActorInfo />
        <ActorInfo />
        <ActorInfo />
      </div>
    </div>
  );
};

export default ActorList;
