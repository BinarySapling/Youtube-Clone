import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <NavBar />
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-6 overflow-x-hidden bg-[#0f0f0f] ml-60 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
