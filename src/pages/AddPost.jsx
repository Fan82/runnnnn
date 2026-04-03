import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AddPost() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <div className="header">
        <div className="nav right-auto left-4">
          {/* 左上返回 */}
          <div className="absolute left-4 top-4 z-10">
            <button
              onClick={() => navigate("/")}
              className="bg-zinc-800/80 rounded-4xl p-2"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
