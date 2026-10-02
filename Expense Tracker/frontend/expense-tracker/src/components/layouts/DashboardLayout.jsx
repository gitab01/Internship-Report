import { useContext } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import BrandMark from "../Decor/BrandMark";
import CharAvatar from "../Cards/CharAvatar";
import { CurrencyPattern, CurrencySeal } from "../Decor/CurrencyWatermark";
import { UserContext } from "../../context/UserContext";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="relative min-h-screen bg-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <CurrencyPattern tileId="app-tiles" opacity={0.022} />
        <CurrencySeal
          className="absolute -bottom-44 -right-36 h-[28rem] w-[28rem] sm:h-[38rem] sm:w-[38rem]"
          opacity={0.045}
        />
      </div>

      <div className="relative lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8">
        <aside className="hidden lg:flex sticky top-0 h-screen flex-col border-r border-line bg-white px-4 py-6">
          <BrandMark size="md" />

          {user && (
            <div className="mt-6 flex items-center gap-3 px-1">
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

          <div className="mt-6 min-h-0 flex-1">
            <SideMenu variant="rail" activeMenu={activeMenu} />
          </div>
        </aside>

        <div className="min-w-0">
          <Navbar activeMenu={activeMenu} />
          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
            {children}
          </main>
          <footer className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-5 text-xs text-slate-500">
              <span>Expense Tracker · amounts in Ethiopian Birr</span>
              <span>{new Date().getFullYear()}</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
