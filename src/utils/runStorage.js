// 跑步紀錄的 localStorage 存取工具
// 之後若要改接 Supabase，主要會替換這個檔案內的函式實作

import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  addDays,
  subWeeks,
  subMonths,
  format,
} from "date-fns";

const RUNS_KEY = "run_history";
const LATEST_RUN_KEY = "latest_run";

// 兩點間距離（km）— Haversine 公式
export const calcDistance = (a, b) => {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
};

// 配速字串，例如 6'09"
export const calcPace = (distKm, seconds) => {
  if (distKm <= 0 || seconds <= 0) return "--";
  const paceSeconds = seconds / distKm;
  const m = Math.floor(paceSeconds / 60);
  const s = Math.floor(paceSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}'${s}"`;
};

// 估算消耗卡路里
export const calcCalorie = (distKm) => {
  if (distKm <= 0) return 0;
  return Math.round(distKm * 65 * 1.036);
};

// 時間格式化 mm:ss
export const formatTime = (s) => {
  const m = Math.floor(s / 60)
    .toString()
    .padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};

// 儲存一筆跑步紀錄，回傳該筆紀錄（含 id）
export const saveRun = (run) => {
  const record = {
    id: `run_${Date.now()}`,
    date: new Date().toISOString(),
    coords: run.coords,
    distance: run.distance,
    time: run.time,
    pace: calcPace(run.distance, run.time),
    calorie: calcCalorie(run.distance),
  };

  try {
    const history = getRunHistory();
    history.unshift(record);
    localStorage.setItem(RUNS_KEY, JSON.stringify(history));
    localStorage.setItem(LATEST_RUN_KEY, JSON.stringify(record));
  } catch (e) {
    console.error("Failed to save run:", e);
  }

  return record;
};

