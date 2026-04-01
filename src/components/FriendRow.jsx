function FriendRow({ name, lastRun, weeklyKm }) {
  return (
    <div className="flex justify-between items-center rounded-2xl bg-zinc-100/10 p-4 w-full">
      <div className="flex gap-1.5 items-center">
        <div className="circle-avatar size-13">
          <img
            src="https://i.pravatar.cc/150?img=1"
            className="circle-avatarImage"
          />
        </div>
        <div>
          <h6 className="text-zinc-100 font-medium">Friend 1</h6>
          <p className="text-sm text-zinc-100/50">
            Ran 21 km and 50 min yesterday
          </p>
        </div>
      </div>
      <p className="text-mainBrand text-base font-bold">
        52.2 <span className="ml-0.5">km</span>
      </p>
    </div>
  );
}

export default FriendRow;
