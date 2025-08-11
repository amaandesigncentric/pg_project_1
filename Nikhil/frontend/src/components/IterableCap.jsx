import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import capData from '../constants/capData'; 
import { useSocket } from '../context/socketContext';

const CapForm = ({caps, onAmountChange ,onCapsChange}) => {

  const { plasticCap:plasticCapData ,alluminiumCap :alluminiumCapData} = useSocket();

  const handleCapChange = (index, key, value) => {
    const updated = [...caps];
    updated[index][key] = value;
    // Reset capName when capType changes
    if (key === 'capType') {
      updated[index]['capName'] = '';
      updated[index]['process'] = '';
      updated[index]["searchTerm"] = ""
    }

    if (key === 'quantity' || key === 'rate') {
      const quantity = parseFloat(updated[index].quantity) || 0;
      const rate = parseFloat(updated[index].rate) || 0;
      updated[index].amount = (quantity / 1000) * rate;
    }

    onCapsChange(updated);
  };

  React.useEffect(() => {
    const total = caps.reduce((sum, b) => sum + (b.amount || 0), 0);
    onAmountChange(total);
  }, [caps, onAmountChange]);
  const addCap = () => {
    onCapsChange([
      ...caps,
      {
        capType: '',
        capName: '',
        process: '',
        quantity: '',
        rate: '',
        pantoneNo: '',
        fitment: '',
        assemble: '',
      },
    ]);
  };

  const deleteCap = (index) => {
    const updated = caps.filter((_, i) => i !== index);
    onCapsChange(updated);
  };

  const handleCapSelect = (index, selectedCap) => {
  const updated = [...caps];
  updated[index].capName = selectedCap.ITEMNAME;
  updated[index].searchTerm = selectedCap.ITEMNAME;
  updated[index].isDropdownVisible = false;
  onCapsChange(updated);
};

  return (
    <div>
      {caps.map((cap, index) => (
        <div key={index} className="relative mb-6">
          {/* Add/Delete Buttons */}
          <div className="absolute top-0 right-0 flex space-x-1 -mt-2 -mr-3 z-10">
            {index === 0 && (
              <button
                onClick={addCap}
                title="Add Cap"
                className="bg-orange-100 hover:bg-orange-200 p-1 rounded-full text-orange-700 border border-orange-300 shadow-sm transition"
              >
                <FaPlusCircle size={16} />
              </button>
            )}
            {index !== 0 && (
              <button
                onClick={() => deleteCap(index)}
                title="Delete Cap"
                className="bg-orange-100 hover:bg-orange-200 p-1 rounded-full text-orange-700 border border-orange-300 shadow-sm transition"
              >
                <MdDelete size={20} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 bg-white border border-gray-300 rounded-md p-4">
            {/* Cap Type */}
            <div>
              <label className="block text-sm font-medium text-orange-800 mb-2">Cap Type</label>
              <select
                value={cap.capType}
                onChange={(e) => handleCapChange(index, 'capType', e.target.value)}
                className="w-full  py-3 border border-orange-300 rounded-md text-sm bg-white"
              >
                <option value="">Type</option>
                <option value="ALU">ALU</option>
                <option value="PLASTIC">PLS</option>
              </select>
            </div>

            {/* Cap Name */}
            <div className="lg:col-span-3">
              <label className="block text-sm font-medium text-orange-800 mb-2">Cap Name</label>
              <div className="relative">
               <input
                  type="text"
                  value={cap.searchTerm}
                  placeholder={cap.capType ? "Please Select" : "Select Cap Type first"}
                  onChange={(e) => handleCapChange(index, 'searchTerm', e.target.value)}
                  onFocus={() => handleCapChange(index, 'isDropdownVisible', true)}
                  disabled={!cap.capType}
                  className={`w-full px-4 py-3 pr-10 border border-orange-300 rounded-md text-sm text-ellipsis overflow-hidden whitespace-nowrap ${
                    !cap.capType ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                  }`}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute right-3 top-3 text-orange-500 pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>

                {cap.isDropdownVisible && cap.capType && (
                  <div className="absolute z-50 w-full mt-1 bg-white shadow-xl max-h-60 rounded-md py-1 text-sm overflow-auto border border-orange-200">
                    {(cap.capType === 'ALU' ? alluminiumCapData : cap.capType === 'PLASTIC' ? plasticCapData : [])
                      .filter(c =>
                        c.ITEMNAME.toLowerCase().includes(cap.searchTerm?.toLowerCase() || "")
                      )
                      .map((c, idx) => (
                        <div
                          key={idx}
                          className="cursor-pointer px-4 py-3 hover:bg-orange-50 transition-colors flex flex-col"
                          onClick={() => handleCapSelect(index, c)}
                        >
                          <span className="font-medium">{c.ITEMNAME}</span>
                        </div>
                      ))}
                    {((cap.capType === 'ALU' && alluminiumCapData) || (cap.capType === 'PLASTIC' && plasticCapData)).filter(c =>
                      c.ITEMNAME.toLowerCase().includes(cap.searchTerm?.toLowerCase() || "")
                    ).length === 0 && (
                      <div className="px-4 py-3 text-gray-500 italic">
                        No results found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>


            {/* Process */}
            <div className="lg:col-span-3">
              <label className="block text-sm font-medium text-orange-800 mb-2">Process</label>
              <select
                value={cap.process}
                onChange={(e) => handleCapChange(index, 'process', e.target.value)}
                className={`w-full  py-3 border border-orange-300 rounded-md text-sm  ${!cap.capType ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                disabled={!cap.capType}
                title={!cap.capType ? "Please select Cap Type first" : ""}
              >
                {cap.capType === 'ALU' ? (
                  <>
                    <option value="">Process</option>
                    <option value="Plain">Plain</option>
                    <option value="UV Metalized">UV Metalized</option>
                  </>
                ) : (
                  <>
                    <option value="">Process</option>
                    <option value="Plain">Plain</option>
                    <option value="Metalized">Metalized</option>
                  </>
                )}
              </select>
            </div>

             {/* Assembly */}
            <div>
              <label className="block text-sm font-medium text-orange-800 mb-2">Assembly</label>
              <select
                value={cap.assemble}
                onChange={(e) => handleCapChange(index, 'assemble', e.target.value)}
                className="w-full py-3 border border-orange-300 rounded-md text-sm bg-white"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Pantone No */}
            <div>
              <label className="block text-sm font-medium text-orange-800 mb-2">Pantone</label>
              <input
                type="text"
                value={cap.pantoneNo}
                onChange={(e) => handleCapChange(index, 'pantoneNo', e.target.value)}
                className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white"
              />
            </div>

            {/* Fitment */}
            <div>
              <label className="block text-sm font-medium text-orange-800 mb-2">Fitment</label>
              <input
                type="text"
                value={cap.fitment}
                onChange={(e) => handleCapChange(index, 'fitment', e.target.value)}
                className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white"
              />
            </div>

              {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-orange-800 mb-2">Quantity</label>
              <input
                type="number"
                min="0"
                value={cap.quantity}
                onChange={(e) => handleCapChange(index, 'quantity', e.target.value)}
                className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white"
              />
            </div>

            {/* Rate */}
            <div>
              <label className="block text-sm font-medium text-orange-800 mb-2">Rate</label>
              <input
                type="number"
                min="0"
                value={cap.rate}
                onChange={(e) => handleCapChange(index, 'rate', e.target.value)}
                className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CapForm;
