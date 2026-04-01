import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function RunMap({ coords }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!coords || coords.length < 2)
      return (
        <div
          style={{ height: "120px" }}
          className="rounded-xl bg-zinc-100/5 flex items-center justify-center"
        >
          <p className="text-muted text-sm">No route data</p>
        </div>
      );
    if (mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current, {
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
    }).setView([coords[0].lat, coords[0].lng], 15);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    ).addTo(mapInstance.current);
    L.polyline(
      coords.map((c) => [c.lat, c.lng]),
      { color: "#22c55e", weight: 3 },
    ).addTo(mapInstance.current);
  }, [coords]);

  return (
    <div
      ref={mapRef}
      style={{ height: "120px", width: "100%" }}
      className="rounded-xl"
    />
  );
}

export default RunMap;
