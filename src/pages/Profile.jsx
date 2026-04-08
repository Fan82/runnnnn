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
        <h6 className="text-bold text-2xl mt-2 mb-1 text-mainBrand">
          {CURRENT_USER.stats.totalKm}
          <span className="text-sm font-medium ml-1.5">km</span>
        </h6>
      </div>
      <div className="card">
        <p className="text-muted">Runs</p>
        <h6 className="text-bold text-2xl mt-2 mb-1 text-mainBrand">
          {CURRENT_USER.stats.totalRuns}
        </h6>
      </div>
      <div className="card">
        <p className="text-muted">Best pace</p>
        <h6 className="text-bold text-2xl mt-2 mb-1 text-mainBrand">
          {CURRENT_USER.stats.bestPace}
          <span className="text-sm font-medium ml-1.5 text-muted">/km</span>
        </h6>
      </div>
    </div>
    <ActivityCalendar />
  </>
);

const UpdateSection = () => (
  <div className="flex flex-col">
    {MY_UPDATES.map((item) => (
      <UpdatePost key={item.id} data={item} />
    ))}
  </div>
);

function Profile() {
  const [currentTab, setCurrentTab] = useState("record");
  const navigate = useNavigate();

  // 定義分頁配置
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
      <div className="mb-4 mt-12 flex items-center gap-6">
        <div className="inline-block circle-avatar ring-2 ring-green-400">
          <img
            src="https://i.pravatar.cc/150?img=57"
            alt="Nora avatar"
            className="circle-avatarImage size-16"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-bold">{CURRENT_USER.name}</h2>
          <span className="text-muted">{CURRENT_USER.handle}</span>
          <span className="text-muted">{CURRENT_USER.location}</span>
        </div>
      </div>
      {/* 使用封裝好的 Tab 組件 */}
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
