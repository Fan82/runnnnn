import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import RunMap from "../components/RunMap";
import { getLatestRun, formatTime } from "../utils/runStorage";

function RunSummary() {
  const navigate = useNavigate();
  const location = useLocation();

  // 優先使用路由帶過來的資料，沒有的話 fallback 讀 localStorage 最新一筆
  const run = location.state?.run || getLatestRun();

  if (!run) {
    return (
      <div className="page-wrapper flex flex-col items-center justify-center min-h-screen">
        <p className="text-muted mb-4">No run data found.</p>
        <button onClick={() => navigate("/")} className="button-main max-w-xs">
          Back to Home
        </button>
      </div>
    );
  }

  const dateLabel = new Date(run.date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="page-wrapper">
      <div className="relative -top-4">
        <div className="nav right-auto left-0">
          <button
            onClick={() => navigate("/")}
            className="bg-zinc-100/10 rounded-4xl p-2"
          >
            <ChevronLeft size={20} className="text-zinc-100" />
          </button>
        </div>
        <p className="text-muted text-center mt-2">{dateLabel}</p>
        <h2 className="header-Font text-center">Run Complete 🎉</h2>
      </div>

      {run.coords && run.coords.length > 0 && (
        <div className="mb-4">
          <RunMap coords={run.coords} live={false} height={220} />
        </div>
      )}

      <div className="card w-full mb-4 bg-radial-[at_25%_25%] from-mainBrand to-[#0cf0a0] shadow-lg shadow-[#05df72]/20">
        <p className="text-zinc-800 italic font-bold text-sm uppercase tracking-wide">
          Total distance
        </p>
        <h3 className="text-6xl mt-3 mb-1 text-zinc-800 italic font-bold leading-none">
          {run.distance.toFixed(2)}
          <span className="text-3xl ml-1.5">km</span>
        </h3>
      </div>

      <div className="flex-between gap-2 mb-4">
        <div className="card text-center">
          <p className="text-muted">Duration</p>
          <h6 className="text-bold text-2xl mt-2 text-zinc-100">
            {formatTime(run.time)}
          </h6>
        </div>
        <div className="card text-center">
          <p className="text-muted">Avg. Pace</p>
          <h6 className="text-bold text-2xl mt-2 text-zinc-100">
            {run.pace}
            <span className="text-muted text-xs block">min/km</span>
          </h6>
        </div>
        <div className="card text-center">
          <p className="text-muted">Calorie</p>
          <h6 className="text-bold text-2xl mt-2 text-zinc-100">
            {run.calorie}
            <span className="text-muted text-xs block">kcal</span>
          </h6>
        </div>
      </div>

      <button onClick={() => navigate("/")} className="button-main">
        Done
      </button>
    </div>
  );
}

export default RunSummary;
