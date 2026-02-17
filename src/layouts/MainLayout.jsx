import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const MainLayout = ({ children }) => {
  return (
    <div className="app">
      <NavBar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#f9f9f9",
            minHeight: "100vh",
          }}
        >
          {children}
        </div>

      </div>
    </div>
  );
};

export default MainLayout;
