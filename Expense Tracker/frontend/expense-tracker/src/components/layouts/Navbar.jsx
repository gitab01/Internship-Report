import { useState } from "react";
import { useContext } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import SideMenu from "./SideMenu";
import BrandMark from "../Decor/BrandMark";
import CharAvatar from "../Cards/CharAvatar";
import { UserContext } from "../../context/UserContext";

const Navbar = ({ activeMenu }) => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white lg:hidden">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <BrandMark />

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto -mr-1 p-2 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
        >
          {open ? <LuX size={20} /> : <LuMenu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white px-4 pb-4">
          {user && (
            <div className="flex items-center gap-3 pb-3">
              {user.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt={user.fullName || "Profile"}
                  className="h-9 w-9 rounded-full object-cover border border-line"
                />
              ) : (
                <CharAvatar fullName={user.fullName} width="w-9" height="h-9" />
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {user.fullName}
                </p>
                {user.email && (
                  <p className="truncate text-xs text-slate-500">{user.email}</p>
                )}
              </div>
            </div>
          )}
          <SideMenu
            activeMenu={activeMenu}
            variant="drawer"
            onNavigate={() => setOpen(false)}
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;
