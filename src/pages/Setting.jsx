import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Setting() {
  const navigate = useNavigate();

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
        <div className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Edit profile
          <ChevronRight />{" "}
        </div>
        <div className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Notifications
          <ChevronRight />{" "}
        </div>
        <div className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Time management
          <ChevronRight />{" "}
        </div>
        <div className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Account privacy
          <ChevronRight />{" "}
        </div>
        <div className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Close friends
          <ChevronRight />{" "}
        </div>
        <div className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Blocked
          <ChevronRight />{" "}
        </div>
        <div className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Story and location
          <ChevronRight />{" "}
        </div>
        <div className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Sharing
          <ChevronRight />{" "}
        </div>
        <div className="text-muted pl-2 mb-2 mt-4">Preferences</div>
        <div className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Units
          <ChevronRight />{" "}
        </div>
        <div className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Appearance
          <ChevronRight />{" "}
        </div>
        <div className="text-muted pl-2 mb-2 mt-4">Support</div>
        <div className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Help
          <ChevronRight />{" "}
        </div>
        <div className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Privacy center
          <ChevronRight />{" "}
        </div>
        <div className="text-muted pl-2 mb-2 mt-4">Preferences</div>
        <div className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Units
          <ChevronRight />{" "}
        </div>
        <div className="rounded-md p-2 flex items-center justify-between hover:bg-zinc-100/10">
          Account status
          <ChevronRight />{" "}
        </div>
        <div className="rounded-md p-2 flex items-center justify-between text-red-500/50">
          Delete account
        </div>
      </div>
    </div>
  );
}

export default Setting;
