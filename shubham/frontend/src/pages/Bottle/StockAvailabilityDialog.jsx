import React from 'react';

const StockAvailabilityDialog = ({
  showStockDialog,
  selectedItem,
  selectedOrder,
  stockQuantities,
  handleStockQuantityChange,
  handleStockDialogClose,
  handleStockNo,
  handleStockYes,
  getRemainingQty,
  setStockQuantities,
}) => {
  if (!showStockDialog || !selectedItem) return null;

  const bottles = selectedItem.bottle || [];
  const hasStockQuantities = Object.values(stockQuantities).some(qty =>
    qty !== '' && parseInt(qty) > 0
  );

  return (
    <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-2xl lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-orange-600 text-white px-3 sm:px-6 py-3 sm:py-4">
          <h3 className="text-base sm:text-lg font-semibold">Stock Availability Check</h3>
          <p className="text-orange-100 text-xs sm:text-sm mt-1">
            Order #{selectedOrder?.order_number} - {selectedItem?.item_name}
          </p>
          <p className="text-orange-200 text-xs mt-1 hidden sm:block">
            Select quantities from your existing inventory to fulfill this order
          </p>
        </div>

        <div className="p-3 sm:p-6">
          <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
            Do you have existing stock available for these bottles?
          </p>

          {/* Bottles List */}
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 max-h-60 sm:max-h-80 overflow-y-auto">
            {bottles.map((bottle, index) => {
              const remaining = getRemainingQty(bottle);
              const maxStock = Math.min(remaining, bottle.available_stock || 0);
              const colorClasses = ['bg-orange-50', 'bg-orange-100', 'bg-yellow-50', 'bg-yellow-100'];
              const bgColor = colorClasses[index % colorClasses.length];

              return (
                <div key={bottle.deco_no} className={`${bgColor} rounded-lg p-3 sm:p-5`}>
                  {/* Desktop Layout */}
                  <div className="hidden md:block">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-orange-900 text-base">{bottle.bottle_name}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {bottle.neck_size}mm / {bottle.capacity} - <span className="font-medium">Need: {remaining}</span>
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Available:</span> {bottle.available_stock || 0}
                        </p>
                        <p className="text-sm text-green-900 font-medium">
                          Max Use: {maxStock}
                        </p>
                        <button
                          onClick={() => handleStockQuantityChange(bottle.deco_no, maxStock.toString())}
                          className="mt-1 text-xs text-orange-600 hover:text-orange-800 underline"
                          disabled={maxStock === 0}
                        >
                          Use All ({maxStock})
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="text-sm text-gray-700 whitespace-nowrap font-medium">Stock Qty to Use:</label>
                      <input
                        type="number"
                        min="0"
                        max={maxStock}
                        value={stockQuantities[bottle.deco_no] || ''}
                        onChange={(e) => handleStockQuantityChange(bottle.deco_no, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder={maxStock > 0 ? `Max: ${maxStock}` : 'No stock available'}
                        disabled={maxStock === 0}
                        onBlur={(e) => {
                          const val = parseInt(e.target.value);
                          if (val > maxStock) {
                            handleStockQuantityChange(bottle.deco_no, maxStock.toString());
                          }
                        }}
                      />
                      {stockQuantities[bottle.deco_no] && parseInt(stockQuantities[bottle.deco_no]) > 0 && (
                        <span className="text-sm text-green-900 font-medium whitespace-nowrap">
                          ✓ {stockQuantities[bottle.deco_no]} selected
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden">
                    <div className="mb-3">
                      <h4 className="font-medium text-orange-900 text-sm">{bottle.bottle_name}</h4>
                      <div className="text-xs text-gray-600 mt-1 space-y-1">
                        <div>{bottle.neck_size}mm / {bottle.capacity}</div>
                        <div><span className="font-medium">Need:</span> {remaining}</div>
                        <div><span className="font-medium">Available:</span> {bottle.available_stock || 0}</div>
                        <div className="text-green-900 font-medium">Max Use: {maxStock}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs text-gray-700 font-medium">Stock Qty to Use:</label>
                        <button
                          onClick={() => handleStockQuantityChange(bottle.deco_no, maxStock.toString())}
                          className="text-xs text-orange-600 hover:text-orange-800 underline"
                          disabled={maxStock === 0}
                        >
                          Use All ({maxStock})
                        </button>
                      </div>
                      
                      <input
                        type="number"
                        min="0"
                        max={maxStock}
                        value={stockQuantities[bottle.deco_no] || ''}
                        onChange={(e) => handleStockQuantityChange(bottle.deco_no, e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder={maxStock > 0 ? `Max: ${maxStock}` : 'No stock available'}
                        disabled={maxStock === 0}
                        onBlur={(e) => {
                          const val = parseInt(e.target.value);
                          if (val > maxStock) {
                            handleStockQuantityChange(bottle.deco_no, maxStock.toString());
                          }
                        }}
                      />
                      
                      {stockQuantities[bottle.deco_no] && parseInt(stockQuantities[bottle.deco_no]) > 0 && (
                        <div className="text-xs text-green-900 font-medium text-center bg-green-50 py-1 rounded">
                          ✓ {stockQuantities[bottle.deco_no]} selected
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 sm:space-y-0 sm:flex sm:flex-wrap sm:justify-end sm:gap-3">
            <button
              onClick={handleStockDialogClose}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleStockNo}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              No Stock Available
            </button>
            <button
              onClick={() => {
                const allMaxStock = {};
                bottles.forEach(bottle => {
                  const remaining = getRemainingQty(bottle);
                  const maxStock = Math.min(remaining, bottle.available_stock || 0);
                  if (maxStock > 0) {
                    allMaxStock[bottle.deco_no] = maxStock.toString();
                  }
                });
                setStockQuantities(allMaxStock);
                handleStockYes();
              }}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm text-white bg-green-900 rounded-md hover:bg-green-700"
            >
              <span className="hidden sm:inline">Use All Available Stock</span>
              <span className="sm:hidden">Use All Stock</span>
            </button>
            <button
              onClick={handleStockYes}
              disabled={!hasStockQuantities}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm text-white bg-orange-600 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">
                Use Selected Stock ({Object.values(stockQuantities).filter(qty => qty !== '' && parseInt(qty) > 0).length} items)
              </span>
              <span className="sm:hidden">
                Use Selected ({Object.values(stockQuantities).filter(qty => qty !== '' && parseInt(qty) > 0).length})
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockAvailabilityDialog;