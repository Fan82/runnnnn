import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { MY_UPDATES } from "../data/mockData";
import UpdatePost from "../components/UpdatePost";
import ActivityCalendar from "../components/ActivityCalendar";
import TabGroup from "../components/TabGroup";
import BottomNav from "../components/BottomNav";

const CURRENT_USER = {
  name: "Nora",
  handle: "@nora-0403",
  location: "London 🇬🇧",
  followers: 248,
  following: 91,
  postnumber: 2,
  stats: {
    totalKm: 128.4,
    totalRuns: 42,
    bestPace: `5'20"`,
  },
};

const RecordSection = () => (
  <>
    <div className="flex-between mb-4">
      <div className="card">
        <p className="text-muted">Total</p>
        <h6 className="text-bold text-2xl mt-2 mb-1 text-zinc-100">
          {CURRENT_USER.stats.totalKm}
          <span className="text-muted ml-1.5">km</span>
        </h6>
      </div>
      <div className="card">
        <p className="text-muted">Runs</p>
        <h6 className="text-bold text-2xl mt-2 mb-1 text-zinc-100">
          {CURRENT_USER.stats.totalRuns}
          <span className="text-muted ml-1.5">times</span>
        </h6>
      </div>
      <div className="card">
        <p className="text-muted">Best pace</p>
        <h6 className="text-bold text-2xl mt-2 mb-1 text-zinc-100">
          {CURRENT_USER.stats.bestPace}
          <span className="text-muted ml-1.5">/km</span>
        </h6>
      </div>
    </div>
    <ActivityCalendar />
  </>
);

const UpdateSection = () => (
  <div className="flex flex-col gap-2">
    {MY_UPDATES.map((item) => (
      <UpdatePost key={item.id} data={item} />
    ))}
  </div>
);

function Profile() {
  const [currentTab, setCurrentTab] = useState("record");
  const navigate = useNavigate();

  const tabConfig = [
    { id: "record", label: "Record", content: <RecordSection /> },
    { id: "updates", label: "Updates", content: <UpdateSection /> },
  ];

  return (
    <div className="page-wrapper">
      <div className="header">
        <div className="nav">
          <button onClick={() => navigate("/setting")} className="p-2">
            <Settings />
          </button>
        </div>
      </div>

      {/* 頭像區 — 固定 size-16，外圈用同樣尺寸包住不溢出 */}
      <div className="mb-4 mt-12 flex items-center gap-5">
        <div className="size-16 rounded-full overflow-hidden ring-2 ring-mainBrand shrink-0">
          <img
            src="https://i.pravatar.cc/150?img=57"
            alt="Nora avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1.5 items-end">
            <h2 className="text-base">{CURRENT_USER.name}</h2>
            <span className="text-muted">{CURRENT_USER.handle}</span>
          </div>
          {/* 追蹤數字 */}
          <div className="flex justify-start gap-6">
            <div>
              <span className="block text-zinc-100 font-bold text-lg leading-tight">
                {CURRENT_USER.followers}
              </span>
              <span className="text-muted text-xs">Followers</span>
            </div>
            <div>
              <span className="block text-zinc-100 font-bold text-lg leading-tight">
                {CURRENT_USER.following}
              </span>
              <span className="text-muted text-xs">Following</span>
            </div>
            <div>
              <span className="block text-zinc-100 font-bold text-lg leading-tight">
                {CURRENT_USER.postnumber}
              </span>
              <span className="text-muted text-xs">Following</span>
            </div>
          </div>
        </div>
      </div>
      <span>{CURRENT_USER.location}</span>
      <TabGroup
        tabs={tabConfig}
        activeTab={currentTab}
        onTabChange={setCurrentTab}
      />
      <BottomNav />
    </div>
  );
}

export default Profile;
