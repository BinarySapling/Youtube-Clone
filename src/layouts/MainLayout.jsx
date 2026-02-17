import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      <NavBar />
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
