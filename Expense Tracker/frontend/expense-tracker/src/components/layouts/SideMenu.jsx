import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";

const NAV_ITEMS = SIDE_MENU_DATA.filter((item) => item.path !== "logout");
const LOGOUT_ITEM = SIDE_MENU_DATA.find((item) => item.path === "logout");

const SideMenu = ({ activeMenu, variant = "rail", onNavigate }) => {
  const { clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const go = (item) => {
    if (item.path === "logout") {
      localStorage.removeItem("token");
      clearUser();
      navigate("/login");
      return;
    }
    navigate(item.path);
    onNavigate?.();
  };

  const itemClass = (active) =>
    `flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition cursor-pointer ${
      active
        ? "bg-brand text-white shadow-[0_1px_2px_rgba(109,40,217,0.35)]"
        : "text-slate-600 hover:bg-brand-soft hover:text-brand-dark"
    }`;

  return (
    <nav className={`flex flex-col gap-1 ${variant === "rail" ? "h-full" : ""}`}>
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => go(item)}
          className={itemClass(activeMenu === item.label)}
        >
          <item.icon size={16} />
          {item.label}
        </button>
      ))}

      <button
        type="button"
        onClick={() => go(LOGOUT_ITEM)}
        className={`${
          variant === "rail" ? "mt-auto border-t border-line pt-3" : "pt-1"
        } ${itemClass(false)}`}
      >
        <LOGOUT_ITEM.icon size={16} />
        {LOGOUT_ITEM.label}
      </button>
    </nav>
  );
};

export default SideMenu;
