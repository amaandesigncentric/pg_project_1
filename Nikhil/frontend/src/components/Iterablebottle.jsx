import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import DECORATION_COMBINATIONS from '../constants/decoData';
import { useSocket } from '../context/socketContext';
const BottleForm = ({ bottles, onAmountChange ,onBottlesChange}) => {
  const { bottles:bottleData} = useSocket();


   const handleBottleChange = (index, key, value) => {
    const updated = [...bottles];
    updated[index][key] = value;

    if (key === 'quantity' || key === 'rate') {
      const quantity = parseFloat(updated[index].quantity) || 0;
      const rate = parseFloat(updated[index].rate) || 0;
      updated[index].amount = (quantity / 1000) * rate;
    }
    onBottlesChange(updated);
  };

  React.useEffect(() => {
    const total = bottles.reduce((sum, b) => sum + (b.amount || 0), 0);
    onAmountChange(total);
  }, [bottles, onAmountChange]);

const handleBottleSelect = (index, selectedBottle) => {
  const updated = [...bottles];
  updated[index].bottleName = selectedBottle.FORMULA;
  updated[index].neckSize = selectedBottle.NECK_DIAM;
  updated[index].bootleCapacity = selectedBottle.capacity;
  updated[index].searchTerm = selectedBottle.FORMULA;
  updated[index].isDropdownVisible = false;
  onBottlesChange(updated);
};


  const addBottle = () => {
    onBottlesChange([
      ...bottles,
      {
        bottleName: '',
        neckSize: '',
        bootleCapacity: '',
        bootleDecoration: '',
        decoNumber: '',
        quantity: '',
        rate: '',
        searchTerm: '',
        isDropdownVisible: false,
      },
    ]);
  };

  const deleteBottle = (index) => {
    const updated = bottles.filter((_, i) => i !== index);
    onBottlesChange(updated);
  };

  return (
    <div>
      {bottles.map((bottle, index) => {
        const filteredBottles = bottleData.filter((b) =>
          b.FORMULA.toLowerCase().includes(bottle.searchTerm.toLowerCase())
        );
        return (
          <div className="relative mb-6">
            <div className="absolute top-0 right-0 flex space-x-1 -mt-2 -mr-3">
              {index === 0 && (
                <button
                  onClick={addBottle}
                  className="bg-orange-100 hover:bg-orange-200 p-1 rounded-full text-orange-700 border border-orange-300 shadow-sm transition"
                  title="Add Bottle">
                  <FaPlusCircle size={16} strokeWidth={2.5} />
                </button>
              )}
              {index !== 0 && (
                <button
                  onClick={() => deleteBottle(index)}
                  title="Delete Bottle"
                  className="bg-orange-100 hover:bg-orange-200 p-1 rounded-full text-orange-700 border border-orange-300 shadow-sm transition"

                >
                  <MdDelete size={20} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 bg-white border border-gray-300 rounded-md p-4">
              {/* Bottle Name (Searchable) */}
              <div className="lg:col-span-4">
                <label className="block text-sm font-medium text-orange-800 mb-2">Bottle Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={bottle.searchTerm}
                    placeholder="Please Select"
                    onChange={(e) =>
                      handleBottleChange(index, 'searchTerm', e.target.value)
                    }
                    onFocus={() =>
                      handleBottleChange(index, 'isDropdownVisible', true)
                    }
                    className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white"
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

                  {bottle.isDropdownVisible && (
                    <div className="absolute z-50 w-full mt-1 bg-white shadow-xl max-h-60 rounded-md py-1 text-sm overflow-auto border border-orange-200">
                      {filteredBottles.length > 0 ? (
                        filteredBottles.map((b, idx) => (
                          <div
                            key={idx}
                            className="cursor-pointer px-4 py-3 hover:bg-orange-50 transition-colors flex flex-col"
                            onClick={() => handleBottleSelect(index, b)}
                          >
                            <span className="font-medium">{b.FORMULA}</span>
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

              {/* Capacity */}
              <div>
                <label className="block text-sm font-medium text-orange-800 mb-2">Capacity</label>
                <input
                  type="text"
                  value={bottle.bootleCapacity}
                  disabled
                  className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Neck Size */}
              <div>
                <label className="block text-sm font-medium text-orange-800 mb-2">Neck Size</label>
                <input
                  type="text"
                  value={bottle.neckSize}
                  disabled
                  className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Decoration */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-orange-800 mb-2">Decoration</label>
                <select
                  value={bottle.bootleDecoration}
                  onChange={(e) => handleBottleChange(index, 'bootleDecoration', e.target.value)}
                  className="w-full  py-3 border border-orange-300 rounded-md text-sm bg-white"
                >
                  <option value="">Select</option>
                  {DECORATION_COMBINATIONS.map((combo) => (
                    <option key={combo.key} value={combo.key}>
                      {combo.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Deco Number */}
              <div>
                <label className="block text-sm font-medium text-orange-800 mb-2">Deco No.</label>
                <input
                  type="text"
                  value={bottle.decoNumber}
                  onChange={(e) => handleBottleChange(index, 'decoNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white"
                />
              </div>

              {/* Quantity */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-orange-800 mb-2">Quantity</label>
                <input
                  type="number"
                  min="0"
                  value={bottle.quantity}
                  onChange={(e) => handleBottleChange(index, 'quantity', e.target.value)}
                  className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white"
                />
              </div>

              {/* Rate */}
              <div>
                <label className="block text-sm font-medium text-orange-800 mb-2">Rate</label>
                <input
                  type="number"
                  min="0"
                  value={bottle.rate}
                  onChange={(e) => handleBottleChange(index, 'rate', e.target.value)}
                  className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BottleForm;
