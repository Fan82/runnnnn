function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`min-w-4/12 p-3 ${active ? "text-mainBrand inset-shadow-[0_-0.3px_0px_rgba(5,223,114)]" : "text-zinc-100/50"}`}
    >
      {label}
    </button>
  );
}

export default TabButton;
