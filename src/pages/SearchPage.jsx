import { Search, X } from "lucide-react";
import FriendList from "../components/FriendList";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <div className="relative flex justify-between items-center">
        <Search size={16} className="absolute top-2.5 left-2" />
        <input
          type="text"
          className="bg-zinc-50/2 w-full p-2 pl-8 text-sm rounded-lg text-zinc-100"
          placeholder="Search"
        />
        <button
          onClick={() => navigate("/friends")}
          className="text-muted pl-3"
        >
          Cancel
        </button>
      </div>
      <div className="text-muted py-4">Recently Search</div>
      <div className="flex justify-between items-center">
        <FriendList
          list={{
            name: "Mike Chen",
          }}
        />
        <X size={20} />
      </div>
      <div className="flex justify-between items-center">
        <FriendList
          list={{
            name: "Mike Chen",
          }}
        />
        <X size={20} />
      </div>
    </div>
  );
}

export default SearchPage;
