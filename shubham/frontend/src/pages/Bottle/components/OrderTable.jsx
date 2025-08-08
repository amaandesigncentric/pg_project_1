import React from 'react';
import { Package, Edit, Eye, EyeOff } from 'lucide-react'; // or wherever your icons are from

const OrderTable = ({
  currentOrders,
  orderType,
  getRemainingQty,
  handleEditClick,
  handleCopyBottleName,
  handleSearchCustomer, 
  handleSearchManager,
  expandedRows,
  toggleRowExpansion,
  getStatusStyle,
}) => {
  if (currentOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
          <Package className="w-8 h-8 text-orange-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No {orderType} bottle orders found
        </h3>
        <p className="text-sm text-gray-500 text-center max-w-sm">
          {orderType === 'pending'
            ? 'When you receive new orders, they will appear here for easy management and tracking.'
            : 'Completed orders will appear here once all bottles in an order are finished.'}
        </p>
      </div>
    );
  }

  const colorClasses = ['bg-orange-50', 'bg-orange-100', 'bg-yellow-50', 'bg-yellow-100'];

  return (
    <div className="space-y-4">
      {/* Desktop Table */}
      <div className="hidden xl:block">
        <div className="bg-gradient-to-r from-orange-800 via-orange-600 to-orange-400 rounded-lg shadow-md py-3 px-4 mb-3">
          <div className="grid grid-cols-19 gap-1 text-white font-semibold text-xs items-center">
            <div className="text-left">Order #</div>
            <div className="text-left">Manager</div>
            <div className="text-left col-span-2">Customer</div>
            <div className="text-center ">Progress</div>
            <div className="text-left col-span-1">Item</div>
            <div className="text-left col-span-4">Bottle Name</div>

            <div className="text-left">Quantity</div>
            <div className="text-left">Remaining</div>
            <div className="text-left flex justify-center">Priority</div>
            <div className="text-left flex justify-center col-span-2">Status</div>
            <div className="text-left">Deco No</div>
            <div className="text-left flex justify-center">Inv Avl</div>
            <div className="text-left flex justify-center">Inv Used</div>

            <div className="text-center">Edit</div>
          </div>
        </div>

        {currentOrders.map((order, orderIndex) => {
          let totalOrderRows = 0;
          order.items?.forEach(item => {
            const bottles = item.bottle || [];
            totalOrderRows += Math.max(1, bottles.length);
          });

          let currentRowInOrder = 0;

          return (
            <div key={`order-${order.order_number}`} className="bg-white rounded-lg shadow-sm border border-orange-200 mb-3 overflow-hidden">
              {order.items?.map((item, itemIndex) => {
                const bottles = item.bottle || [];
                const bottlesToShow = bottles.length === 0 ? [null] : bottles;
                const bgColor = colorClasses[itemIndex % colorClasses.length];

                return bottlesToShow.map((bottle, bottleIndex) => {
                  const isFirstRowOfOrder = currentRowInOrder === 0;
                  const isFirstRowOfItem = bottleIndex === 0;
                  const isLastRowOfOrder = currentRowInOrder === totalOrderRows - 1;
                  currentRowInOrder++;

                  const remainingQty = bottle ? getRemainingQty(bottle) : 'N/A';
                  const status = bottle ? bottle.status : 'N/A';

                  return (
                    <div
                      key={`${order.order_number}-${item.item_name}-${bottle?.deco_no || 'empty'}-${bottleIndex}`}
                      className={`grid grid-cols-19 gap-1 items-center py-2 px-3 text-xs ${bgColor} ${!isLastRowOfOrder ? 'border-b border-orange-100' : ''}`}
                    >
                      <div className="text-left">
                        {isFirstRowOfOrder ? (
                          <span className="font-bold text-orange-800">{order.order_number}</span>
                        ) : (
                          <span className="text-transparent">{order.order_number}</span>
                        )}
                      </div>
                      <div className="text-left">
                        {isFirstRowOfOrder ? (
                          <button
                            onClick={() => handleSearchManager(order.manager_name)}
                            className="font-bold text-orange-800 hover:text-orange-600 hover:underline transition-colors cursor-pointer"
                            title="Search by manager name"
                          >
                            {order.manager_name}
                          </button>
                        ) : (
                          <span className="text-transparent">{order.manager_name}</span>
                        )}
                      </div>

                      <div className="text-left col-span-2">
                        {isFirstRowOfOrder ? (
                          <button
                            onClick={() => handleSearchCustomer(order.customer_name)}
                            className="font-bold text-orange-800 hover:text-orange-600 hover:underline transition-colors cursor-pointer"
                            title="Search by customer name"
                          >
                            {order.customer_name}
                          </button>
                        ) : (
                          <span className="text-transparent">{order.customer_name}</span>
                        )}
                      </div>
                      <div className="text-center ">
                        {isFirstRowOfOrder ? (
                          <span className="font-bold text-orange-800">25%</span>
                        ) : (
                          <span className="text-transparent">25%</span>
                        )}
                      </div>

                      <div className="text-left col-span-1">
                        {isFirstRowOfItem ? (
                          <span className="text-orange-800 font-medium">{item.item_name || 'N/A'}</span>
                        ) : (
                          <span className="text-transparent">{item.item_name || 'N/A'}</span>
                        )}
                      </div>

                      <div className="text-left text-orange-900 col-span-4">
                        <div className="flex items-center gap-1">
                          <span>{bottle ? (bottle.bottle_name || 'N/A') : 'N/A'}</span>
                          {bottle && bottle.bottle_name && (
                            <button
                              onClick={() => handleCopyBottleName(bottle.bottle_name)}
                              className="p-0.5 text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded transition-colors"
                              title="Copy bottle name to search"
                            >
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="text-left text-orange-900">
                        {bottle ? (bottle.quantity || 'N/A') : 'N/A'}
                      </div>

                      <div className="text-left">
                        <span className={`font-semibold ${remainingQty === 0 ? 'text-green-900' : 'text-orange-700'}`}>
                          {remainingQty}
                        </span>
                      </div>

                      <div className="text-left flex justify-center">
                        <span className="font-bold text-red-800 animate-pulse">
                          High
                        </span>
                      </div>

                      <div className="text-left flex justify-center col-span-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(status)}`}>
                          {status}
                        </span>
                      </div>

                      <div className="text-left text-gray-800">
                        {bottle ? (bottle.deco_no || 'N/A') : 'N/A'}
                      </div>

                      <div className="text-left text-red-900 font-semibold flex justify-center">
                        {bottle ? bottle.available_stock : 'N/A'}
                      </div>
                      <div className="text-left text-red-900 font-semibold flex justify-center">
                        {bottle ? (bottle.inventory_used || 0) : 'N/A'}
                      </div>



                      <div className="text-center">
                        {isFirstRowOfItem && orderType === 'pending' ? (
                          <button
                            onClick={() => handleEditClick(order, item)}
                            className="inline-flex items-center justify-center p-1.5 bg-orange-600 rounded text-white hover:bg-orange-500 transition-colors duration-200 shadow-sm"
                            title="Edit quantities"
                          >
                            <Edit size={14} />
                          </button>
                        ) : (
                          <div className="p-1.5">
                            <Edit size={12} className="text-transparent" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                });
              })}
            </div>
          );
        })}
      </div>

      <div className="xl:hidden space-y-4">
        {currentOrders.map((order, orderIndex) => (
          <div key={`mobile-order-${order.order_number}`} className="bg-white rounded-lg shadow-sm border border-orange-200 overflow-hidden">
            {/* Order Header */}
            <div className="bg-gradient-to-r from-orange-800 via-orange-600 to-orange-400 px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold text-sm">{order.order_number}</h3>
                  <p className="text-orange-100 text-xs">{order.customer_name}</p>
                </div>
                <div className="text-orange-100 text-xs">
                  {order.items?.length || 0} items
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="divide-y divide-gray-100">
              {order.items?.map((item, itemIndex) => {
                const bottles = item.bottle || [];
                const bgColor = colorClasses[itemIndex % colorClasses.length];
                return (
                  <div key={`mobile-item-${item.item_name}`} className={bgColor}>
                    <div className="px-4 py-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-orange-800 text-sm">{item.item_name}</h4>
                        {orderType === 'pending' && (
                          <button
                            onClick={() => handleEditClick(order, item)}
                            className="p-2 bg-orange-600 rounded text-white hover:bg-orange-500 transition-colors"
                          >
                            <Edit size={14} />
                          </button>
                        )}
                      </div>

                      {bottles.length > 0 ? (
                        <div className="space-y-3">
                          {bottles.map((bottle, bottleIndex) => {
                            const remainingQty = getRemainingQty(bottle);
                            const status = bottle.status;
                            const rowId = `${order.order_number}-${item.item_name}-${bottle.deco_no}`;
                            const isExpanded = expandedRows.has(rowId);

                            return (
                              <div key={bottle.deco_no} className="bg-white rounded-lg p-3 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1">
                                      <p className="font-medium text-gray-900 text-sm truncate">
                                        {bottle.bottle_name}
                                      </p>
                                      <button
                                        onClick={() => handleCopyBottleName(bottle.bottle_name)}
                                        className="p-0.5 text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded transition-colors flex-shrink-0"
                                        title="Copy bottle name to search"
                                      >
                                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                      </button>
                                    </div>
                                    <div className="flex items-center gap-4 mt-1">
                                      <span className="text-xs text-gray-600">
                                        Qty: <span className="font-medium text-orange-900">{bottle.quantity}</span>
                                      </span>
                                      <span className="text-xs text-gray-600">
                                        Remaining: <span className={`font-medium ${remainingQty === 0 ? 'text-green-600' : 'text-orange-700'}`}>{remainingQty}</span>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 ml-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(status)}`}>
                                      {status}
                                    </span>
                                    <button
                                      onClick={() => toggleRowExpansion(rowId)}
                                      className="p-1 text-gray-400 hover:text-gray-600"
                                    >
                                      {isExpanded ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                  </div>
                                </div>

                                {isExpanded && (
                                  <div className="pt-2 border-t border-gray-100">
                                    <div className="grid grid-cols-2 gap-3 text-xs">
                                      <div>
                                        <span className="text-gray-500">Neck Size:</span>
                                        <p className="font-medium text-gray-900">{bottle.neck_size || 'N/A'}mm</p>
                                      </div>
                                      <div>
                                        <span className="text-gray-500">Capacity:</span>
                                        <p className="font-medium text-gray-900">{bottle.capacity || 'N/A'}</p>
                                      </div>
                                      <div>
                                        <span className="text-gray-500">Deco No:</span>
                                        <p className="font-medium text-gray-900">{bottle.deco_no || 'N/A'}</p>
                                      </div>
                                      <div>
                                        <span className="text-gray-500">Rate:</span>
                                        <p className="font-medium text-gray-900">₹{bottle.rate || 'N/A'}</p>
                                      </div>
                                      <div>
                                        <span className="text-gray-500">Available Stock:</span>
                                        <p className="font-medium text-gray-900">{bottle.available_stock || 'N/A'}</p>
                                      </div>
                                      <div>
                                        <span className="text-gray-500">Approved:</span>
                                        <p className={`font-medium ${bottle.is_deco_no_approved ? 'text-green-900' : 'text-red-600'}`}>
                                          {bottle.is_deco_no_approved ? 'Yes' : 'No'}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="bg-white rounded-lg p-3 text-center text-gray-500 text-sm">
                          No bottles assigned
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTable;
