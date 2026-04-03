function FriendRow({ row }) {
  const name = row?.name;
  const lastRun = row?.lastRun ?? "--";
  const stats = row?.stats;
  const weeklyKm = row?.weeklyKm ?? "--";

  return (
    <div className="run-card">
      <div className="flex gap-1.5 items-center">
        <div className="circle-avatar size-13">
          <img
            src="https://i.pravatar.cc/150?img=1"
            className="circle-avatarImage"
          />
        </div>
        <div>
          <h6 className="text-zinc-100 font-medium">{name}</h6>
          <p className="text-sm text-zinc-100/50">
            Ran {lastRun} and {stats?.pace ?? `6'09"`}
          </p>
        </div>
      </div>
      <p className="text-mainBrand text-base font-bold">
        {weeklyKm}
        <span className="ml-0.5">km</span>
      </p>
    </div>
  );
}

export default FriendRow;
