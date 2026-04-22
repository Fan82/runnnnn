const StatusBar = () => (
  <div
    style={{
      position: "fixed",
      top: "0",
      left: "0",
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 24px",
      fontSize: 12,
      color: "#fff",
      fontWeight: 600,
      zIndex: 20,
    }}
  >
    <span>15:41</span>
    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
        <rect x="0" y="4" width="3" height="8" rx="1" />
        <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" />
        <rect x="9" y="1" width="3" height="11" rx="1" />
        <rect x="13.5" y="0" width="2.5" height="12" rx="1" opacity="0.4" />
      </svg>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
        <path d="M8 2C5 2 2.5 3.5 1 5.7L2.5 7.2C3.7 5.4 5.7 4.2 8 4.2C10.3 4.2 12.3 5.4 13.5 7.2L15 5.7C13.5 3.5 11 2 8 2Z" />
        <path d="M8 6C6.3 6 4.8 6.8 3.8 8.1L5.3 9.5C6 8.6 6.9 8 8 8C9.1 8 10 8.6 10.7 9.5L12.2 8.1C11.2 6.8 9.7 6 8 6Z" />
        <circle cx="8" cy="11" r="1.5" />
      </svg>
      <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
        <rect
          x="0.5"
          y="0.5"
          width="21"
          height="11"
          rx="3.5"
          stroke="white"
          strokeOpacity="0.35"
        />
        <rect x="2" y="2" width="17" height="8" rx="2" fill="white" />
        <path
          d="M23 4.5V7.5C23.8 7.2 24.5 6.5 24.5 6C24.5 5.5 23.8 4.8 23 4.5Z"
          fill="white"
          fillOpacity="0.4"
        />
      </svg>
    </div>
  </div>
);
export default StatusBar;
