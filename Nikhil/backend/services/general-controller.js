import { bottleModel } from "../models/bottleModel.js";
import { plasticCapModel } from "../models/plasticCapModel.js";
import { AlluminiumModel } from "../models/aluminiumModal.js";
import { pumpDataModel } from "../models/pumpModel.js";
import { AccessoryModel } from "../models/accesoryModel.js";

export const getAllBottles = async (req, res) => {
  try {
    const bottles = await bottleModel.find();
    res.json(bottles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPlasticCap = async (req, res) => {
  try {
    const plasticCap = await  plasticCapModel.find();
    res.json(plasticCap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAlluminiumCap = async (req, res) => {
  try {
    const alluminiumCap = await  AlluminiumModel.find();
    res.json(alluminiumCap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPumpData = async (req, res) => {
  try {
    const pumpData = await  pumpDataModel.find();
    res.json(pumpData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAccessoryData = async (req, res) => {
  try {
    const accesoryData = await  AccessoryModel.find();
    res.json(accesoryData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


