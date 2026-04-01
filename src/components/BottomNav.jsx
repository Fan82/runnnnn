import { useNavigate, useLocation } from "react-router-dom";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { label: "Home", path: "/" },
    { label: "Friends", path: "/friends" },
    { label: "Map", path: "/map" },
    { label: "Me", path: "/profile" },
  ];

  return (
    <div className="sticky bottom-0 right-0 left-0 w-full flex justify-center bg-bg z-2">
      {items.map((item) => {
        const active = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-4/12 flex flex-col items-center gap-0.5 p-3 ${active ? "text-mainBrand" : "text-zinc-100/50"}`}
          >
            <div
              className={`w-6 h-6 rounded-full ${active ? "bg-mainBrand" : "bg-zinc-50/10"}`}
            ></div>
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export default BottomNav;
