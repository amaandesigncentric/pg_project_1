import mongoose from "mongoose";
// Bottle Schema
const BottleSchema = new mongoose.Schema({
  bottleName: { type: String, required: true },
  neckSize: { type: String },
  bootleCapacity: { type: String },
  bootleDecoration: { type: String },
  decoNumber: { type: String },
  quantity: { type: String },
  rate: { type: String },
  amount: { type: Number }
}, { _id: false });

// Cap Schema
const CapSchema = new mongoose.Schema({
  capType: { type: String },
  capName: { type: String },
  process: { type: String },
  quantity: { type: String },
  rate: { type: String },
  pantoneNo: { type: String },
  fitment: { type: String },
  assemble: { type: String },
  amount: { type: Number }
}, { _id: false });

// Pump Schema
const PumpSchema = new mongoose.Schema({
  pumpName: { type: String },
  pumpQuantity: { type: String },
  pumpRate: { type: String },
  amount: { type: Number }
}, { _id: false });

// Accessory Schema
const AccessorySchema = new mongoose.Schema({
  accessoryName: { type: String },
  boxCode: { type: String },
  boxName: { type: String },
  accessoryQuantity: { type: String },
  accessoryRate: { type: String },
  amount: { type: Number }
}, { _id: false });

// Main Order Item Schema
const OrderItemSchema = new mongoose.Schema({
  bottles: [BottleSchema],
  caps: [CapSchema],
  pumps: [PumpSchema],
  accessories: [AccessorySchema]
});

export const orderModel = mongoose.model("Orders", OrderItemSchema);
