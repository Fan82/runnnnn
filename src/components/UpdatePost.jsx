import { useState } from "react";
import { Ellipsis, Heart, MessageCircle, Share } from "lucide-react";
import RunMap from "./RunMap";

function UpdatePost({ data }) {
  const {
    date,
    content,
    stats,
    likes: initialLikes,
    comments,
    shares,
    coords,
  } = data || {};
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes ?? 0);

  const handleLike = () => {
    setLiked((prevLiked) => {
      const nextLiked = !prevLiked;
      setLikes((prevLikes) =>
        nextLiked ? prevLikes + 1 : Math.max(0, prevLikes - 1),
      );
      return nextLiked;
    });
  };

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative w-full pb-4 inset-shadow-[0px_-1px_0px_rgba(255,255,255,0.1)]">
      {/* user info+ time */}
      <div className="flex gap-4 items-center justify-between mb-2">
        <div className="circle-avatar size-13">
          <img
            src="https://i.pravatar.cc/150?img=57"
            className="circle-avatarImage"
          />
        </div>
        <div className="flex-3">
          <h6 className="text-zinc-100 font-medium">Nora</h6>
          <p className="text-sm text-zinc-100/50">{date || "Today"}</p>
        </div>
        <div className="relative z-1">
          <button onClick={() => setShowMenu(!showMenu)} className="p-2">
            <Ellipsis size={16} className="stroke-zinc-100/50" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-8 bg-zinc-800 rounded-2xl overflow-hidden min-w-40">
              <button className="w-full text-left px-4 py-3 text-sm text-zinc-100 hover:bg-zinc-700">
                Not interested
              </button>
              <button className="w-full text-left px-4 py-3 text-sm text-zinc-100 hover:bg-zinc-700">
                Mute
              </button>
              <button className="w-full text-left px-4 py-3 text-sm text-zinc-100 hover:bg-zinc-700">
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
      {/* data */}
      <div className="card my-4">
        <div className="flex flex-between ">
          <div className="p-2 flex-1">
            <p className="text-muted">Distance</p>
            <h6 className="text-bold text-mainBrand text-xl">
              {stats?.distance || "0"}
              <span className="text-sm ml-1 text-muted">km</span>
            </h6>
          </div>
          <div className="p-2 flex-1">
            <p className="text-muted">Time</p>
            <h6 className="text-bold text-mainBrand text-xl">
              {stats?.time || "0"}
              <span className="ml-1.5 text-muted">min</span>
            </h6>
          </div>
          <div className="p-2 flex-1">
            <p className="text-muted">Pace</p>
            <h6 className="text-bold text-mainBrand text-xl">
              {stats?.pace || "0"}
              <span className="ml-1.5 text-muted">/km</span>
            </h6>
          </div>
        </div>
        <RunMap coords={Array.isArray(coords) ? coords : []} />
      </div>
      <div className="text-muted my-4 text-sm">{content}</div>
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
          <span className="text-muted text-sm">{comments ?? 0}</span>
        </button>

        <button className="flex items-center gap-1.5">
          <Share size={18} className="stroke-zinc-100/50" />
          <span className="text-muted text-sm">{shares ?? 0}</span>
        </button>
      </div>
    </div>
  );
}

export default UpdatePost;
