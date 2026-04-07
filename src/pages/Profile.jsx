import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TabGroup from "../components/TabGroup";
import BottomNav from "../components/BottomNav";
import { Settings } from "lucide-react";
import ActivityCalendar from "../components/ActivityCalendar";
import UpdatePost from "../components/UpdatePost";

const RecordSection = () => (
  <>
    <div className="flex-between mb-4">
      <div className="card">
        <p className="text-muted">Total</p>
        <h6 className="text-bold text-2xl mt-2 mb-1 text-mainBrand">
          68.4<span className="text-sm font-medium ml-1.5">km</span>
        </h6>
      </div>
      <div className="card">
        <p className="text-muted">Runs</p>
        <h6 className="text-bold text-2xl mt-2 mb-1 text-mainBrand">
          14<span className="text-sm font-medium ml-1.5">times</span>
        </h6>
      </div>
      <div className="card">
        <p className="text-muted">Avg Pace</p>
        <h6 className="text-bold text-2xl mt-2 mb-1 text-mainBrand">
          18.4<span className="text-sm font-medium ml-1.5">pace</span>
        </h6>
      </div>
    </div>
    <ActivityCalendar />
  </>
);

const UpdateSection = () => (
  <>
    <UpdatePost />
    <UpdatePost />
    <UpdatePost />
    <UpdatePost />
    <UpdatePost />
    <UpdatePost />
  </>
);

const PostsSection = () => (
  <div className="text-muted text-center">No Updated</div>
);
const PhotoSection = () => (
  <div className="text-muted text-center">No Upload Photos</div>
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
        {/* <h6 className="header-Font">Friends</h6> */}
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
          <h2 className="text-bold">Nora</h2>
          <span className="text-muted">@nora_0403</span>
          <span className="text-muted ">🇬🇧 London</span>
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
