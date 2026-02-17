const Sidebar = () => {
  return (
    <div className="w-[220px] h-[100vh] bg-black text-white flex flex-col py-4 border-r border-gray-800"> 
      <div className="flex flex-col gap-2 px-3">
        <div className="px-4 py-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-all duration-200 font-medium">
          <p>Home</p>
        </div>
        <div className="px-4 py-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-all duration-200 font-medium">
          <p>Shorts</p>
        </div>
        <div className="px-4 py-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-all duration-200 font-medium">
          <p>Subscriptions</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
