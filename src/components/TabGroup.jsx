// components/TabGroup.jsx
import React from "react";

/**
 * @param tabs - 格式為 [{ id: 'record', label: 'Record', content: <Component /> }]
 * @param activeTab - 目前選中的 ID
 * @param onTabChange - 切換時的回呼函式
 */
export default function TabGroup({ tabs, activeTab, onTabChange }) {
  return (
    <div className="w-full">
      {/* Tab 導覽列容器：負責那一條貫穿整體的底線 */}
      <div className="flex inset-shadow-tab" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tab-panel-${tab.id}`}
            id={`tab-${tab.id}`}
            className={`flex-1 py-2 text-sm font-medium transition-all duration-300
              ${
                activeTab === tab.id
                  ? "text-bold text-mainBrand inset-shadow-tab-active"
                  : "text-muted inset-shadow-tab hover:text-zinc-100"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 內容顯示區 */}
      <div
        className="py-6"
        role="tabpanel"
        id={`tab-panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