// 取得所有歷史跑步紀錄（新到舊）
export const getRunHistory = () => {
  try {
    const raw = localStorage.getItem(RUNS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to read run history:", e);
    return [];
  }
};

// 取得最新一筆跑步紀錄（用於 Run Summary 頁）
export const getLatestRun = () => {
  try {
    const raw = localStorage.getItem(LATEST_RUN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("Failed to read latest run:", e);
    return null;
  }
};

// 將某段區間內的跑步紀錄依「日期」加總里程
// runs: 全部紀錄；start/end: date-fns 的 Interval
const sumDistanceByDay = (runs, start, end) => {
  const days = eachDayOfInterval({ start, end });
  return days.map((day) =>
    runs
      .filter((r) => isSameDay(new Date(r.date), day))
      .reduce((sum, r) => sum + r.distance, 0),
  );
};

const sumDistanceInRange = (runs, start, end) =>
  runs
    .filter((r) => isWithinInterval(new Date(r.date), { start, end }))
    .reduce((sum, r) => sum + r.distance, 0);

// 本週（週一到今天）每日里程 + 本週總里程 + 與上週同期比較
// weekStartsOn: 1 = 週一（與 ActivityCalendar 的週曆顯示一致可自行調整）
export const getWeeklyStats = (weekStartsOn = 1) => {
  const runs = getRunHistory();
  const today = new Date();

  const thisWeekStart = startOfWeek(today, { weekStartsOn });
  const thisWeekEnd = endOfWeek(today, { weekStartsOn });

  // 本週資料只顯示到「今天」，今天之後的格子顯示 0
  const dailyDistances = sumDistanceByDay(runs, thisWeekStart, thisWeekEnd).map(
    (val, i) => {
      const day = addDays(thisWeekStart, i);
      return day > today ? 0 : val;
    },
  );

  const totalKm = dailyDistances.reduce((sum, v) => sum + v, 0);

  // 上週同期（同樣只算到對應的星期幾，做公平比較）
  const lastWeekStart = subWeeks(thisWeekStart, 1);
  const daysSinceWeekStart =
    Math.floor((today - thisWeekStart) / (1000 * 60 * 60 * 24)) + 1;
  const lastWeekComparableEnd = addDays(lastWeekStart, daysSinceWeekStart - 1);
  const lastWeekTotalKm = sumDistanceInRange(
    runs,
    lastWeekStart,
    lastWeekComparableEnd,
  );

  return {
    dailyDistances, // 長度 7，週一到週日（依 weekStartsOn）
    totalKm,
    diffFromLastWeek: totalKm - lastWeekTotalKm, // 正數＝比上週多
  };
};

// 計算「連續有跑步紀錄的天數」(streak)
// 從今天往回算，只要某天有 >=1 筆紀錄就算 1 天，中斷即停止
const countStreak = (runs, fromDate) => {
  let streak = 0;
  let cursor = fromDate;
  // 最多回算 365 天，避免資料量大時無限迴圈
  for (let i = 0; i < 365; i++) {
    const hasRun = runs.some((r) => isSameDay(new Date(r.date), cursor));
    if (!hasRun) break;
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
};

// 目前連續天數 + 與「7 天前的連續天數」比較（用於 Home 大卡片文案）
export const getStreakStats = (total = 14) => {
  const runs = getRunHistory();
  const today = new Date();

  const currentStreak = countStreak(runs, today);
  // 與上週同一天為止的 streak 比較，用來顯示 "more/less than last week"
  const lastWeekStreak = countStreak(runs, addDays(today, -7));

  return {
    streakDays: currentStreak,
    streakTotal: total,
    diffFromLastWeek: currentStreak - lastWeekStreak,
  };
};

// 指定月份「有跑步紀錄的天數」+ 與上個月同期比較
export const getMonthlyStats = (date = new Date()) => {
  const runs = getRunHistory();

  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const today = new Date();
  // 若是當月，只算到今天；若是過去月份，算整月
  const effectiveEnd = monthEnd > today ? today : monthEnd;

  const activeDays = new Set(
    runs
      .filter((r) =>
        isWithinInterval(new Date(r.date), {
          start: monthStart,
          end: effectiveEnd,
        }),
      )
      .map((r) => format(new Date(r.date), "yyyy-MM-dd")),
  ).size;

  const totalDaysInMonth =
    Math.floor((monthEnd - monthStart) / (1000 * 60 * 60 * 24)) + 1;

  // 上個月同期（同樣只算到對應的天數，做公平比較）
  const lastMonthDate = subMonths(date, 1);
  const lastMonthStart = startOfMonth(lastMonthDate);
  const daysElapsed =
    Math.floor((effectiveEnd - monthStart) / (1000 * 60 * 60 * 24)) + 1;
  const lastMonthComparableEnd = addDays(lastMonthStart, daysElapsed - 1);

  const lastMonthActiveDays = new Set(
    runs
      .filter((r) =>
        isWithinInterval(new Date(r.date), {
          start: lastMonthStart,
          end: lastMonthComparableEnd,
        }),
      )
      .map((r) => format(new Date(r.date), "yyyy-MM-dd")),
  ).size;

  return {
    activeDays,
    totalDaysInMonth,
    diffFromLastMonth: activeDays - lastMonthActiveDays,
  };
};

// 全部跑步紀錄的總覽（總里程 / 總次數 / 最佳配速）
export const getOverallStats = () => {
  const runs = getRunHistory();

  const totalKm = runs.reduce((sum, r) => sum + r.distance, 0);
  const totalRuns = runs.length;

  // 最佳配速：distance/time 換算成「每公里秒數」最小的那筆
  let bestPace = "--";
  let bestPaceSeconds = Infinity;
  runs.forEach((r) => {
    if (r.distance > 0 && r.time > 0) {
      const paceSeconds = r.time / r.distance;
      if (paceSeconds < bestPaceSeconds) {
        bestPaceSeconds = paceSeconds;
        bestPace = r.pace;
      }
    }
  });

  return {
    totalKm: Math.round(totalKm * 10) / 10,
    totalRuns,
    bestPace,
  };
};

// 指定月份中「有跑步紀錄的日期」陣列，格式 yyyy-MM-dd（供 ActivityCalendar 使用）
export const getActivityDatesInMonth = (date = new Date()) => {
  const runs = getRunHistory();
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);

  const dates = new Set(
    runs
      .filter((r) =>
        isWithinInterval(new Date(r.date), {
          start: monthStart,
          end: monthEnd,
        }),
      )
      .map((r) => format(new Date(r.date), "yyyy-MM-dd")),
  );

  return Array.from(dates);
};
