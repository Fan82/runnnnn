import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronLeft,
  Ellipsis,
  Globe,
  Lock,
  Users,
  Footprints,
  UserRoundPen,
  MapPin,
  Image,
} from "lucide-react";
import RunMap from "../components/RunMap";

const DEFAULT_STATS = { distanceKm: 18.4, timeMin: 32, pace: `6'09"` };
const DEFAULT_COORDS = [
  { lat: 35.6895, lng: 139.6917 },
  { lat: 35.695, lng: 139.7 },
  { lat: 35.7, lng: 139.695 },
  { lat: 35.695, lng: 139.685 },
];

const AUDIENCE_CHOICES = [
  { id: "everyone", label: "Everyone", Icon: Globe },
  { id: "friends", label: "Friends only", Icon: Users },
  { id: "private", label: "Only me", Icon: Lock },
];

function CreatPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const run = location.state?.run;

  const stats = run?.stats ?? DEFAULT_STATS;
  const coords = run?.coords?.length ? run.coords : DEFAULT_COORDS;

  const [caption, setCaption] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showAudience, setShowAudience] = useState(false);
  const [audienceId, setAudienceId] = useState("everyone");

  const current =
    AUDIENCE_CHOICES.find((o) => o.id === audienceId) ?? AUDIENCE_CHOICES[0];
  const AudienceIcon = current.Icon;

  const handlePublish = () => navigate("/friends");

  return (
    <div className="page-wrapper">
      <div className="header">
        <div className="nav right-auto left-4">
          <div className="absolute left-4 top-4 z-10">
            <button
              type="button"
              onClick={() => navigate("/friends")}
              className="rounded-4xl bg-zinc-800/80 p-2"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        </div>
        <h6 className="header-Font text-center">New Post</h6>
      </div>

      <div className="relative mt-14 flex flex-col gap-2 w-full">
        {/* 用戶資訊列 */}
        <div className="mb-2 flex items-center justify-between gap-4">
          <div className="size-12 rounded-full overflow-hidden shrink-0">
            <img
              src="https://i.pravatar.cc/150?img=57"
              alt="Nora"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h6 className="font-medium text-zinc-100">Nora</h6>
            <div className="relative mt-1">
              <button
                type="button"
                onClick={() => setShowAudience((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-lg text-sm text-muted"
              >
                <AudienceIcon size={14} className="shrink-0 stroke-zinc-400" />
                <span>{current.label}</span>
                <ChevronDown size={14} className="shrink-0 stroke-zinc-400" />
              </button>
              {showAudience && (
                <div className="absolute left-0 top-full z-20 mt-1 min-w-44 overflow-hidden rounded-2xl bg-zinc-800">
                  {AUDIENCE_CHOICES.map((opt) => {
                    const Icon = opt.Icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setAudienceId(opt.id);
                          setShowAudience(false);
                        }}
                        className={`flex w-full items-center gap-2 p-3 text-left text-sm hover:bg-zinc-700 ${
                          audienceId === opt.id
                            ? "text-mainBrand"
                            : "text-zinc-100"
                        }`}
                      >
                        <Icon size={14} className="shrink-0" />
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="relative z-10 shrink-0">
            <button
              type="button"
              onClick={() => setShowMenu((v) => !v)}
              className="p-2"
            >
              <Ellipsis size={16} className="stroke-zinc-100/50" />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-8 z-20 min-w-40 overflow-hidden rounded-2xl bg-zinc-800">
                <button
                  type="button"
                  className="w-full px-4 py-3 text-left text-sm text-muted hover:bg-zinc-700"
                >
                  Save draft
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-zinc-700"
                >
                  Discard
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Textarea — 最小高度 80px，視覺上明顯可輸入 */}
        <label className="sr-only" htmlFor="creatpost-caption">
          Caption
        </label>
        <textarea
          id="creatpost-caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={3}
          style={{ minHeight: "80px" }}
          className="w-full resize-none outline-0 bg-transparent text-zinc-100 placeholder:text-zinc-100/30 text-sm"
          placeholder="Add a caption..."
        />

        {/* 工具按鈕 — 改用 rounded-xl 統一圓角語言 */}
        <div className="inline-flex justify-end gap-2 mb-2">
          <button className="bg-zinc-100/10 rounded-xl p-2">
            <UserRoundPen size={18} />
          </button>
          <button className="bg-zinc-100/10 rounded-xl p-2">
            <MapPin size={18} />
          </button>
          <button className="bg-zinc-100/10 rounded-xl p-2">
            <Image size={18} />
          </button>
        </div>

        {/* 跑步資料卡 */}
        <div className="rounded-2xl bg-zinc-100/10 px-3 py-3">
          <div className="flex gap-2 items-center mb-4">
            <Footprints size={16} className="text-mainBrand" />
            <div className="text-muted text-sm">Today · 6:20</div>
          </div>
          <div className="flex gap-2 mb-4">
            <div className="flex-1">
              <p className="text-muted">Distance</p>
              <h6 className="text-bold text-zinc-100 text-xl">
                {stats?.distanceKm ?? 18.4}
                <span className="ml-1.5 text-muted text-sm">km</span>
              </h6>
            </div>
            <div className="flex-1">
              <p className="text-muted">Time</p>
              <h6 className="text-bold text-zinc-100 text-xl">
                {stats?.timeMin ?? 32}
                <span className="ml-1.5 text-muted text-sm">min</span>
              </h6>
            </div>
            <div className="flex-1">
              <p className="text-muted">Pace</p>
              <h6 className="text-bold text-zinc-100 text-xl">
                {stats?.pace ?? `6'09"`}
                <span className="ml-1.5 text-muted text-sm">/km</span>
              </h6>
            </div>
          </div>
          <RunMap coords={coords} />
        </div>
      </div>

      <button
        type="button"
        onClick={handlePublish}
        className="mt-4 w-full rounded-2xl bg-mainBrand text-zinc-800 font-bold p-3"
      >
        Share
      </button>
    </div>
  );
}

export default CreatPost;
