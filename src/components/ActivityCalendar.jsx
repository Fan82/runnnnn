// components/ActivityCalendar.jsx
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // 安裝 lucide-react 庫來獲得箭頭圖示
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isSameMonth,
  addMonths,
} from "date-fns";

function ActivityCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3)); // 鎖定圖片中的 2026 年 4 月

  // 1. 生成日期數據
  const generateDatesMatrix = (month) => {
    const start = startOfWeek(startOfMonth(month)); // 當月一號所在週的星期日
    const end = endOfWeek(endOfMonth(month)); // 當月最後一天所在週的星期六
    return eachDayOfInterval({ start, end }); // 生成中間所有的日子陣列
  };

  const datesMatrix = generateDatesMatrix(currentMonth);

  // 2. 定義「有活動」的日子 (為了模擬圖片中的數據)
  const activityDays = [
    "2026-04-01",
    "2026-04-03",
    "2026-04-04",
    "2026-04-06",
    "2026-04-07",
    "2026-04-08",
    "2026-04-10",
    "2026-04-12",
    "2026-04-14",
    "2026-04-17",
    "2026-04-19",
  ];

  // 切換月份函式
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));

  return (
    <div className="card">
      {/* 1. Header: 月份與箭頭 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base">{format(currentMonth, "MMMM yyyy")}</h2>
        <div className="flex gap-4 text-muted">
          <button onClick={prevMonth} className="hover:text-white transition">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextMonth} className="hover:text-white transition">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* 2. 星期欄位 (S M T W T F S) */}
      <div className="grid grid-cols-7 mb-4">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div key={`${day}-${index}`} className="text-muted px-5">
            {day}
          </div>
        ))}
      </div>
      {/* 3. 日期網格 (核心客制化區域) */}
      <div className="grid grid-cols-7 gap-y-1 gap-x-1.5">
        {datesMatrix.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isToday = isSameDay(day, new Date(2026, 3, 6)); // 鎖定圖片中的 4/6 為「今天」
          const dateStr = format(day, "yyyy-MM-dd");
          const hasActivity = activityDays.includes(dateStr);

          return (
            <div
              key={index}
              className={`
                aspect-square flex items-center justify-center 
                rounded-full transition-all duration-300 relative
                ${isCurrentMonth ? "" : "text-muted"}
              `}
            >
              {/* 日期數字本身 */}
              <span
                className={`
                text-base font-normal relative z-10
                ${isToday ? "text-zinc-800" : ""}
                ${hasActivity && !isToday ? "text-mainBrand" : ""}
                ${!hasActivity && isCurrentMonth && !isToday ? "text-zinc-100" : ""}
              `}
              >
                {format(day, "d")}
              </span>

              {/* 活動標記背景 (綠色圓圈) */}
              {hasActivity && (
                <div
                  className={`
                  absolute inset-0.5 rounded-full transition-all duration-200
                  ${isToday ? "bg-mainBrand" : "bg-mainBrand/10"}
                `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ActivityCalendar;
