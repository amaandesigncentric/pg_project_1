import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useSocket } from '../context/socketContext';

const PumpForm = ({ pumps , onAmountChange ,onPumpsChange}) => {


  const { pumps: pumpData } = useSocket();
  const handlePumpChange = (index, key, value) => {
    const updated = [...pumps];
    updated[index][key] = value;

    if (key === 'pumpQuantity' || key === 'pumpRate') {
      const quantity = parseFloat(updated[index].pumpQuantity) || 0;
      const rate = parseFloat(updated[index].pumpRate) || 0;
      updated[index].amount = (quantity / 1000) * rate;
    }

    onPumpsChange(updated);
  };

  const handlePumpSelect = (index, pump) => {
    const updated = [...pumps];
    updated[index].pumpName = pump.ITEMNAME;
    updated[index].searchTerm = pump.ITEMNAME;
    updated[index].isDropdownVisible = false;
    onPumpsChange(updated);
  };


  React.useEffect(() => {
    const total = pumps.reduce((sum, b) => sum + (b.amount || 0), 0);
    onAmountChange(total);
  }, [pumps, onAmountChange]);
  const addPump = () => {
    onPumpsChange([
      ...pumps,
      {
        pumpName: '',
        pumpQuantity: '',
        pumpRate: '',
      },
    ]);
  };

  const deletePump = (index) => {
    const updated = pumps.filter((_, i) => i !== index);
    onPumpsChange(updated);
  };

  return (
    <div>
      {pumps.map((pump, index) => {
          const filteredPumps = pumpData.filter(p =>
  p.ITEMNAME.toLowerCase().includes(pump.searchTerm?.toLowerCase() || '')
  );
  return(
        <div key={index} className="relative mb-6">
          {/* Add/Delete Buttons */}
          <div className="absolute top-0 right-0 flex space-x-1 -mt-2 -mr-3 z-10">
            {index === 0 && (
              <button
                onClick={addPump}
                title="Add Pump"
                className="bg-orange-100 hover:bg-orange-200 p-1 rounded-full text-orange-700 border border-orange-300 shadow-sm transition"
              >
                <FaPlusCircle size={16} />
              </button>
            )}
            {index !== 0 && (
              <button
                onClick={() => deletePump(index)}
                title="Delete Pump"
                className="bg-orange-100 hover:bg-orange-200 p-1 rounded-full text-orange-700 border border-orange-300 shadow-sm transition"
              >
                <MdDelete size={20} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 bg-white border border-gray-300 rounded-md p-4">
            {/* Pump Name */}
            <div className="lg:col-span-6">
              <label className="block text-sm font-medium text-orange-800 mb-2">Pump Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={pump.searchTerm}
                  placeholder="Please Select"
                  onChange={(e) => handlePumpChange(index, 'searchTerm', e.target.value)}
                  onFocus={() => handlePumpChange(index, 'isDropdownVisible', true)}
                  className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white text-ellipsis overflow-hidden whitespace-nowrap"
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

                {pump.isDropdownVisible && (
                  <div className="absolute z-50 w-full mt-1 bg-white shadow-xl max-h-60 rounded-md py-1 text-sm overflow-auto border border-orange-200">
                    {filteredPumps.length > 0 ? (
                      filteredPumps.map((p, idx) => (
                        <div
                          key={idx}
                          className="cursor-pointer px-4 py-3 hover:bg-orange-50 transition-colors flex flex-col"
                          onClick={() => handlePumpSelect(index, p)}
                        >
                          <span className="font-medium text-ellipsis overflow-hidden whitespace-nowrap">
                            {p.ITEMNAME}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-gray-500 italic">
                        No results found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Pump Quantity */}
            <div className="lg:col-span-3">
              <label className="block text-sm font-medium text-orange-800 mb-2">Quantity</label>
              <input
                type="number"
                min="0"
                value={pump.pumpQuantity}
                onChange={(e) => handlePumpChange(index, 'pumpQuantity', e.target.value)}
                className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white focus:outline-none"
              />
            </div>

            {/* Pump Rate */}
            <div className="lg:col-span-3">
              <label className="block text-sm font-medium text-orange-800 mb-2">Rate</label>
              <input
                type="number"
                min="0"
                value={pump.pumpRate}
                onChange={(e) => handlePumpChange(index, 'pumpRate', e.target.value)}
                className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      )
})}
    </div>
  );
};

export default PumpForm;
