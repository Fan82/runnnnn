import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, RotateCcw, Play, Square } from "lucide-react";
import RunMap from "../components/RunMap";

const FAKE_COORDS = [
  { lat: 35.6895, lng: 139.6917 },
  { lat: 35.69, lng: 139.6925 },
  { lat: 35.6907, lng: 139.693 },
  { lat: 35.6913, lng: 139.6938 },
  { lat: 35.692, lng: 139.6945 },
  { lat: 35.6926, lng: 139.6952 },
  { lat: 35.6932, lng: 139.6958 },
  { lat: 35.6938, lng: 139.6963 },
  { lat: 35.6944, lng: 139.697 },
  { lat: 35.695, lng: 139.6978 },
];

function Running() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle"); // idle | running | paused
  const [coords, setCoords] = useState([]);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);
  const simulateRef = useRef(null);
  const coordIndexRef = useRef(0);

  const calcDistance = (a, b) => {
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

  const calcPace = (distKm, seconds) => {
    if (distKm <= 0 || seconds <= 0) return "--";
    const paceSeconds = seconds / distKm;
    const m = Math.floor(paceSeconds / 60);
    const s = Math.floor(paceSeconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}'${s}"`;
  };

  const calcCalorie = (distKm) => {
    if (distKm <= 0) return "--";
    return Math.round(distKm * 65 * 1.036);
  };

  const startTimers = () => {
    timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    simulateRef.current = setInterval(() => {
      const i = coordIndexRef.current;
      if (i >= FAKE_COORDS.length) {
        clearInterval(simulateRef.current);
        return;
      }
      const newCoord = FAKE_COORDS[i];
      setCoords((prev) => {
        if (prev.length > 0) {
          const d = calcDistance(prev[prev.length - 1], newCoord);
          setDistance((dist) => dist + d);
        }
        return [...prev, newCoord];
      });
      coordIndexRef.current += 1;
    }, 1000);
  };

  const stopTimers = () => {
    clearInterval(timerRef.current);
    clearInterval(simulateRef.current);
  };

  const handleStart = () => {
    setStatus("running");
    startTimers();
  };
  const handlePause = () => {
    setStatus("paused");
    stopTimers();
  };
  const handleResume = () => {
    setStatus("running");
    startTimers();
  };
  const handleStop = () => {
    setStatus("idle");
    stopTimers();
  };
  const handleReset = () => {
    setStatus("idle");
    stopTimers();
    setCoords([]);
    setDistance(0);
    setTime(0);
    coordIndexRef.current = 0;
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <div className="relative w-full h-screen overflow-hidden text-zinc-100 bg-bg">
      <RunMap
        coords={coords}
        live={true}
        height="100vh"
        initialCenter={FAKE_COORDS[0]}
      />

      <div className="absolute inset-x-0 top-0 z-10 bg-linear-to-b from-zinc-900/80 to-transparent px-4 pt-4 pb-6">
        <div className="absolute left-4 top-4">
          <button
            onClick={() => navigate("/")}
            className="bg-zinc-800/80 rounded-4xl p-2"
          >
            <ChevronLeft size={20} className="text-zinc-100" />
          </button>
        </div>

        <p className="text-muted text-center mb-2 mt-10">Duration</p>
        <h3 className="text-6xl text-bold text-center mb-4">
          {formatTime(time)}
        </h3>

        <div className="flex-between gap-2">
          <div className="card text-center flex-1">
            <p className="text-muted">Distance</p>
            <h6 className="text-bold">
              {distance.toFixed(2)}
              <span className="text-muted block text-xs">km</span>
            </h6>
          </div>
          <div className="card text-center flex-1">
            <p className="text-muted">Pace</p>
            <h6 className="text-bold">
              {calcPace(distance, time)}
              <span className="text-muted block text-xs">min/km</span>
            </h6>
          </div>
          <div className="card text-center flex-1">
            <p className="text-muted">Calorie</p>
            <h6 className="text-bold">
              {calcCalorie(distance)}
              <span className="text-muted block text-xs">kcal</span>
            </h6>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-zinc-900/85 to-transparent px-4 pb-8 pt-10">
        <div className="flex items-center justify-center gap-8">
          <button
            onClick={handleReset}
            disabled={status === "idle"}
            className="rounded-full w-12 h-12 bg-zinc-100/10 flex items-center justify-center disabled:opacity-30"
          >
            <RotateCcw size={18} />
          </button>

          {status === "running" ? (
            <button
              onClick={handlePause}
              className="rounded-full w-16 h-16 bg-mainBrand flex items-center justify-center"
            >
              <div className="flex gap-1.5">
                <div className="w-1 h-5 bg-zinc-800 rounded-sm" />
                <div className="w-1 h-5 bg-zinc-800 rounded-sm" />
              </div>
            </button>
          ) : (
            <button
              onClick={status === "paused" ? handleResume : handleStart}
              className="rounded-full w-16 h-16 bg-mainBrand flex items-center justify-center"
            >
              <Play size={26} className="text-zinc-800 ml-1" />
            </button>
          )}

          <button
            onClick={handleStop}
            disabled={status === "idle"}
            className="rounded-full w-12 h-12 bg-zinc-100/10 flex items-center justify-center disabled:opacity-30"
          >
            <Square size={18} />
          </button>
        </div>

        {status === "paused" && (
          <p className="text-center text-muted text-xs mt-3">
            Paused · tap to resume
          </p>
        )}
      </div>
    </div>
  );
}

export default Running;
