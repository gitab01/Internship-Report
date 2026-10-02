import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LuMenu, LuX, LuLogOut } from "react-icons/lu";
import SideMenu from "./SideMenu";
import CharAvatar from "../Cards/CharAvatar";
import { UserContext } from "../../context/UserContext";

const Navbar = ({ activeMenu }) => {
  const [open, setOpen] = useState(false);
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    navigate("/login");
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden -ml-1 p-2 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            {open ? <LuX size={20} /> : <LuMenu size={20} />}
          </button>

          <span className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-slate-900">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-900 text-xs font-bold text-white">
              E
            </span>
            Expensia
          </span>

          <div className="ml-2 hidden lg:block">
            <SideMenu activeMenu={activeMenu} variant="inline" />
          </div>

          <div className="ml-auto flex items-center gap-3">
            {user && (
              <div className="flex items-center gap-2.5">
                {user.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt={user.fullName || "Profile"}
                    className="h-8 w-8 rounded-full object-cover border border-line"
                  />
                ) : (
                  <CharAvatar fullName={user.fullName} width="w-8" height="h-8" />
                )}
                <span className="hidden sm:block text-sm font-medium text-slate-700">
                  {user.fullName}
                </span>
              </div>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="btn-ghost px-2.5!"
              aria-label="Log out"
              title="Log out"
            >
              <LuLogOut size={16} />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-line bg-white px-4 pb-4 lg:hidden">
            <SideMenu
              activeMenu={activeMenu}
              variant="drawer"
              onNavigate={() => setOpen(false)}
            />
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
