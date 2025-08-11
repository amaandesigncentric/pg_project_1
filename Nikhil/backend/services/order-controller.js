import { orderModel } from "../models/orderModel.js";
import { getFiscalYear } from "../utils/helper.js";
import { v4 as uuidv4 } from "uuid";


export const generateOrderNumber = async (req, res) => {
    try {
        const prefix = 'pg';
        const fiscalYear = getFiscalYear();

        const regex = new RegExp(`^${prefix}/${fiscalYear}/\\d{4}$`);

        const lastOrder = await orderModel.findOne({ orderNumber: regex })
            .sort({ createdAt: -1 })
            .exec();

        let nextNumber = 1;

        if (lastOrder) {
            const lastNumberPart = lastOrder.orderNumber.split('/').pop();
            nextNumber = parseInt(lastNumberPart, 10) + 1;
        }

        const paddedNumber = nextNumber.toString().padStart(4, '0');
        const newOrderNumber = `${prefix}/${fiscalYear}/${paddedNumber}`;

        // Save new order
        const newOrder = new orderModel({ orderNumber: newOrderNumber });
        await newOrder.save();

        res.status(201).json({ orderNumber: newOrderNumber });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to generate order number' });
    }
};


export const createOrder = async (req, res) => {
  try {
    const order = req.body; 
    console.log("Received order:", JSON.stringify(order, null, 2));

    const transformedItems = (order.items || []).map((item) => {
      const bottleKey = item.bottles ? "bottles" : "bottle";
      const inputBottles = item[bottleKey] || [];

      const decoGroups = new Map();

      const transformedBottles = inputBottles.map((b) => {
        const bottleId = uuidv4();
        const decoKey = b.deco_combination ?? b.bootleDecoration ?? null; 

        const updatedBottle = {
          ...b,
          bottle_id: bottleId,
          status: b.status ?? "Pending",
          available_stock: b.available_stock ?? 0,
          completed_qty: b.completed_qty ?? 0,
          tracking_status: b.tracking_status ?? [],
          inventory_used: b.inventory_used ?? 0
        };

        if (decoKey) {
          const entry = decoGroups.get(decoKey) ?? { bottles: [] };
          entry.bottles.push(updatedBottle);
          decoGroups.set(decoKey, entry);
        }

        return updatedBottle;
      });

      const itemProcessMap = {};

      for (const [decoKey, { bottles }] of decoGroups.entries()) {
        const processes = String(decoKey).split("_").filter(Boolean);

        processes.forEach((proc) => {
          const procKey = proc.toLowerCase();
          if (!Array.isArray(itemProcessMap[procKey])) itemProcessMap[procKey] = [];

          bottles.forEach((bottleRef) => {
            const procObj = {
              [`${procKey}_id`]: bottleRef.bottle_id,
              bottle_name: bottleRef.bottle_name ?? bottleRef.bottleName ?? null,
              quantity: bottleRef.quantity ?? null,
              deco_no: bottleRef.deco_no ?? bottleRef.decoNumber ?? null,
              is_completely_received: false,
              is_partially_received: false,
              is_deco_no_approved: false,
              completed_quantity: 0,
              status: "Pending",
              tracking_status: [],
              available_stock: 0,
              inventory_used: 0
            };

            itemProcessMap[procKey].push(procObj);
          });
        });
      }

      const newItem = {
        ...item,
        [bottleKey]: transformedBottles
      };

      Object.entries(itemProcessMap).forEach(([procKey, arr]) => {
        newItem[procKey] = arr;
      });

      return newItem;
    });

    const transformedOrder = {
      ...order,
      items: transformedItems
    };

    console.log("Transformed order:", JSON.stringify(transformedOrder, null, 2));
    
    return res.status(200).json({
      message: "Order processed successfully",
      order: transformedOrder
    });
  } catch (error) {
    console.error("Error in createOrder:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};







