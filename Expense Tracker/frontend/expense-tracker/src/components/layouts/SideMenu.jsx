import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";

const NAV_ITEMS = SIDE_MENU_DATA.filter((item) => item.path !== "logout");

const SideMenu = ({ activeMenu, variant = "inline", onNavigate }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const go = (item) => {
    if (item.path === "logout") return;
    navigate(item.path);
    onNavigate?.();
  };

  const inline = variant === "inline";

  return (
    <nav className={inline ? "flex items-center gap-1" : "grid gap-1 pt-3"}>
      {NAV_ITEMS.map((item) => {
        const active = activeMenu === item.label;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => go(item)}
            className={`inline-flex items-center gap-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              inline ? "px-3 py-2" : "w-full px-3 py-2.5"
            } ${
              active
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <item.icon size={16} />
            {item.label}
          </button>
        );
      })}

      {!inline && user && (
        <p className="mt-3 px-3 text-xs text-slate-500">
          Signed in as {user.fullName}
        </p>
      )}
    </nav>
  );
};

export default SideMenu;
