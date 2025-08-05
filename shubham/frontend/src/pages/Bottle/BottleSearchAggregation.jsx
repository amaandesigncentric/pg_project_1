// import React from 'react';

// const BottleSearchAggregation = ({
//   searchTerm,
//   setSearchTerm,
//   aggregatedBottles,
//   setCurrentPage,
// }) => {
//   const searchResults = searchTerm.trim()
//     ? Object.entries(aggregatedBottles).filter(([key, bottle]) =>
//         bottle.bottle_name.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : [];

//   return (
//     <div className="mb-4 space-y-3">
//       <div className="relative">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           placeholder="Search by bottle name, order number, customer, or deco number..."
//           className="w-full px-3 py-2 pl-10 pr-20 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
//         />
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </div>
//         {searchTerm && (
//           <div className="absolute inset-y-0 right-0 pr-2 flex items-center space-x-1">
//             <button
//               onClick={() => {
//                 setSearchTerm('');
//                 setCurrentPage(1);
//               }}
//               className="px-2 py-0.5 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//               title="Cancel search"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={() => {
//                 setSearchTerm('');
//                 setCurrentPage(1);
//               }}
//               className="p-1 text-gray-400 hover:text-gray-600"
//               title="Clear search"
//             >
//               <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//         )}
//       </div>

//       {searchTerm.trim() && searchResults.length > 0 && (
//         <div className="bg-[#FFF0E7] rounded-lg p-3">
//           <h4 className="text-base font-semibold text-orange-800 mb-2">
//             Bottle Summary for "{searchTerm}"
//           </h4>
//           <div className="space-y-2">
//             {searchResults.map(([key, bottle]) => (
//               <div key={key} className="bg-white rounded-lg p-3 shadow-sm">
//                 <div className="flex items-center justify-between mb-2">
//                   <h5 className="font-medium text-gray-900 text-sm">{bottle.bottle_name}</h5>
//                   <div className="text-xs text-gray-600">
//                     {bottle.neck_size}mm / {bottle.capacity}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-2">
//                   <div>
//                     <span className="text-gray-500">Total Qty:</span>
//                     <p className="font-semibold text-orange-900">{bottle.total_quantity}</p>
//                   </div>
//                   <div>
//                     <span className="text-gray-500">Remaining:</span>
//                     <p className="font-semibold text-red-600">{bottle.total_remaining}</p>
//                   </div>
//                   <div>
//                     <span className="text-gray-500">Stock:</span>
//                     <p className="font-semibold text-green-600">{bottle.available_stock}</p>
//                   </div>
//                   <div>
//                     <span className="text-gray-500">Orders:</span>
//                     <p className="font-semibold text-blue-600">{bottle.orders.length}</p>
//                   </div>
//                 </div>

//                 <div className="p-2 bg-gray-50 rounded-md">
//                   <div className="flex items-center justify-between text-xs">
//                     <span className="text-gray-600">Stock vs Demand:</span>
//                     <span
//                       className={`font-semibold ${
//                         bottle.available_stock >= bottle.total_remaining
//                           ? 'text-green-600'
//                           : 'text-red-600'
//                       }`}
//                     >
//                       {bottle.available_stock >= bottle.total_remaining
//                         ? `✓ Sufficient (+${bottle.available_stock - bottle.total_remaining})`
//                         : `⚠ Short by ${bottle.total_remaining - bottle.available_stock}`}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {searchTerm.trim() && searchResults.length === 0 && (
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
//           <p className="text-yellow-800 text-sm">No bottles found matching "{searchTerm}"</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BottleSearchAggregation;




import React from 'react';

const BottleSearchAggregation = ({
  searchTerm,
  setSearchTerm,
  aggregatedBottles,
  setCurrentPage,
}) => {
  const searchResults = searchTerm.trim()
    ? Object.entries(aggregatedBottles).filter(([key, bottle]) =>
      bottle.bottle_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  return (
    <div className="mb-6 space-y-3">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by bottle name, order number, customer, or deco number..."
          className="w-full px-3 py-2 pl-10 pr-20 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-red-800 placeholder-red-800"
        />

        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {searchTerm && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-1">
            <button
              onClick={() => {
                setSearchTerm('');
                setCurrentPage(1);
              }}
              className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              title="Cancel search"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setSearchTerm('');
                setCurrentPage(1);
              }}
              className="p-1 text-gray-400 hover:text-gray-600"
              title="Clear search"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {searchTerm.trim() && searchResults.length > 0 && (
        <div className="bg-[#FFF0E7]  rounded-lg p-4">
          <h4 className="text-sm font-semibold text-orange-800 mb-3">
            Bottle Summary for "{searchTerm}"
          </h4>
          <div className="space-y-3">
            {searchResults.map(([key, bottle]) => (
              <div key={key} className="bg-white rounded-lg p-4 shadow-sm">


                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Total Order Quantity :</span>
                    <p className="font-semibold text-orange-900">{bottle.total_quantity}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Total Remaining :</span>
                    <p className="font-semibold text-red-600">{bottle.total_remaining}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Available Stock :</span>
                    <p className="font-semibold text-green-600">{bottle.available_stock}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Orders Count :</span>
                    <p className="font-semibold text-blue-600">{bottle.orders.length}</p>
                  </div>
                </div>

                <div className="mt-3 p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Stock vs Demand :</span>
                    <span
                      className={`font-semibold ${bottle.available_stock >= bottle.total_remaining
                          ? 'text-green-600'
                          : 'text-red-600'
                        }`}
                    >
                      {bottle.available_stock >= bottle.total_remaining
                        ? `✓ Sufficient (${bottle.available_stock - bottle.total_remaining} extra)`
                        : `⚠ Short by ${bottle.total_remaining - bottle.available_stock}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchTerm.trim() && searchResults.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-yellow-800">No bottles found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default BottleSearchAggregation;