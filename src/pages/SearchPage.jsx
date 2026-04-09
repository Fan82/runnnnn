import { useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const INITIAL_RECENT = [
  { id: 1, name: "Wendy", avatarImg: 21 },
  { id: 2, name: "Jason", avatarImg: 3 },
  { id: 3, name: "Mike Chen", avatarImg: 1 },
];

function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState(INITIAL_RECENT);

  const removeRecent = (id) =>
    setRecent((prev) => prev.filter((r) => r.id !== id));

  return (
    <div className="page-wrapper">
      {/* 搜尋列 */}
      <div className="relative flex justify-between items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute top-3 left-3 text-zinc-100/40"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="bg-zinc-100/10 w-full py-2.5 pl-9 pr-4 text-sm rounded-xl text-zinc-100 outline-none placeholder:text-zinc-100/30"
            placeholder="Search friends..."
          />
        </div>
        <button
          onClick={() => navigate("/friends")}
          className="text-muted text-sm shrink-0"
        >
          Cancel
        </button>
      </div>

      {/* 最近搜尋 */}
      {recent.length > 0 && (
        <>
          <div className="text-muted text-xs uppercase tracking-wide mt-6 mb-3">
            Recent
          </div>
          <div className="flex flex-col gap-1">
            {recent.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center py-2"
              >
                <div className="flex gap-3 items-center">
                  <div className="size-10 rounded-full overflow-hidden shrink-0">
                    <img
                      src={`https://i.pravatar.cc/150?img=${user.avatarImg}`}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h6 className="text-zinc-100 font-medium">{user.name}</h6>
                </div>
                <button
                  onClick={() => removeRecent(user.id)}
                  className="p-1 text-zinc-100/30"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {recent.length === 0 && !query && (
        <p className="text-muted text-sm text-center mt-16">
          No recent searches
        </p>
      )}
    </div>
  );
}

export default SearchPage;
