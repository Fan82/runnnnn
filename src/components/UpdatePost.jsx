import { useState } from "react";
import { Ellipsis, Heart, MessageCircle, Share } from "lucide-react";
import RunMap from "./RunMap";

function FriendPost() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative w-full pb-4 inset-shadow-[0px_-1px_0px_rgba(255,255,255,0.1)]">
      {/* user info+ time */}
      <div className="flex gap-4 items-center justify-between mb-2">
        <div className="circle-avatar size-13">
          <img
            src="https://i.pravatar.cc/150?img=1"
            className="circle-avatarImage"
          />
        </div>
        <div className="flex-3">
          <h6 className="text-zinc-100 font-medium">Nora</h6>
          <p className="text-sm text-zinc-100/50">20/04/2026</p>
        </div>
        <div className="relative z-1">
          <button onClick={() => setShowMenu(!showMenu)} className="p-2">
            <Ellipsis size={16} className="stroke-zinc-100/50" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-8 bg-zinc-800 rounded-2xl overflow-hidden min-w-40">
              <button className="w-full text-left text-nowrap px-4 py-3 text-sm text-zinc-100 hover:bg-zinc-700">
                Archive
              </button>
              <button className="w-full text-left text-nowrap px-4 py-3 text-sm text-zinc-100 hover:bg-zinc-700">
                Hide like count
              </button>
              <button className="w-full text-left text-nowrap px-4 py-3 text-sm text-zinc-100 hover:bg-zinc-700">
                Turn off commenting
              </button>
              <div className="border-t border-zinc-700" />
              <button className="w-full text-left text-nowrap px-4 py-3 text-sm text-red-400 hover:bg-zinc-700">
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
              18.4
              <span className="ml-1.5 text-muted">km</span>
            </h6>
          </div>
          <div className="p-2 flex-1">
            <p className="text-muted">Time</p>
            <h6 className="text-bold text-mainBrand text-xl">
              32
              <span className="ml-1.5 text-muted">min</span>
            </h6>
          </div>
          <div className="p-2 flex-1">
            <p className="text-muted">Pace</p>
            <h6 className="text-bold text-mainBrand text-xl">
              6'09"
              <span className="ml-1.5 text-muted">/km</span>
            </h6>
          </div>
        </div>
        {/* <RunMap coords={coords} /> */}
      </div>
      {/* Post typing */}
      <div className="text-muted my-4">
        Moring run in the park! Feel AMAZING 🌞
      </div>
      <div className="flex items-center text-muted gap-4 mt-2">
        <button className="flex items-center gap-1.5">
          <Heart size={18} className="stroke-zinc-100/50" />
          <span className="text-muted text-sm">14</span>
        </button>

        <button className="flex items-center gap-1.5">
          <MessageCircle size={18} className="stroke-zinc-100/50" />
          <span className="text-muted text-sm">3</span>
        </button>

        <button className="flex items-center gap-1.5">
          <Share size={18} className="stroke-zinc-100/50" />
          <span className="text-muted text-sm">12</span>
        </button>
      </div>
    </div>
  );
}

export default FriendPost;
