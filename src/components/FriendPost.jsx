import { useState } from "react";
import { Ellipsis, Heart, MessageCircle, Share } from "lucide-react";
import RunMap from "./RunMap";

function FriendPost({ post }) {
  const {
    name,
    timeAgo,
    stats,
    coords,
    content = "No description",
    userId = 1,
  } = post;

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post?.likes ?? 24);
  const [showMenu, setShowMenu] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <div className="relative flex flex-col gap-2 w-full mt-8 pb-8 inset-shadow-[0px_-1px_0px_rgba(255,255,255,0.1)]">
      {/* user info + time */}
      <div className="flex gap-4 items-center justify-between mb-2">
        <div className="circle-avatar size-13">
          <img
            src={`https://i.pravatar.cc/150?img=${userId}`}
            className="circle-avatarImage"
            alt={name}
          />
        </div>
        <div className="flex-3">
          <h6 className="text-zinc-100 font-medium">{name}</h6>
          <p className="text-sm text-zinc-100/50">{timeAgo}</p>
        </div>
        <div className="relative z-1">
          <button onClick={() => setShowMenu(!showMenu)} className="p-2">
            <Ellipsis size={16} className="stroke-zinc-100/50" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-8 bg-zinc-800 rounded-2xl overflow-hidden min-w-40">
              <button
                type="button"
                className="w-full px-4 py-3 text-left text-sm text-muted hover:bg-zinc-700"
              >
                Not interested
              </button>
              <button
                type="button"
                className="w-full px-4 py-3 text-left text-sm text-muted hover:bg-zinc-700"
              >
                Mute
              </button>
              <button
                type="button"
                className="w-full px-4 py-3 text-left text-sm text-muted hover:bg-zinc-700"
              >
                Block
              </button>
              <div className="border-t border-zinc-700" />
              <button className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-zinc-700">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* stats + map */}
      <div className="bg-zinc-100/10 rounded-2xl px-2 py-2">
        <div className="flex flex-between">
          <div className="p-2 flex-1">
            <p className="text-muted">Distance</p>
            <h6 className="text-bold text-zinc-100 text-xl">
              {stats?.distanceKm ?? 0}
              <span className="ml-1.5 text-muted">km</span>
            </h6>
          </div>
          <div className="p-2 flex-1">
            <p className="text-muted">Time</p>
            <h6 className="text-bold text-zinc-100 text-xl">
              {stats?.timeMin ?? 0}
              <span className="ml-1.5 text-muted">min</span>
            </h6>
          </div>
          <div className="p-2 flex-1">
            <p className="text-muted">Pace</p>
            <h6 className="text-bold text-zinc-100 text-xl">
              {stats?.pace ?? "--"}
              <span className="ml-1.5 text-muted">/km</span>
            </h6>
          </div>
        </div>
        <RunMap coords={coords} />
      </div>

      {/* post content — 使用 prop 而非寫死 */}
      <div className="text-muted mt-4">{content}</div>

      <div className="flex items-center text-muted gap-4 mt-2">
        <button onClick={handleLike} className="flex items-center gap-1.5">
          <Heart
            size={18}
            className={
              liked ? "fill-red-500 stroke-red-500" : "stroke-zinc-100/50"
            }
          />
          <span className="text-muted text-sm">{likes}</span>
        </button>
        <button className="flex items-center gap-1.5">
          <MessageCircle size={18} className="stroke-zinc-100/50" />
          <span className="text-muted text-sm">{post?.comments ?? 3}</span>
        </button>
        <button className="flex items-center gap-1.5">
          <Share size={18} className="stroke-zinc-100/50" />
          <span className="text-muted text-sm">{post?.shares ?? 12}</span>
        </button>
      </div>
    </div>
  );
}

export default FriendPost;
