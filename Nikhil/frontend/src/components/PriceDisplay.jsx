import React from 'react';
import { Receipt, TrendingUp } from 'lucide-react';

const ModernPriceDisplay = ({ orderItems, exchangeRates, isLoadingRates ,currency }) => {



  const formatCurrency = (amount, currency) => {
    if (isLoadingRates && currency !== 'INR') {
      return <span className="text-orange-400">...</span>;
    }
    
    const formatters = {
      INR: (val) => `₹${(val * (exchangeRates?.INR || 1)).toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
      USD: (val) => `$${(val * (exchangeRates?.USD || 1)).toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
      EUR: (val) => `€${(val * (exchangeRates?.EUR || 1)).toLocaleString('en-DE', { maximumFractionDigits: 2 })}`,
      GBP: (val) => `£${(val * (exchangeRates?.GBP || 1)).toLocaleString('en-GB', { maximumFractionDigits: 2 })}`
    };
    
    return formatters[currency](amount);
  };

  const grandTotalINR = orderItems.reduce((sum, item) => sum + item.totalAmount, 0);

  return (
    <div className="w-full bg-white mt-6">
      <div className="bg-[#FF6701] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Receipt className="h-5 w-5 text-white" />
          <div>
            <h3 className="text-white text-xl font-bold tracking-wide">Order Summary</h3>
          </div>
        </div>
        <div className="text-white text-right">
          <div className="text-lg font-bold">{orderItems.length}</div>
          <div className="text-orange-100 text-xs">Items</div>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-[#FFF0E7] p-3">
        <h4 className="text-orange-800 font-medium mb-3">Item Details</h4>
        
        <div className="space-y-2">
          {orderItems.map((item, index) => {
            return (
<div
  key={index}
  className="flex items-center justify-between py-2 px-3 bg-white rounded hover:bg-orange-50 transition-colors"
>
  <div className="flex items-center gap-3">
    <div className="w-6 h-6 bg-gradient-to-r from-[#FF6701] to-[#FF8533] text-white rounded-full flex items-center justify-center text-xs font-bold">
      {index + 1}
    </div>
    <div>
      <h4 className="font-medium text-gray-800 text-sm">{`Item ${index + 1}`}</h4>
      <div className="flex items-center gap-4 text-xs text-gray-600">
        {["INR", "USD", "EUR", "GBP"]
          .filter((cur) => cur !== currency)
          .map((cur) => (
            <span key={cur}>
              {cur}: {formatCurrency(item.totalAmount, cur)}
            </span>
          ))}
      </div>
    </div>
  </div>
  <div className="text-right">
    <div className="text-sm font-semibold text-gray-800">
      {formatCurrency(item.totalAmount, currency)}
    </div>
  </div>
</div>

            );
          })}
        </div>
      </div>

      {/* Total Section */}
      <div className="bg-[#FFF8F3] p-4 border-t border-orange-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-base font-semibold text-orange-800">Total Order Amount</h4>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <TrendingUp className="h-3 w-3 text-[#FF6701]" />
            <span>{isLoadingRates ? 'Updating...' : 'Live rates'}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center p-2 bg-white rounded border border-orange-200">
            <div className="text-xs text-orange-600 font-medium mb-1">INR</div>
            <div className="text-sm font-bold text-orange-800">
              {formatCurrency(grandTotalINR, 'INR')}
            </div>
          </div>
          
          <div className="text-center p-2 bg-white rounded border border-orange-200">
            <div className="text-xs text-orange-600 font-medium mb-1">USD</div>
            <div className="text-sm font-bold text-orange-800">
              {formatCurrency(grandTotalINR, 'USD')}
            </div>
          </div>
          
          <div className="text-center p-2 bg-white rounded border border-orange-200">
            <div className="text-xs text-orange-600 font-medium mb-1">EUR</div>
            <div className="text-sm font-bold text-orange-800">
              {formatCurrency(grandTotalINR, 'EUR')}
            </div>
          </div>
          
          <div className="text-center p-2 bg-white rounded border border-orange-200">
            <div className="text-xs text-orange-600 font-medium mb-1">GBP</div>
            <div className="text-sm font-bold text-orange-800">
              {formatCurrency(grandTotalINR, 'GBP')}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between py-2 px-4 text-xs text-gray-500 border-t border-orange-200">
        <span>Generated: {new Date().toLocaleDateString()}</span>
        <span>{orderItems.length} items total</span>
      </div>
    </div>
  );
};

export default ModernPriceDisplay;