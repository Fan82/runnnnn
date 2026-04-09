import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import FriendRow from "../components/FriendRow";
import { supabase } from "../supabase";
import { MOCK_USERS } from "../data/mockData";
import { TrendingUp, TrendingDown, Bell } from "lucide-react";

// 本週每日跑量資料（週一到今天，單位 km）
const WEEKLY_DATA = [2.1, 4.5, 0, 5.2, 3.8, 6.0, 18.4];
const WEEKLY_MAX = Math.max(...WEEKLY_DATA);

// Streak 連續天數
const STREAK_DAYS = 7;
const STREAK_TOTAL = 14; // 顯示格子總數

function Home() {
  const navigate = useNavigate();
  const sortedFriends = [...MOCK_USERS].sort((a, b) => b.weeklyKm - a.weeklyKm);

  return (
    <div className="page-wrapper">
      <div className="relative -top-4">
        <div className="nav">
          <div className="dot bg-red-500 absolute w-2 h-2 rounded-full right-2 top-5 ring-2 ring-bg"></div>
          <button
            onClick={() => navigate("/creatpost")}
            className="p-2 bg-zinc-100/10 rounded-lg"
          >
            <Bell />
          </button>
        </div>
        <span className="text-muted">20 April 2026</span>
        <h2 className="header-Font">Nora</h2>
      </div>
      {/* User's ranking */}
      <div className="mb-6">
        {/* stats big card */}
        <div className="card w-full mb-4 bg-radial-[at_25%_25%] from-mainBrand to-[#0cf0a0] shadow-lg shadow-[#05df72]/20">
          <p className="text-zinc-800 italic font-bold text-sm uppercase tracking-wide">
            continued running streak
          </p>
          <h3 className="text-6xl text-bold mt-3 mb-1 text-zinc-800 italic font-bold leading-none">
            {STREAK_DAYS}
            <span className="text-3xl ml-1.5">days</span>
          </h3>
          <p className="text-zinc-800 italic font-bold mb-4">
            more than last week, keep it up!
          </p>

          {/* Streak progress dots */}
          <div className="flex gap-1.5">
            {Array.from({ length: STREAK_TOTAL }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1.5 rounded-full transition-all ${
                  i < STREAK_DAYS ? "bg-zinc-800" : "bg-zinc-800/20"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex-between">
          {/* stats small cards */}
          <div className="card">
            <p className="text-muted">Weekly distance</p>
            <h6 className="text-bold text-2xl mt-2 mb-1 text-zinc-100">
              18.4<span className="text-muted ml-1">km</span>
            </h6>
            <div className="flex items-end gap-0.5 h-7 mb-2">
              {WEEKLY_DATA.map((val, i) => {
                const isToday = i === WEEKLY_DATA.length - 1;
                const heightPct = WEEKLY_MAX > 0 ? (val / WEEKLY_MAX) * 100 : 0;
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-sm transition-all ${
                      isToday ? "bg-mainBrand" : "bg-mainBrand/20"
                    }`}
                    style={{ height: `${Math.max(heightPct, 8)}%` }}
                  />
                );
              })}
            </div>
            <p className="inline text-mainBrand text-xs font-medium bg-mainBrand/10 rounded-4xl px-2 py-1">
              <TrendingUp size={14} className="inline mr-2" />4 km
            </p>
          </div>
          <div className="card">
            <p className="text-muted">Monthly days</p>
            <h6 className="text-bold text-2xl mt-2 mb-2 text-zinc-100">
              25<span className="text-muted ml-1">days</span>
            </h6>

            {/* Progress bar */}
            <div className="w-full bg-zinc-100/10 rounded-full h-1.5 mb-1">
              <div
                className="bg-mainBrand/50 h-1.5 rounded-full"
                style={{ width: `${(25 / 30) * 100}%` }}
              />
            </div>
            <p className="text-muted text-xs mb-2">25 / 30 days</p>

            <p className="inline text-red-500 text-xs font-medium bg-red-500/10 rounded-4xl px-2 py-1">
              <TrendingDown size={14} className="inline mr-1" />2 days
            </p>
          </div>
        </div>
      </div>
      {/* friend's ranking */}
      <p className="mb-3 text-muted">Friend's ranking</p>
      <div className="flex-between flex-col">
        {sortedFriends.map((friend, index) => (
          <FriendRow
            key={friend.id}
            rank={index + 1}
            row={{
              name: friend.name,
              lastRun: friend.lastRun,
              stats: { pace: friend.pace },
              weeklyKm: friend.weeklyKm,
              avatar: friend.avatarId,
            }}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}

export default Home;
