import { useNavigate } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import FriendPost from "../components/FriendPost";
import BottomNav from "../components/BottomNav";

function Friends() {
  const navigate = useNavigate();

  // 1. 靜態定義 Story 資料 (0 代表加號按鈕)
  const stories = [0, 1, 1, 2, 3, 4, 5, 6, 7];

  // 2. 靜態定義貼文資料
  const posts = [
    {
      name: "Mike Chen",
      timeAgo: "2 hours ago",
      stats: { distanceKm: 5.2, timeMin: 32, pace: "6'09\"" },
      coords: [
        { lat: 35.6895, lng: 139.6917 },
        { lat: 35.69, lng: 139.6925 },
        { lat: 35.6907, lng: 139.693 },
        { lat: 35.6913, lng: 139.6938 },
      ],
    },
    {
      name: "Joseph",
      timeAgo: "15 min ago",
      stats: { distanceKm: 2.2, timeMin: 20, pace: "3'09\"" },
      coords: [
        { lat: 15.6913, lng: 99.6938 },
        { lat: 15.6907, lng: 99.693 },
        { lat: 15.69, lng: 99.6925 },
        { lat: 15.6895, lng: 99.6917 },
      ],
    },
    // 你可以輕鬆在這裡複製貼上，增加更多貼文
  ];

  return (
    <div className="page-wrapper pb-24">
      {" "}
      {/* 加上 pb 避免被 BottomNav 擋住內容 */}
      <div className="header">
        <div className="nav">
          <button onClick={() => navigate("/searchpage")} className="p-2">
            <Search size={16} />
          </button>
          <button onClick={() => navigate("/addpost")} className="p-2">
            <Plus />
          </button>
        </div>
        <h6 className="header-Font">Friends</h6>
      </div>
      {/* Story 區塊 */}
      <div className="flex gap-3 w-full mt-16 overflow-x-auto snap-x scroll-pl-6 no-scrollbar">
        {stories.map((item, index) =>
          index === 0 ? (
            <div
              key="add"
              className="circle-avatar flex-shrink-0 inset-ring-0 bg-mainBrand size-13 flex items-center justify-center text-white"
            >
              <Plus size={32} />
            </div>
          ) : (
            <div
              key={index}
              className={`circle-avatar flex-shrink-0 ${index <= 2 ? "inset-ring-green-400" : ""}`}
            >
              <img
                src={`https://i.pravatar.cc/150?img=${index}`}
                className="circle-avatarImage"
                alt="friend"
              />
            </div>
          ),
        )}
      </div>
      {/* Friend List 區塊 */}
      <div className="mt-6 flex flex-col gap-4">
        {posts.map((post, idx) => (
          <FriendPost key={idx} post={post} />
        ))}
        {/* 為了展示靜態感，重複渲染兩遍原有的 posts */}
        {posts.map((post, idx) => (
          <FriendPost key={`repeat-${idx}`} post={post} />
        ))}
      </div>
      <BottomNav />
    </div>
  );
}

export default Friends;
