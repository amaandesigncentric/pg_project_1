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
    <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[85vh] overflow-hidden">
        <div className="bg-orange-600 text-white px-6 py-4">
          <h3 className="text-lg font-semibold">Stock Availability Check</h3>
          <p className="text-orange-100 text-sm">
            Order #{selectedOrder?.order_number} - {selectedItem?.item_name}
          </p>
          <p className="text-orange-200 text-xs mt-1">
            Select quantities from your existing inventory to fulfill this order
          </p>
        </div>

        <div className="p-6">
          <p className="text-gray-700 mb-6">
            Do you have existing stock available for these bottles?
          </p>

          <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
            {bottles.map((bottle, index) => {
              const remaining = getRemainingQty(bottle);
              const maxStock = Math.min(remaining, bottle.available_stock || 0);
              const colorClasses = ['bg-orange-50', 'bg-orange-100', 'bg-yellow-50', 'bg-yellow-100'];
              const bgColor = colorClasses[index % colorClasses.length];

              return (
                <div key={bottle.deco_no} className={`${bgColor} rounded-lg p-5`}>
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
              );
            })}
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <button
              onClick={handleStockDialogClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleStockNo}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
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
              className="px-4 py-2 text-white bg-green-900 rounded-md hover:bg-green-700"
            >
              Use All Available Stock
            </button>
            <button
              onClick={handleStockYes}
              disabled={!hasStockQuantities}
              className="px-4 py-2 text-white bg-orange-600 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Use Selected Stock ({Object.values(stockQuantities).filter(qty => qty !== '' && parseInt(qty) > 0).length} items)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockAvailabilityDialog;
