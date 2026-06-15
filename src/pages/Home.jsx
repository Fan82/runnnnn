import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import FriendRow from "../components/FriendRow";
import { MOCK_USERS } from "../data/mockData";
import { TrendingUp, TrendingDown, Bell } from "lucide-react";
import {
  getWeeklyStats,
  getStreakStats,
  getMonthlyStats,
} from "../utils/runStorage";
import { format } from "date-fns";

function Home() {
  const navigate = useNavigate();
  const sortedFriends = [...MOCK_USERS].sort((a, b) => b.weeklyKm - a.weeklyKm);

  const today = new Date();
  const {
    dailyDistances,
    totalKm: weeklyKm,
    diffFromLastWeek: weeklyDiff,
  } = getWeeklyStats();
  const weeklyMax = Math.max(...dailyDistances, 1); // 避免全 0 時除以 0

  const {
    streakDays,
    streakTotal,
    diffFromLastWeek: streakDiff,
  } = getStreakStats();

  const {
    activeDays,
    totalDaysInMonth,
    diffFromLastMonth: monthlyDiff,
  } = getMonthlyStats(today);

  // streak 文案：依本週與上週的連續天數差異呈現
  const streakMessage =
    streakDiff > 0
      ? `${streakDiff} day${streakDiff > 1 ? "s" : ""} more than last week, keep it up!`
      : streakDiff < 0
        ? `${Math.abs(streakDiff)} day${Math.abs(streakDiff) > 1 ? "s" : ""} less than last week, let's catch up!`
        : "same as last week, keep going!";

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
        <span className="text-muted">{format(today, "d MMMM yyyy")}</span>
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
            {streakDays}
            <span className="text-3xl ml-1.5">days</span>
          </h3>
          <p className="text-zinc-800 italic font-bold mb-4">{streakMessage}</p>

          {/* Streak progress dots */}
          <div className="flex gap-1.5">
            {Array.from({ length: streakTotal }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1.5 rounded-full transition-all ${
                  i < streakDays ? "bg-zinc-800" : "bg-zinc-800/20"
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
              {weeklyKm.toFixed(1)}
              <span className="text-muted ml-1">km</span>
            </h6>
            <div className="flex items-end gap-0.5 h-7 mb-2">
              {dailyDistances.map((val, i) => {
                const isToday = i === dailyDistances.length - 1;
                const heightPct = (val / weeklyMax) * 100;
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
            <p
              className={`inline text-xs font-medium rounded-4xl px-2 py-1 ${
                weeklyDiff >= 0
                  ? "text-mainBrand bg-mainBrand/10"
                  : "text-red-500 bg-red-500/10"
              }`}
            >
              {weeklyDiff >= 0 ? (
                <TrendingUp size={14} className="inline mr-2" />
              ) : (
                <TrendingDown size={14} className="inline mr-2" />
              )}
              {Math.abs(weeklyDiff).toFixed(1)} km
            </p>
          </div>
          <div className="card">
            <p className="text-muted">Monthly days</p>
            <h6 className="text-bold text-2xl mt-2 mb-2 text-zinc-100">
              {activeDays}
              <span className="text-muted ml-1">days</span>
            </h6>

            {/* Progress bar */}
            <div className="w-full bg-zinc-100/10 rounded-full h-1.5 mb-1">
              <div
                className="bg-mainBrand/50 h-1.5 rounded-full"
                style={{
                  width: `${Math.min((activeDays / totalDaysInMonth) * 100, 100)}%`,
                }}
              />
            </div>
            <p className="text-muted text-xs mb-2">
              {activeDays} / {totalDaysInMonth} days
            </p>

            <p
              className={`inline text-xs font-medium rounded-4xl px-2 py-1 ${
                monthlyDiff >= 0
                  ? "text-mainBrand bg-mainBrand/10"
                  : "text-red-500 bg-red-500/10"
              }`}
            >
              {monthlyDiff >= 0 ? (
                <TrendingUp size={14} className="inline mr-1" />
              ) : (
                <TrendingDown size={14} className="inline mr-1" />
              )}
              {Math.abs(monthlyDiff)} days
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
