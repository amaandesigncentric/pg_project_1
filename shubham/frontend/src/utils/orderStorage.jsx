export const getStorageKeys = (team) => ({
  PENDING: `${team}_pendingOrders`,
  COMPLETED: `${team}_completedOrders`,
});

export const getLocalStorageData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return null;
  }
};

export const setLocalStorageData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
  }
};

export const splitOrdersByStatus = (orders, isOrderCompletedFn) => {
  const pending = [];
  const completed = [];

  orders.forEach(order => {
    if (isOrderCompletedFn(order)) completed.push(order);
    else pending.push(order);
  });

  return { pendingOrders: pending, completedOrders: completed };
};

export const updateOrderInStorage = (team, updatedOrder, status) => {
  const key = getStorageKeys(team)[status.toUpperCase()];
  const orders = getLocalStorageData(key) || [];
  const index = orders.findIndex(order => order.order_number === updatedOrder.order_number);
  if (index !== -1) {
    orders[index] = updatedOrder;
    setLocalStorageData(key, orders);
  }
};

export const moveOrderInStorage = (team, orderNumber, fromStatus, toStatus) => {
  const fromKey = getStorageKeys(team)[fromStatus.toUpperCase()];
  const toKey = getStorageKeys(team)[toStatus.toUpperCase()];
  const fromOrders = getLocalStorageData(fromKey) || [];
  const toOrders = getLocalStorageData(toKey) || [];
  const index = fromOrders.findIndex(order => order.order_number === orderNumber);
  if (index === -1) return;
  const [movedOrder] = fromOrders.splice(index, 1);
  toOrders.push(movedOrder);
  setLocalStorageData(fromKey, fromOrders);
  setLocalStorageData(toKey, toOrders);
};


export const initializeLocalStorage = async (team, isOrderCompletedFn, filterOrderFn) => {
  const keys = getStorageKeys(team);

  const response = await fetch('https://pragati-dummy-server.onrender.com/api/orders');
  if (!response.ok) throw new Error('Failed to fetch orders');
  const allOrders = await response.json() || [];

  const filteredOrders = allOrders.map(order => {
    const filteredItems = filterOrderFn(order.items || []);
    return filteredItems.length > 0 ? { ...order, items: filteredItems } : null;
  }).filter(order => order !== null);
  console.log(filteredOrders)

  const { pendingOrders, completedOrders } = splitOrdersByStatus(filteredOrders, isOrderCompletedFn);

  setLocalStorageData(keys.PENDING, pendingOrders);
  setLocalStorageData(keys.COMPLETED, completedOrders);

  return { pendingOrders, completedOrders };
};
