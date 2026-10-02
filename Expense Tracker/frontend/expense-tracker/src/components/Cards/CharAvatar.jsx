import { getInitials } from "../../utils/helper";

const CharAvatar = ({ fullName, width, height, style }) => (
  <div
    className={`${width || "w-12"} ${height || "h-12"} ${
      style || ""
    } grid place-items-center rounded-full bg-slate-900 text-white text-sm font-semibold uppercase select-none`}
  >
    {getInitials(fullName || "") || "•"}
  </div>
);

export default CharAvatar;
