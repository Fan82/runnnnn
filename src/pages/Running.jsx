import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MoveLeft, Pause, Play, Camera, Square } from "lucide-react";
import RunMap from "../components/RunMap";

// 模擬跑步座標（東京）
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
  const [isRunning, setIsRunning] = useState(false);
  const [coords, setCoords] = useState([]);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);
  const simulateRef = useRef(null);

  // 計算兩點之間距離（km）
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

  const startRunning = () => {
    setIsRunning(true);
    setCoords([]);
    setDistance(0);
    setTime(0);

    // 計時
    timerRef.current = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    // 模擬跑步，每秒加一個座標
    let i = 0;
    simulateRef.current = setInterval(() => {
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
      i++;
    }, 1000);
  };

  const stopRunning = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    clearInterval(simulateRef.current);
  };

  const resetRunning = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    clearInterval(simulateRef.current);
    setCoords([]);
    setDistance(0);
    setTime(0);
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <div className="page-wrapper">
      <div className="header">
        <div className="nav right-auto left-4">
          <button onClick={() => navigate("/")} className="p-2">
            <MoveLeft size={16} />
          </button>
        </div>
        <h6 className="header-Font">Running</h6>
      </div>
      <p className="text-muted text-center mt-10 mb-4">Times</p>
      <h3 className="text-6xl text-bold text-center">{formatTime(time)}</h3>
      <div className="flex-between mb-3 p-4">
        <div className="card text-center">
          <p className="text-muted">Distance</p>
          <h6 className="text-bold">
            {distance.toFixed(2)} <span className="text-muted block">km</span>
          </h6>
        </div>
        <div className="card text-center">
          <p className="text-muted">Pace</p>
          <h6 className="text-bold">
            --<span className="text-muted block">min/km</span>
          </h6>
        </div>
        <div className="card text-center">
          <p className="text-muted">Calorie</p>
          <h6 className="text-bold">
            --<span className="text-muted block">kcal</span>
          </h6>
        </div>
      </div>
      <RunMap coords={coords} live={true} />
      <div className="flex-between items-center justify-center mt-4">
        <button
          onClick={resetRunning}
          className="rounded-full w-1/6 aspect-square bg-zinc-100/10 flex items-center justify-center"
        >
          <Pause size={20} />
        </button>
        <button
          onClick={isRunning ? stopRunning : startRunning}
          className="rounded-full w-1/4 aspect-square flex items-center justify-center bg-brand bg-red-500"
        >
          {isRunning ? <Square size={24} /> : <Play size={24} />}
        </button>
        <button className="rounded-full w-1/6 aspect-square bg-zinc-100/10 flex items-center justify-center">
          <Camera size={20} />
        </button>
      </div>
    </div>
  );
}

export default Running;
