import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Search,
  LocateFixed,
  Bookmark,
  Share,
  ChevronLeft,
} from "lucide-react";

const GROUPS_DATA = [
  {
    id: 1,
    name: "Morning Crew 🌞",
    count: 6,
    distance: "5km",
    time: "7am",
    avatars: [1, 2, 3],
    lat: 25.038,
    lng: 121.56,
  },
  {
    id: 2,
    name: "Trail Runners 🏔️",
    count: 3,
    distance: "10km",
    time: "8am",
    avatars: [4, 5, 6],
    lat: 25.029,
    lng: 121.572,
  },
  {
    id: 3,
    name: "Night Owls 🌙",
    count: 8,
    distance: "3km",
    time: "9pm",
    avatars: [7, 8, 9],
    lat: 25.041,
    lng: 121.578,
  },
];

function GroupCard({ group }) {
  const [saved, setSaved] = useState(false);
  const fallbackAvatar =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150'><rect width='100%' height='100%' fill='%233f3f46'/><circle cx='75' cy='58' r='28' fill='%2371717a'/><rect x='35' y='96' width='80' height='40' rx='20' fill='%2371717a'/></svg>";

  return (
    <div className="run-card flex-wrap mb-4">
      <div className="flex justify-between items-center w-full">
        <div>
          <h6 className="text-zinc-100 font-medium">{group.name}</h6>
          <p className="text-sm text-zinc-100/50">
            {group.count} joining · {group.distance} · {group.time}
          </p>
        </div>
        <button className="bg-mainBrand px-3 py-1.5 rounded-lg text-sm text-zinc-800 font-medium">
          Join
        </button>
      </div>
      <div className="flex mt-4">
        {group.avatars.map((img, i) => (
          <img
            key={i}
            src={`https://i.pravatar.cc/150?img=${img}`}
            onError={(e) => {
              e.currentTarget.src = fallbackAvatar;
            }}
            className="size-7 rounded-full object-cover border-2 border-zinc-800"
            style={{ marginLeft: i === 0 ? 0 : "-8px" }}
          />
        ))}
      </div>
      <div>
        <button onClick={() => setSaved(!saved)} className="p-1">
          <Bookmark
            size={20}
            className={saved ? "fill-white stroke-white" : "stroke-zinc-100/50"}
          />
        </button>
        <button className="p-1">
          <Share size={20} className="stroke-zinc-100/50" />
        </button>
      </div>
    </div>
  );
}

function Map() {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current, {
      zoomControl: false,
    }).setView([25.033, 121.5654], 14);

    const primaryTile = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    );

    primaryTile.on("tileerror", () => {
      // If primary tile host is blocked/unreachable, switch once to a stable fallback.
      if (!mapInstance.current || mapInstance.current.hasLayer(fallbackTile))
        return;
      mapInstance.current.removeLayer(primaryTile);
      fallbackTile.addTo(mapInstance.current);
    });

    const fallbackTile = L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
      },
    );

    primaryTile.addTo(mapInstance.current);

    // 自己的位置
    L.circleMarker([25.033, 121.5654], {
      radius: 8,
      fillColor: "#22c55e",
      color: "white",
      weight: 2,
      fillOpacity: 1,
    }).addTo(mapInstance.current);

    // 跑團 marker
    GROUPS_DATA.forEach((group) => {
      const icon = L.divIcon({
        className: "",
        html: `
          <div style="display:flex;flex-direction:column;align-items:flex-start">
            <div style="background:#22c55e;padding:6px 12px;border-radius:20px;font-size:11px;color:#2a2627;font-weight:500;white-space:nowrap">
              ${group.name} · ${group.count} joining
            </div>
            <div style="width:8px;height:8px;background:#22c55e;clip-path:polygon(0 0,100% 0,50% 100%);margin-left:12px"></div>
          </div>
        `,
        iconAnchor: [0, 0],
      });
      L.marker([group.lat, group.lng], { icon }).addTo(mapInstance.current);
    });
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden text-zinc-100">
      {/* 左上返回 */}
      <div className="absolute left-4 top-4 z-10">
        <button
          onClick={() => navigate("/friends")}
          className="bg-zinc-800/80 rounded-4xl p-2"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* 右上定位 */}
      <div className="absolute right-4 top-4 z-10">
        <button
          onClick={() => mapInstance.current?.setView([25.033, 121.5654], 14)}
          className="bg-zinc-800/80 rounded-4xl p-2"
        >
          <LocateFixed size={20} />
        </button>
      </div>

      {/* 地圖 */}
      <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />

      {/* 底部 Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-zinc-800 rounded-t-2xl transition-all duration-300 ease-in-out z-10 overflow-hidden"
        style={{ height: expanded ? "60vh" : "32vh" }}
      >
        {/* Handle */}
        <div
          onClick={() => setExpanded(!expanded)}
          className="p-4 flex justify-center cursor-pointer"
        >
          <div className="w-8 h-1 bg-zinc-100/10 rounded-full" />
        </div>

        {/* 內容 */}
        <div
          className="px-4"
          style={{ overflowY: expanded ? "auto" : "hidden" }}
        >
          {/* 搜尋 */}
          <div className="relative w-full mb-4">
            <Search
              size={16}
              className="absolute top-3.5 left-3 text-zinc-100/50"
            />
            <input
              type="text"
              className="bg-zinc-100/10 w-full py-3 pl-8 pr-4 text-sm rounded-xl text-zinc-100 outline-none placeholder:text-zinc-100/30"
              placeholder="Search friends or groups..."
            />
          </div>

          <p className="text-muted mb-3">
            Nearby · {GROUPS_DATA.length} groups
          </p>

          <div className="overflow-scroll max-h-[40vh]">
            {GROUPS_DATA.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;
