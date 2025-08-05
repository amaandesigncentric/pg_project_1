import React from "react";
import { Eye, ChevronRight, ChevronDown, Menu, Settings, Plus, ChevronLeft, CheckCircle } from 'lucide-react';

const PendingOrders = () => {
    const [ordersPerPage, setOrdersPerPage] = React.useState(5);

    const createOrders = () => {
        console.log("Create Order")
    }

    const handleOrdersPerPageChange = (value) => {
        setOrdersPerPage(parseInt(value));
    };
    return (
        <div>
            <main className="p-3 sm:p-6" >
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[400px] sm:min-h-[570px] overflow-hidden p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
                        <button
                            onClick={createOrders}
                            className="cursor-pointer bg-orange-700 text-white flex items-center gap-2 px-3 py-1.5 rounded-sm shadow-md transition-colors duration-200 font-medium hover:bg-red-900 hover:text-white w-fit text-sm"
                        >
                            <Plus size={16} /> Create Order
                        </button>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-700">Show:</label>
                                <select
                                    value={ordersPerPage}
                                    onChange={(e) => handleOrdersPerPageChange(e.target.value)}
                                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                </select>
                                <span className="text-sm text-gray-600">entries</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PendingOrders;