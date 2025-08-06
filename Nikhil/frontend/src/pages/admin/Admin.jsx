import React from "react";
import Header from "../../components/Header";
import PendingOrders from "./PendingOrder";

const Admin = () => {

  const [activeMenuItem, setActiveMenuItem] = React.useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const mainMenuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'pendingOrders', label: 'Pending Orders' },
    { id: 'liveOrders', label: 'Live Orders' },
    { id: 'completedOrders', label: 'Completed Orders' },
    { id: 'domesticOrders', label: 'Domestic Orders' },
    { id: 'exportOrders', label: 'Export Orders' }
  ];

  const handleMenuClick = (itemId) => {
    setActiveMenuItem(itemId);
    setMobileMenuOpen(false);
  };

  const renderActiveComponent = () => {
    switch (activeMenuItem) {
      case 'dashboard':
        return "Dashboard";
      case 'pendingOrders':
        return <PendingOrders />;
      case 'liveOrders':
        return "Live Orders";
      case 'completedOrders':
        return "Completed Orders";
      case "domesticOrders":
        return "Domestic Orders"
      case "exportOrders":
        return "Export Orders"
      default:
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">
              {'Page Not Found'}
            </h2>
            <p className="text-gray-600">
              This section is under development. Content for "{activeMenuItem}" will be added soon.
            </p>
          </div>
        );
    }
  };
  return (
    <>
      <Header
        mainMenuItems={mainMenuItems}
        activeMenuItem={activeMenuItem}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        handleMenuClick={handleMenuClick}
      />

      <nav className="hidden sm:block bg-white shadow-md border-b border-gray-200 relative">
        <div className="px-5">
          <div className="flex items-center">
            {mainMenuItems.map((item) => (
              <div key={item.id} className="relative">
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2
                    
                    ${activeMenuItem === item.id ? 'text-orange-600 border-orange-500 bg-orange-50'
                      : 'text-gray-600 border-transparent hover:text-orange-600 hover:bg-orange-50/50'}`}
                >
                  {item.label}
                </button>
              </div>
            ))}
          </div>
        </div>
      </nav>

      <main>
        {renderActiveComponent()}
      </main>
    </>

  )
}

export default Admin;