import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronLeft,
  Ellipsis,
  Globe,
  Lock,
  Users,
} from "lucide-react";
import RunMap from "../components/RunMap";

const DEFAULT_STATS = { distanceKm: 18.4, timeMin: 32, pace: `6'09"` };
const DEFAULT_COORDS = [
  { lat: 35.6895, lng: 139.6917 },
  { lat: 35.69, lng: 139.6925 },
  { lat: 35.6907, lng: 139.693 },
  { lat: 35.6913, lng: 139.6938 },
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

  const handlePublish = () => {
    navigate("/friends");
  };

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
      <div className="relative mt-14 flex flex-col gap-2 w-full mt-8 pb-8 ">
        <div className="mb-2 flex items-center justify-between gap-4">
          <div className="circle-avatar size-13">
            <img
              src="https://i.pravatar.cc/150?img=20"
              alt=""
              className="circle-avatarImage"
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
        <div className="rounded-2xl bg-zinc-100/10 px-2 py-2">
          <div className="flex flex-between">
            <div className="flex-1 p-2">
              <p className="text-muted">Distance</p>
              <h6 className="text-bold text-mainBrand text-xl">
                {stats?.distanceKm ?? 18.4}
                <span className="ml-1.5 text-muted">km</span>
              </h6>
            </div>
            <div className="flex-1 p-2">
              <p className="text-muted">Time</p>
              <h6 className="text-bold text-mainBrand text-xl">
                {stats?.timeMin ?? 32}
                <span className="ml-1.5 text-muted">min</span>
              </h6>
            </div>
            <div className="flex-1 p-2">
              <p className="text-muted">Pace</p>
              <h6 className="text-bold text-mainBrand text-xl">
                {stats?.pace ?? `6'09"`}
                <span className="ml-1.5 text-muted">/km</span>
              </h6>
            </div>
          </div>
          <RunMap coords={coords} />
        </div>
        <label className="sr-only" htmlFor="creatpost-caption">
          Caption
        </label>
        <textarea
          id="creatpost-caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-2xl border border-white/10 bg-zinc-900/50 px-4 py-3 text-bold text-zinc-100 placeholder:text-zinc-500 focus:border-mainBrand focus:outline-none"
          placeholder="Say something about your run…"
        />
      </div>
      <button
        type="button"
        onClick={handlePublish}
        className="mt-4 w-full rounded-full bg-mainBrand px-4 py-3 text-sm font-semibold text-white"
      >
        Post
      </button>
    </div>
  );
}

export default CreatPost;
