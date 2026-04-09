import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function RunMap({
  coords,
  live = false,
  height = 200,
  initialCenter = { lat: 25.033, lng: 121.5654 },
}) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const polylineRef = useRef(null);
  const mapHeight = typeof height === "number" ? `${height}px` : height;

  useEffect(() => {
    if (mapInstance.current) return;
    const firstPoint = coords && coords.length > 0 ? coords[0] : initialCenter;

    mapInstance.current = L.map(mapRef.current, {
      zoomControl: false,
      dragging: !live,
      scrollWheelZoom: false,
    }).setView([firstPoint.lat, firstPoint.lng], 15);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    ).addTo(mapInstance.current);

    polylineRef.current = L.polyline([], { color: "#f97316", weight: 2 }).addTo(
      mapInstance.current,
    );

    if (!live && coords && coords.length > 0) {
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
  }, [coords, initialCenter, live]);

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

  return (
    <div
      ref={mapRef}
      style={{ height: mapHeight, width: "100%" }}
      className="rounded-xl overflow-hidden"
    />
  );
}

export default RunMap;
