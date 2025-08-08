import { Dialog, DialogPanel, DialogBackdrop, DialogTitle } from "@headlessui/react";
import React from "react";
import { useAuth } from "../../context/useAuth";
import IterableItems from "../../components/IterableItems";
import ModernPriceDisplay from "../../components/PriceDisplay";


const Createordermodal = ({ setOpenCreateOrder, openCreateOrder }) => {
  const { user } = useAuth();
  const [orderNumber, setOrderNumber] = React.useState(null);
  const [customerName, setCustomerName] = React.useState("");
  const [currency, setCurrency] = React.useState("INR");
  const [exchangeRates, setExchangeRates] = React.useState({
    INR: 1,
    USD: 0,
    EUR: 0,
    GBP: 0,
  });
  const [items, setItems] = React.useState([
    {
      id: Date.now(),
      bottleAmount: 0,
      capAmount: 0,
      pumpAmount: 0,
      accessoryAmount: 0,
      totalAmount: 0,
    },
  ]);
  const [showDuplicate ,setShowDuplicate] = React.useState(false);
  const [duplicateOrderNumber ,setDuplicateOrderNumber] = React.useState("");
  const [duplicateError,setDuplicateError] = React.useState("");
  const duplicateAction = () => {
  };

  return (
    <Dialog open={openCreateOrder} onClose={() => setOpenCreateOrder(false)} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full  justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden mx-auto rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-screen-xl">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[90vh] overflow-y-auto">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 sm:mt-0 sm:text-left w-full">
                    <DialogTitle as="h3">
                      <div className="bg-[#FF6701] p-4 rounded-t-md border-b border-orange-200 shadow-sm text-center">
                        <h3 className="text-white text-xl font-bold flex tracking-wide gap-2">
                          Create New Order
                        </h3>
                      </div>
                    </DialogTitle>
                  <div className="mt-5">
                    <div className="bg-[#FFF0E7] p-3 rounded-md">
                      <div className="flex items-center justify-between ">
                        <h4 className=" text-orange-800 font-medium">Do you want to duplicate an existing order?</h4>
                        <button
                          type="button"
                          onClick={() => {
                            setShowDuplicate(!showDuplicate);
                            setDuplicateError("");
                            setDuplicateOrderNumber("");
                          }}
                          className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded-sm transition-colors duration-200 font-medium ${showDuplicate
                            ? "bg-transparent"
                            : "bg-orange-700 text-white hover:bg-red-900 hover:text-white shadow-md"
                            }`}
                        >
                          {showDuplicate ? (
                            <div className="w-5 h-5 rounded-full border-2 border-red-500 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          ) : (
                            "Yes, duplicate order"
                          )}
                        </button>
                      </div>

                      {showDuplicate && (
                        <div className="space-y-4 mt-4">
                          <div className="flex gap-3">
                            <div className="flex-1">
                              <input
                                type="text"
                                value={duplicateOrderNumber}
                                onChange={(e) => setDuplicateOrderNumber(e.target.value)}
                                placeholder="Enter order number to duplicate"
                                className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm 
                      focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors
                      placeholder:text-gray-400 z-50"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={()=>{console.log("Duplicate Order")}}
                              className="px-3 py-2 cursor-pointer bg-orange-700 rounded-sm shadow-md transition-colors duration-200  hover:bg-red-900 text-white font-medium to-[#FFB84D] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                  </svg>
                                  Search
                                </>
                            </button>
                          </div>

                          {duplicateError && (
                            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">
                              {duplicateError}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                    <div className="mt-6 sm:text-left w-full">
                      <div className="p-3 rounded-md flex flex-col md:flex-row bg-[#FFF0E7] gap-4 md:gap-x-8">
                        <div className="space-y-2 w-full">
                          <label htmlFor="order_number" className="block text-sm font-medium text-gray-700">
                            Order Number
                          </label>
                          <input
                            id="order_number"
                            type="text"
                            value={orderNumber ?? ""}
                            disabled
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-not-allowed"
                            required
                          />
                        </div>

                        <div className="space-y-2 w-full">
                          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Manager Name
                          </label>
                          <input
                            id="username"
                            type="text"
                            value={user?.username || ""}
                            disabled
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            required
                          />
                        </div>

                        <div className="space-y-2 w-full">
                          <label htmlFor="cust_name" className="block text-sm font-medium text-gray-700">
                            Customer Name
                          </label>
                          <input
                            id="cust_name"
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            required
                          />
                        </div>

                        <div className="space-y2 w-full">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                          <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="w-full  py-3 border border-gray-300 rounded-md text-sm bg-white focus:outline-none"
                          >
                            <option value="INR">INR</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <IterableItems currency={currency} items={items} setItems={setItems} exchangeRates={exchangeRates} setExchangeRates={setExchangeRates} />

                    <ModernPriceDisplay
                      orderItems={items}
                      exchangeRates={exchangeRates}
                      isLoadingRates={false}
                      currency={currency}
                    />


                      <div className="flex justify-end gap-3 mt-8">
                      <button
                        className="inline-flex justify-center px-6 py-3 text-sm font-medium text-orange-900 bg-white border border-orange-300 rounded-md shadow-sm hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        disabled
                      >
                        Cancel
                      </button>


                      <button
                      className="inline-flex justify-center px-6 py-3 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 "
                      disabled
                      >
                        Create Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </DialogBackdrop>
    </Dialog>
  );
};

export default Createordermodal;
