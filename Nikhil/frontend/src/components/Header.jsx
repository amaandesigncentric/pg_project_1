import React from "react";
import { useAuth } from "../context/useAuth";
import { FaPowerOff } from "react-icons/fa6";
import { ChevronRight, ChevronDown, Menu, ChevronLeft, } from 'lucide-react';

const Header = ({ mainMenuItems, activeMenuItem, setMobileMenuOpen, mobileMenuOpen, handleMenuClick }) => {
  const { user, logout } = useAuth();
  const [currentDateTime, setCurrentDateTime] = React.useState(new Date());

  const roleLabels = {
    admin: "Admin",
    exp_sales_manager: "Export Department",
  };

  const headerContent = `Welcome to ${roleLabels[user?.position] || user?.position || ""}`;

  const formatTime = (date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatTimeMobile = (date) => {
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleLogout = () => {
    console.log("Logout Action")
    logout();
  }
  return (
    <>
      <header className="bg-gradient-to-r from-[#d94d00] via-[#ff7c08] to-[#ff9908] shadow-lg">
        <div className="px-3 sm:px-4 py-2 h-12 sm:h-12">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 ml-4">
              <img src="./logo.png" alt="logo" className="h-6 sm:h-7" />
              <h1 className="text-white font-semibold text-sm sm:text-lg hidden sm:block">{headerContent}</h1>
              <h1 className="text-white font-semibold text-sm sm:hidden">Admin</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-5">
              <div className="hidden sm:flex items-center text-white text-sm font-medium space-x-1">
                <span>{formatTime(currentDateTime)}</span>
              </div>

              <div className="sm:hidden flex items-center text-white text-xs font-medium space-x-1">
                <span>{formatTimeMobile(currentDateTime)}</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden bg-red-700 text-white rounded-sm p-2 hover:bg-red-800"
              >
                <Menu size={16} />
              </button>
              <div className="hidden sm:flex items-center bg-red-700 text-white rounded-sm px-3 py-2 gap-2 hover:bg-red-800 shadow-md">
                <button onClick={handleLogout} className="font-medium cursor-pointer">
                  <FaPowerOff />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-white w-64 h-full shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">Menu</h2>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <ChevronLeft size={20} />
                </button>
              </div>
            </div>

            <div className="p-4">
              {mainMenuItems.map((item) => (
                <div key={item.id} className="mb-2">
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 
                      ${activeMenuItem === item.id
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50/50'
                      }
                      `}
                  >
                    {item.label}
                  </button>
                </div>
              ))}

              <div className="mt-6 pt-4 border-t">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <FaPowerOff size={14} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
