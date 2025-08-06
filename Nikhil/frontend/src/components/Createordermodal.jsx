import { Dialog, DialogPanel, DialogBackdrop, DialogTitle } from "@headlessui/react";
import React from "react";
import { useAuth } from "../utils/useAuth";
import { FaPlusCircle } from "react-icons/fa";
import bootleData from "../constants/bottleData";
import capData from "../constants/capData";
import pumpData from "../constants/pumpData";


const Createordermodal = ({ setOpenCreateOrder, openCreateOrder }) => {
    const { user } = useAuth();
    const [orderNumber, setOrderNumber] = React.useState(null);
    const [customerName, setCustomerName] = React.useState("");
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedBootle, setSelectedBootle] = React.useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
    const [neckSize, setNeckSize] = React.useState("");
    const [bootleCapacity, setBootleCapacity] = React.useState("");
    const [decoNumber, setDecoNumber] = React.useState("");
    const [quantity, setQuantity] = React.useState("");
    const [rate, setRate] = React.useState("");
    const [currency, setCurrency] = React.useState("INR");
    const [capType, setCapType] = React.useState("");
    const [capName, setCapName] = React.useState("");
    const [process, setProcess] = React.useState("");
    const [capQuantity, setCapQuantity] = React.useState("");
    const [capRate, setCapRate] = React.useState("");
    const [capCurrency, setCapCurrency] = React.useState("INR");
    const [pantoneNo, setPantoneNo] = React.useState("");
    const [fitment, setFitment] = React.useState("");
    const [assemble, setAssemble] = React.useState("");
    const [pumpQuantity, setPumpQuantity] = React.useState("");
    const [pumpRate, setPumpRate] = React.useState("");
    const [pumpName, setPumpName] = React.useState("");
    const filteredBottles = bootleData.filter((bottle) =>
        bottle.bootleName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (bottle) => {
        setSelectedBootle(bottle);
        setSearchTerm(bottle.bootleName);
        setIsDropdownVisible(false);
    };
    const duplicateAction = () => {
        console.log("Duplicate Action");
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

                                        <div className="mt-4 sm:text-left w-full">
                                            <div className="bg-[#FFF0E7] p-3 rounded-md flex flex-col sm:flex-row justify-between items-center gap-3">
                                                <h3 className="text-orange-800 font-medium text-center sm:text-left">
                                                    Do you want to duplicate an existing order?
                                                </h3>
                                                <button
                                                    type="button"
                                                    onClick={duplicateAction}
                                                    className="bg-orange-800 text-white rounded-md px-4 py-2 hover:bg-orange-900 transition-colors w-full sm:w-auto"
                                                >
                                                    Yes, duplicate order
                                                </button>
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
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
                                                        className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-white focus:outline-none"
                                                    >
                                                        <option value="INR">INR</option>
                                                        <option value="USD">USD</option>
                                                        <option value="EUR">EUR</option>
                                                        <option value="GSP">GSP</option>
                                                    </select>
                                                    </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 sm:text-left w-full">
                                            <div className="bg-gradient-to-r from-[#993300] via-[#FF6600] to-[#FFB84D] p-4 flex justify-between items-center">
                                                <h1 className="text-white underline underline-offset-8 text-xl">Item 1</h1>
                                                <button className="text-white text-2xl">
                                                    <FaPlusCircle />
                                                </button>
                                            </div>
<div className="bg-[#FFF0E7] p-4 w-full border border-orange-300 rounded-md">
  <h1 className="text-lg font-semibold text-gray-800 mb-4">Bottle</h1>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-12 gap-4 bg-white border border-gray-300 rounded-md p-4">


    {/* Bottle Name */}
    <div className="xl:col-span-4">
      <label className="block text-sm font-medium text-gray-700 mb-2 col-span-2">Bottle Name</label>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          placeholder="Please Select"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropdownVisible(true);
          }}
          onFocus={() => setIsDropdownVisible(true)}
          title={!searchTerm ? "Please select a bottle" : ""}
          className={`w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white focus:outline-none ${
            !searchTerm ? "cursor-pointer" : ""
          }`}
          readOnly={!searchTerm}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute right-3 top-3 text-orange-500 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        {isDropdownVisible && (
          <div className="absolute z-50 w-full mt-1 bg-white shadow-xl max-h-60 rounded-md py-1 text-sm overflow-auto border border-orange-200">
            {filteredBottles.length > 0 ? (
              filteredBottles.map((bottle, idx) => (
                <div
                  key={idx}
                  className="cursor-pointer px-4 py-3 hover:bg-orange-50 transition-colors flex flex-col"
                  onClick={() => {
                    handleSelect(bottle);
                    setNeckSize(bottle.neckSize);
                    setBootleCapacity(bottle.capacity);
                    setIsDropdownVisible(false);
                  }}
                >
                  <span className="font-medium">{bottle.bootleName}</span>
                  <span className="text-xs text-gray-500">
                    Neck: {bottle.neckSize} | Capacity: {bottle.capacity}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500 italic">No results found</div>
            )}
          </div>
        )}
      </div>
    </div>

    {/* Neck Size */}
    <div className="xl:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">Neck Size</label>
      <input
        type="text"
        value={neckSize}
        disabled
        className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white focus:outline-none"
      />
    </div>

    {/* Capacity */}
    <div className="xl:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
      <input
        type="text"
        value={bootleCapacity}
        disabled
        className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white focus:outline-none"
      />
    </div>

    {/* Deco Number */}
    <div className="xl:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">Deco Number</label>
      <input
        type="text"
        value={decoNumber}
        onChange={(e) => setDecoNumber(e.target.value)}
        className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white focus:outline-none"
      />
    </div>

    {/* Quantity */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
      <input
        type="number"
        min="0"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white focus:outline-none"
      />
    </div>

    {/* Rate */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Rate</label>
      <input
        type="number"
        min="0"
        step="0.01"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white focus:outline-none"
      />
    </div>

  </div>
</div>



<div className="bg-[#FFF0E7] p-4 w-full border border-orange-300 rounded-md">
  <h1 className="text-lg font-semibold text-gray-800 mb-4">Cap</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-12 gap-4 bg-white border border-gray-300 rounded-md p-4">

    {/* Cap Type */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 ">Cap Type</label>
      <select
        value={capType}
        onChange={(e) => {
          setCapType(e.target.value);
          setCapName("");
        }}
        className="w-full px-3 py-2 border border-orange-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        <option value="">Type</option>
        <option value="ALU">ALU</option>
        <option value="PLASTIC">PLASTIC</option>
      </select>
    </div>

    {/* Cap Name */}
    <div className="xl:col-span-3">
      <label className="block text-sm font-medium text-gray-700 mb-2">Cap Name</label>
      <select
        value={capName}
        onChange={(e) => setCapName(e.target.value)}
        disabled={!capType}
        title={!capType ? "Please select Cap Type first" : ""}
        className={`w-full px-3 py-2 border border-orange-300 rounded-md text-sm bg-white focus:outline-none ${
          !capType ? "cursor-not-allowed bg-gray-100" : ""
        }`}
      >
        <option value="">Select Cap</option>
        {capData
          .filter((cap) => cap.capType === capType)
          .map((cap, idx) => (
            <option key={idx} value={cap.capName}>
              {cap.capName}
            </option>
          ))}
      </select>
    </div>

    {/* Process */}
    <div className="xl:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">Process</label>
      <select
        value={process}
        onChange={(e) => setProcess(e.target.value)}
        className="w-full px-3 py-2 border border-orange-300 rounded-md text-sm bg-white focus:outline-none"
      >
        <option value="">Process</option>
        <option value="Injection">Injection</option>
        <option value="Extrusion">Extrusion</option>
        <option value="Compression">Compression</option>
      </select>
    </div>

    {/* Quantity */}
    <div className="xl:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
      <input
        type="number"
        min="0"
        value={capQuantity}
        onChange={(e) => setCapQuantity(e.target.value)}
        className="w-full px-3 py-2 border border-orange-300 rounded-md text-sm bg-white focus:outline-none"
      />
    </div>

    {/* Rate */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Rate</label>
      <input
        type="number"
        min="0"
        step="0.01"
        value={capRate}
        onChange={(e) => setCapRate(e.target.value)}
        className="w-full px-3 py-2 border border-orange-300 rounded-md text-sm bg-white focus:outline-none"
      />
    </div>

    {/* Pantone No */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Pantone No</label>
      <input
        type="text"
        value={pantoneNo}
        onChange={(e) => setPantoneNo(e.target.value)}
        className="w-full px-3 py-2 border border-orange-300 rounded-md text-sm bg-white focus:outline-none"
      />
    </div>

    {/* Fitment */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Fitment</label>
      <input
        type="text"
        value={fitment}
        onChange={(e) => setFitment(e.target.value)}
        className="w-full px-3 py-2 border border-orange-300 rounded-md text-sm bg-white focus:outline-none"
      />
    </div>

    {/* Assemble */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Assemble</label>
      <select
        value={assemble}
        onChange={(e) => setAssemble(e.target.value)}
        className="w-full px-3 py-2 border border-orange-300 rounded-md text-sm bg-white focus:outline-none"
      >
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>

  </div>
</div>

<div className="bg-[#FFF0E7] p-4 w-full border border-orange-300 rounded-md">
  <h1 className="text-lg font-semibold text-gray-800 mb-4">Pump</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-12 gap-4 bg-white border border-gray-300 rounded-md p-4">

<div className="lg:col-span-2 xl:col-span-6">
  <label className="block text-sm font-medium text-gray-700 mb-2 col-span-2">Pump Name</label>
  <select
    value={pumpName}
    onChange={(e) => setPumpName(e.target.value)}
    className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white focus:outline-none cursor-pointer"
  >
    <option value="">Please Select</option>
    {pumpData.map((pump, idx) => (
      <option key={idx} value={pump.pumpName}>
        {pump.pumpName}
      </option>
    ))}
  </select>
</div>
    {/* Pump Quantity */}
<div className="xl:col-span-3">
  <label className="block text-sm font-medium text-gray-700 mb-2">Pump Quantity</label>
  <input
    type="number"
    min="0"
    value={pumpQuantity}
    onChange={(e) => setPumpQuantity(e.target.value)}
    className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white focus:outline-none"
  />
</div>

{/* Pump Rate */}
<div className="xl:col-span-3">
  <label className="block text-sm font-medium text-gray-700 mb-2">Pump Rate</label>
  <input
    type="number"
    min="0"
    step="0.01"
    value={pumpRate}
    onChange={(e) => setPumpRate(e.target.value)}
    className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white focus:outline-none"
  />
</div>

  </div>
  </div>

  <div className="bg-[#FFF0E7] p-4 w-full border border-orange-300 rounded-md">
  <h1 className="text-lg font-semibold text-gray-800 mb-4">Accessory</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-12 gap-4 bg-white border border-gray-300 rounded-md p-4"></div>

  </div>
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
