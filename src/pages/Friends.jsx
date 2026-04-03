import { useNavigate } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import FriendPost from "../components/FriendPost";
import BottomNav from "../components/BottomNav";

function Friends() {
  const navigate = useNavigate();
  return (
    <div className="page-wrapper">
      <div className="header">
        <div className="nav">
          <button onClick={() => navigate("/searchpage")} className="p-2">
            <Search size={16} />
          </button>
          <button onClick={() => navigate("/")} className="p-2">
            <Plus />
          </button>
        </div>
        <h6 className="header-Font text-left">Friends</h6>
      </div>
      {/* story */}
      <div className="flex gap-2 w-full mt-8 overflow-x-auto snap-x scroll-pl-6">
        <div className="circle-avatar inset-ring-0 bg-mainBrand size-13">
          <Plus size={32} />
        </div>
        <div className="circle-avatar inset-ring-green-400">
          <img
            src="https://i.pravatar.cc/150?img=1"
            className="circle-avatarImage"
          />
        </div>
        <div className="circle-avatar inset-ring-green-400">
          <img
            src="https://i.pravatar.cc/150?img=1"
            className="circle-avatarImage"
          />
        </div>
        <div className="circle-avatar">
          <img
            src="https://i.pravatar.cc/150?img=1"
            className="circle-avatarImage"
          />
        </div>
        <div className="circle-avatar">
          <img
            src="https://i.pravatar.cc/150?img=1"
            className="circle-avatarImage"
          />
        </div>
        <div className="circle-avatar">
          <img
            src="https://i.pravatar.cc/150?img=1"
            className="circle-avatarImage"
          />
        </div>
        <div className="circle-avatar">
          <img
            src="https://i.pravatar.cc/150?img=1"
            className="circle-avatarImage"
          />
        </div>
        <div className="circle-avatar">
          <img
            src="https://i.pravatar.cc/150?img=1"
            className="circle-avatarImage"
          />
        </div>
        <div className="circle-avatar">
          <img
            src="https://i.pravatar.cc/150?img=1"
            className="circle-avatarImage"
          />
        </div>
      </div>
      {/* friend list */}
      <FriendPost
        post={{
          name: "Mike Chen",
          timeAgo: "2 hours ago",
          stats: { distanceKm: 5.2, timeMin: 32, pace: "6'09\"" },
          coords: [
            { lat: 35.6895, lng: 139.6917 },
            { lat: 35.69, lng: 139.6925 },
            { lat: 35.6907, lng: 139.693 },
            { lat: 35.6913, lng: 139.6938 },
          ],
        }}
      />
      <FriendPost
        post={{
          name: "Joseph",
          timeAgo: "15 min ago",
          stats: { distanceKm: 2.2, timeMin: 20, pace: "3'09\"" },
          coords: [
            { lat: 15.6913, lng: 99.6938 },
            { lat: 15.6907, lng: 99.693 },
            { lat: 15.69, lng: 99.6925 },
            { lat: 15.6895, lng: 99.6917 },
          ],
        }}
      />
      <FriendPost
        post={{
          name: "Mike Chen",
          timeAgo: "2 hours ago",
          stats: { distanceKm: 5.2, timeMin: 32, pace: "6'09\"" },
          coords: [
            { lat: 35.6895, lng: 139.6917 },
            { lat: 35.69, lng: 139.6925 },
            { lat: 35.6907, lng: 139.693 },
            { lat: 35.6913, lng: 139.6938 },
          ],
        }}
      />
      <FriendPost
        post={{
          name: "Joseph",
          timeAgo: "15 min ago",
          stats: { distanceKm: 2.2, timeMin: 20, pace: "3'09\"" },
          coords: [
            { lat: 15.6913, lng: 99.6938 },
            { lat: 15.6907, lng: 99.693 },
            { lat: 15.69, lng: 99.6925 },
            { lat: 15.6895, lng: 99.6917 },
          ],
        }}
      />
      <BottomNav />
    </div>
  );
}

export default Friends;
