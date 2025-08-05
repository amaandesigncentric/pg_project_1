import React from "react";
import { useAuth } from "../utils/useAuth";
import { FaPowerOff } from "react-icons/fa6";

const Header = () => {
  const { user, logout } = useAuth();

  const roleLabels = {
    admin: "Admin",
    exp_sales_manager: "Export Department",
  };

  const headerContent = `Welcome to ${roleLabels[user?.position] || user?.position || ""}`;

  return (
    <header className="bg-orange-600 text-white w-full h-16 flex items-center justify-between px-4 md:px-12  shadow-md">
      <div className="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
        <h2 className="text-lg font-semibold max-w-xs truncate hidden sm:block">
          {headerContent}
        </h2>
      </div>

      <button
        onClick={logout}
        className="bg-white text-orange-600 font-semibold py-2 px-4 rounded hover:bg-gray-100 transition duration-200"
      >
        <FaPowerOff></FaPowerOff>
      </button>
    </header>
  );
};

export default Header;
