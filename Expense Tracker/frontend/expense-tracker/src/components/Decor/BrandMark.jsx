const SIZES = {
  sm: { tile: "h-7 w-7 text-[11px]", label: "text-[15px]" },
  md: { tile: "h-9 w-9 text-[13px]", label: "text-base" },
};

const BrandMark = ({ size = "sm", muted = false }) => {
  const s = SIZES[size] || SIZES.sm;
  return (
    <span
      className={`flex items-center gap-2 font-semibold tracking-tight ${
        muted ? "text-slate-500" : "text-slate-900"
      }`}
    >
      <span
        className={`grid ${s.tile} place-items-center rounded-lg bg-slate-900 font-bold text-white`}
      >
        ET
      </span>
      <span className={`${s.label} whitespace-nowrap`}>Expense Tracker</span>
    </span>
  );
};

export default BrandMark;
