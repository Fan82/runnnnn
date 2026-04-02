import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function RunMap({ coords, live = false }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const polylineRef = useRef(null);

  // 初始化地圖
  useEffect(() => {
    if (mapInstance.current) return;
    if (!coords || coords.length === 0) return;

    mapInstance.current = L.map(mapRef.current, {
      zoomControl: false,
      dragging: !live,
      scrollWheelZoom: false,
    }).setView([coords[0].lat, coords[0].lng], 15);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    ).addTo(mapInstance.current);

    polylineRef.current = L.polyline([], { color: "#f97316", weight: 2 }).addTo(
      mapInstance.current,
    );

    if (!live) {
      // 靜態模式：畫完整路線 + 起終點
      polylineRef.current.setLatLngs(coords.map((c) => [c.lat, c.lng]));

      L.circleMarker([coords[0].lat, coords[0].lng], {
        radius: 8,
        fillColor: "white",
        color: "#888",
        weight: 2,
        fillOpacity: 1,
      }).addTo(mapInstance.current);

      L.circleMarker(
        [coords[coords.length - 1].lat, coords[coords.length - 1].lng],
        {
          radius: 8,
          fillColor: "#22c55e",
          color: "white",
          weight: 2,
          fillOpacity: 1,
        },
      ).addTo(mapInstance.current);
    }
  }, [coords]);

  // 即時模式：每次 coords 更新就重畫
  useEffect(() => {
    if (
      !live ||
      !mapInstance.current ||
      !polylineRef.current ||
      coords.length === 0
    )
      return;

    polylineRef.current.setLatLngs(coords.map((c) => [c.lat, c.lng]));
    const last = coords[coords.length - 1];
    mapInstance.current.setView([last.lat, last.lng], 16);
  }, [coords, live]);

  if (!coords || coords.length === 0)
    return (
      <div
        style={{ height: "200px" }}
        className="rounded-2xl bg-zinc-100/5 flex items-center justify-center"
      >
        <p className="text-muted text-sm">No route data</p>
      </div>
    );

  return (
    <div
      ref={mapRef}
      style={{ height: "200px", width: "100%" }}
      className="rounded-2xl overflow-hidden"
    />
  );
}

export default RunMap;
