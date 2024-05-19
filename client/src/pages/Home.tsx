import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { RootState } from "@/store";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const sidebarOpen = useSelector(
    (state: RootState) => state.sidebarSlice.sidebarOpen
  );

  return (
    <div className="flex bg-[#232529]">
      <Sidebar />
      <div
        className={`w-full h-screen ml-${
          sidebarOpen ? 300 : 0
        }px transition-all`}
      >
        <Navbar />
        <main className="flex flex-col gap-[40px] w-full min-h-screen px-[40px] py-[114px] bg-[#232529] text-white font-poppins">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Home;
