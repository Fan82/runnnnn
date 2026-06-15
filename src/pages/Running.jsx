import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, RotateCcw, Play, Square } from "lucide-react";
import RunMap from "../components/RunMap";
import {
  calcDistance,
  calcPace,
  calcCalorie,
  formatTime,
  saveRun,
} from "../utils/runStorage";

// 預設地圖中心（取得 GPS 前的 fallback，台北 101 附近）
const DEFAULT_CENTER = { lat: 25.033, lng: 121.5654 };

function Running() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle"); // idle | running | paused
  const [coords, setCoords] = useState([]);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [geoError, setGeoError] = useState(null);
  const [initialCenter, setInitialCenter] = useState(DEFAULT_CENTER);

  const timerRef = useRef(null);
  const watchIdRef = useRef(null);
  const lastCoordRef = useRef(null);

  // 進入頁面先取得一次目前位置，當地圖初始中心
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("此裝置不支援定位功能");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setInitialCenter({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        // 取得失敗時保留 fallback 中心點，不阻擋使用
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );

    return () => stopTimers();
  }, []);

  const startTimers = () => {
    // 計時器：每秒 +1
    timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);

    // GPS 持續定位
    if (!navigator.geolocation) {
      setGeoError("此裝置不支援定位功能");
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const newCoord = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        if (lastCoordRef.current) {
          const d = calcDistance(lastCoordRef.current, newCoord);
          // 過濾 GPS 飄移造成的不合理跳動（單次間隔超過 200m 視為異常，忽略）
          if (d < 0.2) {
            setDistance((dist) => dist + d);
          } else {
            return;
          }
        }

        lastCoordRef.current = newCoord;
        setCoords((prev) => [...prev, newCoord]);
        setGeoError(null);
      },
      (err) => {
        setGeoError(
          err.code === 1
            ? "請允許定位權限以記錄跑步軌跡"
            : "無法取得目前位置，請確認 GPS 是否開啟",
        );
      },
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 },
    );
  };

  const stopTimers = () => {
    clearInterval(timerRef.current);
    if (watchIdRef.current !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
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

    if (coords.length > 0) {
      const record = saveRun({ coords, distance, time });
      navigate("/run-summary", { state: { run: record } });
    }
  };
  const handleReset = () => {
    setStatus("idle");
    stopTimers();
    setCoords([]);
    setDistance(0);
    setTime(0);
    lastCoordRef.current = null;
  };

  return (
    <div className="relative w-full h-screen overflow-hidden text-zinc-100 bg-bg">
      <RunMap
        coords={coords}
        live={true}
        height="100vh"
        initialCenter={initialCenter}
      />

      <div className="absolute inset-x-0 top-8 z-10 bg-linear-to-b from-zinc-900/80 to-transparent px-4 pt-4 pb-6">
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

        {geoError && (
          <p className="text-center text-red-400 text-xs mb-2 px-4">
            {geoError}
          </p>
        )}

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
