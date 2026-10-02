import Navbar from "./Navbar";

const DashboardLayout = ({ children, activeMenu }) => (
  <div className="min-h-screen bg-white">
    <Navbar activeMenu={activeMenu} />
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {children}
    </main>
  </div>
);

export default DashboardLayout;
