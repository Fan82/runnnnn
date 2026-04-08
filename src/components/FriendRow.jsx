function FriendRow({ row }) {
  const {
    name = "Unknown",
    lastRun = "N/A",
    stats = {},
    weeklyKm = 0,
    avatar = 1,
  } = row || {};

  return (
    <div className="run-card">
      <div className="flex gap-2 items-center">
        <div className="circle-avatar size-12">
          <img
            src={`https://i.pravatar.cc/150?img=${avatar}`}
            className="circle-avatarImage"
            alt={name}
          />
        </div>
        <div>
          <h6 className="text-zinc-100 font-medium">{name}</h6>
          <p className="text-muted">
            {lastRun} · {stats.pace || "--"}
          </p>
        </div>
      </div>
      <p className="text-mainBrand text-xl font-bold">
        {weeklyKm}
        <span className="text-sm font-medium ml-1">km</span>
      </p>
    </div>
  );
}

export default FriendRow;
