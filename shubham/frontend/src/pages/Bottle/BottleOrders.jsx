import React, { useState, useEffect } from 'react';
import UpdateBottleQty from './UpdateBottleQty';
import { Package, Edit, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import StockAvailabilityDialog from './StockAvailabilityDialog';
import BottleSearchAggregation from './BottleSearchAggregation';
import OrderTable from './OrderTable';

const BottleOrders = ({ orderType = 'pending' }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [aggregatedBottles, setAggregatedBottles] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showStockDialog, setShowStockDialog] = useState(false);
  const [stockQuantities, setStockQuantities] = useState({});
  const ordersPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const result = await response.json();

        const filteredOrders = filterOrdersByType(result || [], orderType);
        console.log(filteredOrders)
        setOrders(filteredOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [orderType]);

  useEffect(() => {
    const calculateAggregatedBottles = () => {
      const bottleMap = {};

      orders.forEach(order => {
        order.items?.forEach(item => {
          const bottles = item.bottle || [];
          bottles.forEach(bottle => {
            const key = bottle.bottle_name?.toLowerCase().trim();
            if (key) {
              if (!bottleMap[key]) {
                bottleMap[key] = {
                  bottle_name: bottle.bottle_name,
                  neck_size: bottle.neck_size,
                  capacity: bottle.capacity,
                  total_quantity: 0,
                  total_remaining: 0,
                  available_stock: bottle.available_stock || 0,
                  orders: []
                };
              }

              const remaining = getRemainingQty(bottle);
              bottleMap[key].total_quantity += bottle.quantity || 0;
              bottleMap[key].total_remaining += remaining;
              bottleMap[key].orders.push({
                order_number: order.order_number,
                item_name: item.item_name,
                quantity: bottle.quantity,
                remaining: remaining,
                deco_no: bottle.deco_no,
                status: bottle.status
              });
            }
          });
        });
      });

      setAggregatedBottles(bottleMap);
    };

    calculateAggregatedBottles();
  }, [orders]);


  const filteredOrders = orders.filter(order => {
    if (!searchTerm.trim()) return true;
    const searchLower = searchTerm.toLowerCase();
    if (order.order_number?.toLowerCase().includes(searchLower) ||
      order.customer_name?.toLowerCase().includes(searchLower) ||
      order.manager_name?.toLowerCase().includes(searchLower)) {
      return true;
    }

    return order.items?.some(item => {
      if (item.item_name?.toLowerCase().includes(searchLower)) return true;
      return item.bottle?.some(bottle =>
        bottle.bottle_name?.toLowerCase().includes(searchLower)
      );
    });
  }).map(order => {
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      if (order.order_number?.toLowerCase().includes(searchLower) ||
        order.customer_name?.toLowerCase().includes(searchLower) ||
        order.manager_name?.toLowerCase().includes(searchLower)) {
        return order;
      }
      const filteredItems = order.items?.map(item => {
        if (item.item_name?.toLowerCase().includes(searchLower)) {
          return item;
        }
        const filteredBottles = item.bottle?.filter(bottle =>
          bottle.bottle_name?.toLowerCase().includes(searchLower)
        ) || [];
        if (filteredBottles.length > 0) {
          return {
            ...item,
            bottle: filteredBottles
          };
        }
        return null;
      }).filter(item => item !== null) || [];

      if (filteredItems.length > 0) {
        return {
          ...order,
          items: filteredItems
        };
      }
      return null;
    }

    return order;
  }).filter(order => order !== null);

  const filterOrdersByType = (allOrders, type) => {
    return allOrders.filter(order => {
      const isCompleted = isOrderCompleted(order);
      return type === 'pending' ? !isCompleted : isCompleted;
    });
  };
  const isOrderCompleted = (order) => {
    if (!order.items || order.items.length === 0) return false;

    return order.items.every(item => {
      const bottles = item.bottle || [];
      if (bottles.length === 0) return true;
      return bottles.every(bottle => bottle.status === 'Completed');
    });
  };

  const getRemainingQty = (bottle) => {
    if (!bottle || !bottle.quantity) return 'N/A';
    return bottle.status === 'Completed' ? 0 : bottle.quantity;
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-900 font-semibold';
      case 'In Progress':
        return 'text-orange-600 font-semibold';
      case 'Pending':
        return 'text-gray-600 font-semibold';
      default:
        return 'text-gray-500';
    }
  };

  const toggleRowExpansion = (rowId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(rowId)) {
      newExpanded.delete(rowId);
    } else {
      newExpanded.add(rowId);
    }
    setExpandedRows(newExpanded);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditClick = (order, item) => {
    setSelectedOrder(order);
    setSelectedItem(item);
    setShowStockDialog(true);
  };

  const handleStockQuantityChange = (bottleId, value) => {
    setStockQuantities(prev => ({
      ...prev,
      [bottleId]: value
    }));
  };

  const handleStockYes = () => {
    setShowStockDialog(false);
    setShowModal(true);
  };

  const handleStockNo = () => {
    setStockQuantities({});
    setShowStockDialog(false);
    setShowModal(true);
  };

  const handleStockDialogClose = () => {
    setShowStockDialog(false);
    setStockQuantities({});
    setSelectedOrder(null);
    setSelectedItem(null);
  };

  const handleClose = () => {
    setShowModal(false);
    setStockQuantities({});
    setSelectedOrder(null);
    setSelectedItem(null);
  };

  const handleCopyBottleName = (bottleName) => {
    setSearchTerm(bottleName);
    setCurrentPage(1);
  };

  const handleLocalOrderUpdate = (updatedOrder) => {
    const updatedOrders = orders.map(order =>
      order.order_number === updatedOrder.order_number ? updatedOrder : order
    );

    const isOrderNowCompleted = isOrderCompleted(updatedOrder);
    const shouldRemoveFromCurrentView =
      (orderType === 'pending' && isOrderNowCompleted) ||
      (orderType === 'completed' && !isOrderNowCompleted);

    if (shouldRemoveFromCurrentView) {
      const filteredOrders = updatedOrders.filter(order =>
        order.order_number !== updatedOrder.order_number
      );
      setOrders(filteredOrders);
    } else {
      setOrders(updatedOrders);
    }

    handleClose();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <Package className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading orders</h3>
        <p className="text-sm text-red-500 text-center">{error}</p>
      </div>
    );
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    console.log('renderedd')

    const pageNumbers = [];
    const maxVisiblePages = window.innerWidth < 640 ? 3 : 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
        <div className="text-sm text-gray-500 order-2 sm:order-1">
          Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length}
          {searchTerm ? ' filtered' : ''} orders
          {orders.length !== filteredOrders.length && (
            <span className="text-orange-600 ml-1">
              (from {orders.length} total)
            </span>
          )}
        </div>
        <div className="flex items-center space-x-1 order-1 sm:order-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>

          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === number
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-5 max-w-full overflow-hidden">
      <BottleSearchAggregation
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        aggregatedBottles={aggregatedBottles}
        setCurrentPage={setCurrentPage}
      />
      <OrderTable
        currentOrders={currentOrders}
        orderType={orderType}
        getRemainingQty={getRemainingQty}
        handleEditClick={handleEditClick}
        handleCopyBottleName={handleCopyBottleName}
        expandedRows={expandedRows}
        toggleRowExpansion={toggleRowExpansion}
        getStatusStyle={getStatusStyle}
      />
      {renderPagination()}
      <StockAvailabilityDialog
        showStockDialog={showStockDialog}
        selectedItem={selectedItem}
        selectedOrder={selectedOrder}
        stockQuantities={stockQuantities}
        handleStockQuantityChange={handleStockQuantityChange}
        handleStockDialogClose={handleStockDialogClose}
        handleStockNo={handleStockNo}
        handleStockYes={handleStockYes}
        getRemainingQty={getRemainingQty}
        setStockQuantities={setStockQuantities}
        aggregatedBottles={aggregatedBottles}
        searchTerm={searchTerm}
      />
      {showModal && selectedOrder && selectedItem && (
        <UpdateBottleQty
          isOpen={showModal}
          onClose={handleClose}
          orderData={selectedOrder}
          itemData={selectedItem}
          stockQuantities={stockQuantities}
          onUpdate={handleLocalOrderUpdate}
          aggregatedBottles={aggregatedBottles}
          searchTerm={searchTerm}
        />
      )}
    </div>
  );
};

export default BottleOrders;