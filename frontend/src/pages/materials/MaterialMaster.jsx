import AdminSidebar from "../../components/AdminSidebar";


const MaterialMaster = () => {
  return (
    <div className="flex h-screen">
      <div className="hidden lg:block fixed top-0 left-0 h-full w-[325px] z-40">
        <AdminSidebar />
      </div>

      <main className="flex-1 ml-0 lg:ml-[325px] mt-[80px] p-6 overflow-y-auto bg-white backdrop-blur-sm rounded-tl-2xl shadow-inner [&::-webkit-scrollbar]:hidden scrollbar-none"></main>
    </div>
  );
};

export default MaterialMaster;
