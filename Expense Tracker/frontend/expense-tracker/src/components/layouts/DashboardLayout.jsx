import Navbar from "./Navbar";
import { CurrencyPattern, CurrencySeal } from "../Decor/CurrencyWatermark";

const DashboardLayout = ({ children, activeMenu }) => (
  <div className="relative min-h-screen bg-white">
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <CurrencyPattern tileId="app-tiles" opacity={0.022} />
      <CurrencySeal
        className="absolute -bottom-44 -right-36 h-[28rem] w-[28rem] sm:h-[38rem] sm:w-[38rem]"
        opacity={0.045}
      />
    </div>

    <div className="relative">
      <Navbar activeMenu={activeMenu} />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
    </div>
  </div>
);

export default DashboardLayout;
