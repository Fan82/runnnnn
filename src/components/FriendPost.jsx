import { Ellipsis, Heart, MessageCircle, Share } from "lucide-react";
import RunMap from "./RunMap";

function FriendPost({ post }) {
  const name = post?.name ?? "Friend 1";
  const timeAgo = post?.timeAgo ?? "2 hours ago";
  const stats = post?.stats;
  const coords = post?.coords;
  return (
    <div className="relative flex flex-col gap-2 w-full mt-8 pb-8 inset-shadow-[0px_-1px_0px_rgba(255,255,255,0.1)] z-1">
      {/* user info+ time */}
      <div className="flex gap-4 items-center mb-2">
        <div className="circle-avatar size-13">
          <img
            src="https://i.pravatar.cc/150?img=1"
            className="circle-avatarImage"
          />
        </div>
        <div>
          <h6 className="text-zinc-100 font-medium">{name}</h6>
          <p className="text-sm text-zinc-100/50">{timeAgo}</p>
        </div>
      </div>
      <p className="absolute right-4 p-4 text-zinc-100/50 text-base font-bold">
        <Ellipsis className="size-4" />
      </p>
      {/* data */}
      <div className="bg-zinc-100/10 rounded-2xl px-2 py-2">
        <div className="flex flex-between ">
          <div className="p-2 flex-1">
            <p className="text-muted">Distance</p>
            <h6 className="text-bold text-mainBrand text-xl">
              {stats?.distanceKm ?? 18.4}
              <span className="ml-1.5 text-muted">km</span>
            </h6>
          </div>
          <div className="p-2 flex-1">
            <p className="text-muted">Time</p>
            <h6 className="text-bold text-zinc-100 text-xl">
              {stats?.timeMin ?? 32}
              <span className="ml-1.5 text-muted">min</span>
            </h6>
          </div>
          <div className="p-2 flex-1">
            <p className="text-muted">Pace</p>
            <h6 className="text-bold text-zinc-100 text-xl">
              {stats?.pace ?? `6'09"`}
              <span className="ml-1.5 text-muted">/km</span>
            </h6>
          </div>
        </div>
        <RunMap coords={coords} />
      </div>
      {/* Post typing */}
      <div className="text-bold">Moring run in the park! Feel AMAZING 🌞</div>
      <div className="flex items-center text-muted gap-4 mt-2">
        <div className="flex gap-1">
          <Heart className="size-5" />
          <p>24</p>
        </div>
        <div className="flex gap-1">
          <MessageCircle className="size-5" />
          <p>3</p>
        </div>
        <div className="flex gap-1">
          <Share className="size-5" />
          <p>12</p>
        </div>
      </div>
    </div>
  );
}

export default FriendPost;
