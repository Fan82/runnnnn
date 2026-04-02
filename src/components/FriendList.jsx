function FriendList({ list }) {
  const name = list?.name ?? "User";

  return (
    <div className="flex gap-1.5 items-center py-3 w-full mb-2">
      <div className="circle-avatar size-8">
        <img
          src="https://i.pravatar.cc/150?img=1"
          className="circle-avatarImage"
        />
      </div>
      <div>
        <h6 className="text-zinc-100 font-medium">{name}</h6>
      </div>
    </div>
  );
}

export default FriendList;
