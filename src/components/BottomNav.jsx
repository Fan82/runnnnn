import { useNavigate, useLocation } from "react-router-dom";
// 假設你使用 lucide-react，或者換成你自己的圖示元件
import { Calendar, Users, Play, Map, User } from "lucide-react";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. 在 items 中新增 icon 屬性
  const items = [
    { label: "Today", path: "/", icon: Calendar },
    { label: "Friends", path: "/friends", icon: Users },
    { label: "Go", path: "/running", icon: Play },
    { label: "Map", path: "/map", icon: Map },
    { label: "Me", path: "/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 right-0 left-0 w-full flex items-end justify-center bg-bg z-1 pb-1">
      {items.map((item, index) => {
        const active = location.pathname === item.path;
        const isMiddle = index === 2;
        const Icon = item.icon; // 取得目前的 Icon 元件

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`relative flex-1 flex flex-col items-center gap-0.5 p-3 transition-all 
              ${isMiddle ? "relative flex-[1.5] scale-110" : "flex-1"} 
              ${isMiddle ? "" : active ? "text-mainBrand inset-shadow-md" : "text-zinc-100/50"}
            `}
          >
            {/* 圖示圓圈容器 */}
            <div
              className={`flex items-center justify-center rounded-full transition-all 
                ${
                  isMiddle
                    ? "absolute -top-13 size-16 bg-mainBrand shadow-lg ring-4 ring-bg" // 中間大圓圈，加了 ring 效果讓視覺更乾淨
                    : "size-8"
                } 
                ${!isMiddle && (active ? "bg-mainBrand/20" : "bg-zinc-50/10")}
              `}
            >
              {/* 2. 渲染 Icon */}
              <Icon
                size={isMiddle ? 32 : 20}
                className={`${isMiddle ? "text-zinc-800 opacity-0" : active ? "text-mainBrand" : "text-zinc-100/50"}`}
              />
            </div>

            {/* 文字標籤 */}
            <span
              className={`${isMiddle ? "absolute -top-10 text-4xl text-zinc-800 font-bold italic" : "text-xs opacity-100 mt-2"} `}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default BottomNav;
