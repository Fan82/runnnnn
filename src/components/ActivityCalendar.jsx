import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3));

  const generateDatesMatrix = (month) => {
    const start = startOfWeek(startOfMonth(month));
    const end = endOfWeek(endOfMonth(month));
    return eachDayOfInterval({ start, end });
  };

  const datesMatrix = generateDatesMatrix(currentMonth);

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

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));

  // 使用實際今天日期，不再寫死
  const today = new Date();

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-muted">{format(currentMonth, "MMMM yyyy")}</h2>
        <div className="flex gap-4 text-muted">
          <button onClick={prevMonth} className="hover:text-white transition">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextMonth} className="hover:text-white transition">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-4">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div key={`${day}-${index}`} className="text-muted px-5">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 gap-x-1.5">
        {datesMatrix.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isToday = isSameDay(day, today);
          const dateStr = format(day, "yyyy-MM-dd");
          const hasActivity = activityDays.includes(dateStr);

          return (
            <div
              key={index}
              className="aspect-square flex items-center justify-center rounded-full transition-all duration-300 relative"
            >
              <span
                className={`
                  text-base font-normal relative z-10
                  ${isToday ? "text-zinc-800" : ""}
                  ${hasActivity && !isToday ? "text-mainBrand" : ""}
                  ${!hasActivity && isCurrentMonth && !isToday ? "text-zinc-100" : ""}
                  ${!isCurrentMonth ? "text-zinc-100/30" : ""}
                `}
              >
                {format(day, "d")}
              </span>
              {(isToday || hasActivity) && (
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
