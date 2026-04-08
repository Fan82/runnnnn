import { Search, X } from "lucide-react";
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
        <div className="flex gap-1.5 items-center py-3 w-full mb-2">
          <div className="circle-avatar size-8">
            <img
              src="https://i.pravatar.cc/150?img=21"
              className="circle-avatarImage"
            />
          </div>
          <div>
            <h6 className="text-zinc-100 font-medium">Wendy</h6>
          </div>
        </div>
        <X size={20} />
      </div>
    </div>
  );
}

export default SearchPage;
