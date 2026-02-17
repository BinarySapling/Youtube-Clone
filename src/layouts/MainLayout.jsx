import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-950">
      <NavBar />
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-6 overflow-x-hidden bg-zinc-950">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
