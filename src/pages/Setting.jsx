import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Setting() {
  const navigate = useNavigate();
  // 登出函式
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="page-wrapper">
      <div className="header">
        <div className="nav right-auto left-4">
          <div className="absolute left-4 top-4 z-10">
            <button
              onClick={() => navigate("/")}
              className="bg-zinc-800/80 rounded-4xl p-2"
            >
              <ChevronLeft size={20} className="text-zinc-100" />
            </button>
          </div>
        </div>
        <h6 className="header-Font text-center">Setting</h6>
      </div>
      <div className="flex flex-col gap-2 mt-12">
        <div className="text-muted pl-2 mb-2">Account</div>
        <button className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Edit profile
          <ChevronRight />{" "}
        </button>
        <button className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Notifications
          <ChevronRight />{" "}
        </button>
        <button className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Time management
          <ChevronRight />{" "}
        </button>
        <button className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Account privacy
          <ChevronRight />{" "}
        </button>
        <button className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Close friends
          <ChevronRight />{" "}
        </button>
        <button className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Blocked
          <ChevronRight />{" "}
        </button>
        <button className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Story and location
          <ChevronRight />{" "}
        </button>
        <button className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Sharing
          <ChevronRight />{" "}
        </button>
        <div className="text-muted pl-2 mb-2 mt-4">Preferences</div>
        <button className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Units
          <ChevronRight />{" "}
        </button>
        <button className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Appearance
          <ChevronRight />{" "}
        </button>
        <div className="text-muted pl-2 mb-2 mt-4">Support</div>
        <button className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Help
          <ChevronRight />{" "}
        </button>
        <button className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Privacy center
          <ChevronRight />{" "}
        </button>
        <div className="text-muted pl-2 mb-2 mt-4">Preferences</div>
        <button className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Units
          <ChevronRight />{" "}
        </button>
        <button className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Account status
          <ChevronRight />{" "}
        </button>
        <button
          onClick={handleSignOut}
          className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10"
        >
          Sign out
        </button>
        <button className="rounded-md p-2 flex items-center justify-between text-red-500/50">
          Delete account
        </button>
      </div>
    </div>
  );
}

export default Setting;
