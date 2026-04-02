import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
// import TabButton from "../components/TabButton";
import FriendRow from "../components/FriendRow";
import { supabase } from "../supabase";

function Home() {
  const navigate = useNavigate();
  // 登出函式
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };
  return (
    <div className="page-wrapper">
      {/* <div className="sticky top-0 left-0 right-0 w-full bg-bg">
        <TabButton label="Record" active={true} />
        <TabButton label="Updates" active={false} />
        <TabButton label="Photos" active={false} />
      </div> */}

      {/* greeting */}
      <span className="text-muted">Good morning</span>
      <h2 className="text-bold text-2xl mb-4">Timmy Chan</h2>
      {/* User's ranking */}
      <div className="mt-3 mb-3">
        {/* stats big card */}
        <div className="card w-full mb-4 bg-zinc-100/10">
          <p className="text-muted">continued running streak</p>
          <h3 className="text-5xl text-bold mt-4 mb-4">
            12<span className="ml-1.5">days</span>
          </h3>
          <p className="text-muted">more than last week, keep it up!</p>
        </div>
        <div className="flex-between">
          {/* stats small cards */}
          <div className="card">
            <p className="text-muted">Weekly distance</p>
            <h6 className="text-bold mt-3">
              18.4<span className="ml-1.5">km</span>
            </h6>
          </div>
          <div className="card">
            <p className="text-muted">Monthly times</p>
            <h6 className="text-bold mt-3">
              14<span className="ml-1.5">times</span>
            </h6>
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
      </div>
      {/*start running button*/}
      <button onClick={() => navigate("/running")} className="button-main">
        Start running
      </button>
      {/* log out */}
      <button onClick={handleSignOut} className="bg-blue-900">
        Sign out
      </button>

      <BottomNav />
    </div>
  );
}

export default Home;
