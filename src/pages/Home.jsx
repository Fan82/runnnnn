import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
// import TabButton from "../components/TabButton";
import FriendRow from "../components/FriendRow";
import { supabase } from "../supabase";
import { TrendingUp, TrendingDown } from "lucide-react";

function Home() {
  const navigate = useNavigate();
  // 登出函式
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };
  return (
    <div className="page-wrapper">
      {/* greeting */}
      <span className="text-muted">20 April 2026</span>
      <h2 className="text-bold text-2xl mb-4">Nora</h2>
      {/* User's ranking */}
      <div className="mb-6">
        {/* stats big card */}
        <div className="card w-full mb-4 bg-mainBrand text-zinc-100">
          <p className="text-muted text-zinc-100">continued running streak</p>
          <h3 className="text-5xl text-bold mt-4 mb-4 text-zinc-100">
            12<span className="ml-1.5">days</span>
          </h3>
          <p className="text-muted text-zinc-100">
            more than last week, keep it up!
          </p>
        </div>
        <div className="flex-between">
          {/* stats small cards */}
          <div className="card">
            <p className="text-muted">Weekly distance</p>
            <h6 className="text-bold text-2xl mt-2 mb-1 text-mainBrand">
              18.4<span className="text-sm font-medium ml-1">km</span>
            </h6>
            <p className="inline text-mainBrand text-xs font-medium bg-mainBrand/10 rounded-4xl px-2 py-0.5">
              <TrendingUp size={14} className="inline mr-2" />4 km
            </p>
          </div>
          <div className="card">
            <p className="text-muted">Monthly days</p>
            <h6 className="text-bold text-2xl mt-2 mb-1 text-mainBrand">
              14<span className="text-sm font-medium ml-1">days</span>
            </h6>
            <p className="inline text-red-500 text-xs font-medium bg-red-500/10 rounded-4xl px-2 py-0.5">
              <TrendingDown size={14} className="inline mr-2" />2 days
            </p>
          </div>
        </div>
      </div>
      {/* friend's ranking */}
      <p className="mb-3">Friend's ranking</p>
      <div className="flex-between flex-col">
        <FriendRow
          row={{
            name: "Mike Chen",
            lastRun: "2 hours ago",
            stats: { distanceKm: 5.2, timeMin: 32, pace: "6'09\"" },
            weeklyKm: "42",
          }}
        />
        <FriendRow
          row={{
            name: "Alison",
            lastRun: "4 hours ago",
            stats: { distanceKm: 2.2, timeMin: 20, pace: "8'09\"" },
            weeklyKm: "42",
          }}
        />
        <FriendRow
          row={{
            name: "Mike Chen",
            lastRun: "2 hours ago",
            stats: { distanceKm: 5.2, timeMin: 32, pace: "6'09\"" },
            weeklyKm: "42",
          }}
        />
        <FriendRow
          row={{
            name: "Alison",
            lastRun: "4 hours ago",
            stats: { distanceKm: 2.2, timeMin: 20, pace: "8'09\"" },
            weeklyKm: "42",
          }}
        />
        <FriendRow
          row={{
            name: "Mike Chen",
            lastRun: "2 hours ago",
            stats: { distanceKm: 5.2, timeMin: 32, pace: "6'09\"" },
            weeklyKm: "42",
          }}
        />
        <FriendRow
          row={{
            name: "Alison",
            lastRun: "4 hours ago",
            stats: { distanceKm: 2.2, timeMin: 20, pace: "8'09\"" },
            weeklyKm: "42",
          }}
        />
      </div>
      {/*start running button*/}
      {/* <button onClick={() => navigate("/running")} className="button-main">
        Start running
      </button> */}
      {/* log out */}
      <button onClick={handleSignOut} className="bg-blue-900 opacity-0">
        Sign out
      </button>
      <BottomNav />
    </div>
  );
}

export default Home;
