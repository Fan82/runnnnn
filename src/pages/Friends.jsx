import { useNavigate } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import FriendPost from "../components/FriendPost";
import BottomNav from "../components/BottomNav";
import { MOCK_POSTS, MOCK_USERS } from "../data/mockData";

const STORY_USERS = MOCK_USERS.slice(0, 5);

function Friends() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper pb-24">
      <div className="header">
        <div className="nav">
          <button onClick={() => navigate("/searchpage")} className="p-3">
            <Search size={16} />
          </button>
          <button onClick={() => navigate("/creatpost")} className="p-2">
            <Plus />
          </button>
        </div>
        <h6 className="header-Font">Friends</h6>
      </div>

      {/* Story 區塊 — 統一尺寸 56px，頭像加名字 */}
      <div className="flex gap-4 w-full mt-12 overflow-x-auto snap-x no-scrollbar py-2">
        {/* 新增 Story 按鈕 */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="size-14 rounded-full bg-zinc-100/10 border-2 border-dashed border-zinc-100/30 flex items-center justify-center">
            <Plus size={20} className="text-zinc-100/50" />
          </div>
          <span className="text-xs text-zinc-100/40 w-14 text-center truncate">
            Your story
          </span>
        </div>

        {STORY_USERS.map((user, index) => (
          <div
            key={user.id}
            className="flex flex-col items-center gap-1 shrink-0"
          >
            <div
              className={`size-14 rounded-full overflow-hidden border-2 ${
                index < 2 ? "border-mainBrand" : "border-zinc-100/20"
              }`}
            >
              <img
                src={`https://i.pravatar.cc/150?img=${user.avatarId}`}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-zinc-100/50 w-14 text-center truncate">
              {user.name.split(" ")[0]}
            </span>
          </div>
        ))}
      </div>

      {/* 貼文列表 — 使用真實資料，不重複三倍 */}
      <div className="mt-6 flex flex-col gap-4">
        {MOCK_POSTS.map((post) => (
          <FriendPost key={post.id} post={post} />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}

export default Friends;
