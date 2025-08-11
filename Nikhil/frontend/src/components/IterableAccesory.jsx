import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useSocket } from '../context/socketContext';

const AccessoryForm = ({ accessories, onAmountChange ,onAccesoryChange}) => {

    const {accessories:accessoryData} = useSocket();

    const handleAccessoryChange = (index, key, value) => {
        const updated = [...accessories];
        updated[index][key] = value;

        // Reset Box fields if accessory is changed from Box to another
        if (key === 'accessoryName' && value !== 'Box') {
            updated[index].boxCode = '';
            updated[index].boxName = '';
        }

        if (key === 'accessoryQuantity' || key === 'accessoryRate') {
            const quantity = parseFloat(updated[index].accessoryQuantity) || 0;
            const rate = parseFloat(updated[index].accessoryRate) || 0;
            updated[index].amount = (quantity / 1000) * rate;
        }

        onAccesoryChange(updated);
    };

    const handleAccessorySelect = (index, item) => {
        const updated = [...accessories];
        updated[index].accessoryName = item.ITEMNAME;
        updated[index].searchTerm = item.ITEMNAME;
        updated[index].isDropdownVisible = false;
        onAccesoryChange(updated);
    };

      React.useEffect(() => {
        const total = accessories.reduce((sum, b) => sum + (b.amount || 0), 0);
        onAmountChange(total);
      }, [accessories, onAmountChange]);

    const addAccessory = () => {
        onAccesoryChange([
            ...accessories,
            {
                accessoryName: '',
                boxCode: '',
                boxName: '',
                accessoryQuantity: '',
                accessoryRate: '',
            },
        ]);
    };

    const deleteAccessory = (index) => {
        const updated = accessories.filter((_, i) => i !== index);
        onAccesoryChange(updated);
    };

    return (
        <div>
            {accessories.map((accessory, index) => (
                <div key={index} className="relative mb-6">
                    {/* Add/Delete Buttons */}
                    <div className="absolute top-0 right-0 flex space-x-1 -mt-2 -mr-3 z-10">
                        {index === 0 && (
                            <button
                                onClick={addAccessory}
                                title="Add Accessory"
                                className="bg-orange-100 hover:bg-orange-200 p-1 rounded-full text-orange-700 border border-orange-300 shadow-sm transition"
                            >
                                <FaPlusCircle size={16} />
                            </button>
                        )}
                        {index !== 0 && (
                            <button
                                onClick={() => deleteAccessory(index)}
                                title="Delete Accessory"
                                className="bg-orange-100 hover:bg-orange-200 p-1 rounded-full text-orange-700 border border-orange-300 shadow-sm transition"
                            >
                                <MdDelete size={20} />
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-white border border-gray-300 rounded-md p-4">
                        <div className={`${accessory.accessoryName === "Box" ? "lg:col-span-3" : "lg:col-span-6"}`}>
                        <label className="block text-sm font-medium text-orange-800 mb-2">Accessory</label>
                        <div className="relative">
                            <input
                            type="text"
                            value={accessory.searchTerm}
                            placeholder="Please Select"
                            onChange={(e) =>
                                handleAccessoryChange(index, 'searchTerm', e.target.value)
                            }
                            onFocus={() =>
                                handleAccessoryChange(index, 'isDropdownVisible', true)
                            }
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

                            {accessory.isDropdownVisible && (
                            <div className="absolute z-50 w-full mt-1 bg-white shadow-xl max-h-60 rounded-md py-1 text-sm overflow-auto border border-orange-200">
                                {[{ ITEMNAME: 'Box' }, ...accessoryData].filter(item =>
                                item.ITEMNAME.toLowerCase().includes(accessory.searchTerm?.toLowerCase() || '')
                                ).map((item, idx) => (
                                <div
                                    key={idx}
                                    className="cursor-pointer px-4 py-3 hover:bg-orange-50 transition-colors flex flex-col"
                                    onClick={() => handleAccessorySelect(index, item)}
                                >
                                    <span className="font-medium text-ellipsis overflow-hidden whitespace-nowrap">
                                    {item.ITEMNAME}
                                    </span>
                                </div>
                                ))}
                            </div>
                            )}
                        </div>
                        </div>

                        {/* Box Code */}
                        {accessory.accessoryName === 'Box' && (
                            <div className="lg:col-span-2">
                                <label className="block text-sm font-medium text-orange-800 mb-2">Box Code</label>
                                <input
                                    type="text"
                                    value={accessory.boxCode}
                                    onChange={(e) => handleAccessoryChange(index, 'boxCode', e.target.value)}
                                    className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white focus:outline-none"
                                />
                            </div>
                        )}

                        {/* Box Name */}
                        {accessory.accessoryName === 'Box' && (
                            <div className="lg:col-span-3">
                                <label className="block text-sm font-medium text-orange-800 mb-2">Box Name</label>
                                <input
                                    type="text"
                                    value={accessory.boxName}
                                    onChange={(e) => handleAccessoryChange(index, 'boxName', e.target.value)}
                                    className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white focus:outline-none"
                                />
                            </div>
                        )}

                        {/* Quantity */}
                        <div className={`${accessory.accessoryName === 'Box' ? "lg:col-span-2" : "lg:col-span-3"}`}>
                            <label className="block text-sm font-medium text-orange-800 mb-2">Quantity</label>
                            <input
                                type="number"
                                min="0"
                                value={accessory.accessoryQuantity}
                                onChange={(e) => handleAccessoryChange(index, 'accessoryQuantity', e.target.value)}
                                className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white focus:outline-none"
                            />
                        </div>

                        {/* Rate */}
                        <div className={`${accessory.accessoryName === 'Box' ? "lg:col-span-2" : "lg:col-span-3"}`}>
                            <label className="block text-sm font-medium text-orange-800 mb-2">Rate</label>
                            <input
                                type="number"
                                min="0"
                                value={accessory.accessoryRate}
                                onChange={(e) => handleAccessoryChange(index, 'accessoryRate', e.target.value)}
                                className="w-full px-4 py-3 border border-orange-300 rounded-md text-sm bg-white focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AccessoryForm;
