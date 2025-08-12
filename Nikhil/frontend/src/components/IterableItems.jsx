import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import bottleData from "../constants/bottleData";
import capData from "../constants/capData";
import DECORATION_COMBINATIONS from "../constants/decoData";
import pumpData from "../constants/pumpData";

import IterableBottle from "./Iterablebottle";
import IterableCap from "./IterableCap";
import IterablePump from "./IterablePump";
import IterableAccessory from "./IterableAccesory";
import { MdDelete } from "react-icons/md";

const IterableItems = ({ currency ,items ,setItems ,exchangeRates ,setExchangeRates}) => {



  const [isLoadingRates, setIsLoadingRates] = useState(true);
  const [errorRates, setErrorRates] = useState(null);

  const fetchExchangeRates = async () => {
    setIsLoadingRates(true);
    setErrorRates(null);
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${currency}`
      );
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      const data = await response.json();

      setExchangeRates({
        INR: data.rates.INR,
        USD: data.rates.USD,
        EUR: data.rates.EUR,
        GBP: data.rates.GBP,
      });
    } catch (error) {
      setErrorRates(error.message || "Failed to fetch exchange rates.");
      // Optionally keep old rates or set to default fallback
      setExchangeRates({
        INR: 1,
        USD: 0.012,
        EUR: 0.011,
        GBP: 0.010,
      });
    } finally {
      setIsLoadingRates(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, [currency]);

  const addItem = () => {
    setItems((prev) => [
      ...prev,
          {
      id: Date.now(),
      bottles: [
        {
          bottleName: '',
          neckSize: '',
          bootleCapacity: '',
          bootleDecoration: '',
          decoNumber: '',
          quantity: '',
          rate: '',
          searchTerm: '',
          isDropdownVisible: false,
          amount: 0
        },
      ],
      caps: [
        {
          capType: '',
          capName: '',
          searchTerm: '',
          isDropdownVisible: false,
          process: '',
          quantity: '',
          rate: '',
          pantoneNo: '',
          fitment: '',
          assemble: '',
          amount: 0
        },
      ],
      pumps:[
        {
          pumpName: '',
          pumpQuantity: '',
          pumpRate: '',
          searchTerm: '',
          isDropdownVisible: false,
          amount: 0
        },
      ],
      accessories:[
          {
              accessoryName: '',
              searchTerm: '',
              isDropdownVisible: false,
              boxCode: '',
              boxName: '',
              accessoryQuantity: '',
              accessoryRate: '',
              amount:0
          },
      ],
      bottleAmount: 0,
      capAmount: 0,
      pumpAmount: 0,
      accessoryAmount: 0,
      totalAmount: 0,
    }
    ]);
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAmountChange = (id, type, amount) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const newTotal =
          (type === "bottleAmount" ? amount : item.bottleAmount || 0) +
          (type === "capAmount" ? amount : item.capAmount || 0) +
          (type === "pumpAmount" ? amount : item.pumpAmount || 0) +
          (type === "accessoryAmount" ? amount : item.accessoryAmount || 0);

        if (item[type] === amount && item.totalAmount === newTotal) {
          return item;
        }

        return {
          ...item,
          [type]: amount,
          totalAmount: newTotal,
        };
      }
      return item;
    });

    const changed = updatedItems.some((item, index) => item !== items[index]);
    if (changed) {
      setItems(updatedItems);
    }
  };

  return (
    <div className="mt-6 sm:text-left w-full space-y-10">
      {errorRates && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error fetching exchange rates: {errorRates}
        </div>
      )}

      {items.map((item, index) => (
        <div
          key={item.id}
          className="border border-orange-300 rounded-md shadow-md"
        >
          {/* Header with Add/Delete */}
          <div className="bg-gradient-to-r from-[#993300] via-[#FF6600] to-[#FFB84D] p-4 flex justify-between items-center">
            <h1 className="text-white underline underline-offset-8 text-xl">
              Item {index + 1}
            </h1>
            <div className="flex space-x-2">
              {index === 0 && (
                <button
                  onClick={addItem}
                  title="Add Item"
                  className="text-white text-2xl"
                >
                  <FaPlusCircle />
                </button>
              )}
              {items.length > 1 && (
                <button
                  onClick={() => deleteItem(item.id)}
                  title="Delete Item"
                  className="text-white text-2xl"
                >
                  <MdDelete />
                </button>
              )}
            </div>
          </div>

          {item.totalAmount > 0 && (
            <div className="bg-[#FFF0E7] border-b border-orange-200 p-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h5 className="text-orange-800 font-medium mr-5">
                  Your Item Total is :{" "}
                  {currency === "INR"
                    ? "₹ "
                    : currency === "USD"
                    ? "$ "
                    : currency === "EUR"
                    ? "€ "
                    : currency === "GBP"
                    ? "£ "
                    : ""}
                  {isLoadingRates
                    ? "..."
                    : (item.totalAmount * exchangeRates[currency]).toLocaleString(
                        currency === "INR"
                          ? "en-IN"
                          : currency === "USD"
                          ? "en-US"
                          : currency === "EUR"
                          ? "de-DE"
                          : currency === "GBP"
                          ? "en-GB"
                          : "en-IN",
                        { maximumFractionDigits: 2 }
                      )}
                </h5>
                <div className="flex items-center space-x-3 text-orange-800 text-sm font-medium">
                  {["INR", "USD", "EUR", "GBP"]
                    .filter((cur) => cur !== currency)
                    .map((cur) => (
                      <span
                        key={cur}
                        className="transition-all duration-300 hover:text-orange-800 hover:scale-105"
                      >
                        {cur === "INR"
                          ? "₹ "
                          : cur === "USD"
                          ? "$ "
                          : cur === "EUR"
                          ? "€ "
                          : cur === "GBP"
                          ? "£ "
                          : ""}
                        {isLoadingRates
                          ? "..."
                          : (item.totalAmount * exchangeRates[cur]).toLocaleString(
                              cur === "INR"
                                ? "en-IN"
                                : cur === "USD"
                                ? "en-US"
                                : cur === "EUR"
                                ? "de-DE"
                                : cur === "GBP"
                                ? "en-GB"
                                : "en-IN",
                              { maximumFractionDigits: 2 }
                            )}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          )}



          {/* Sub-sections */}
          <div className="space-y-6 p-4 bg-[#FFF0E7]">
            <div className="border border-orange-300 p-4 rounded-md">
              <h1 className="text-lg font-semibold text-orange-800 mb-4">
                Team-Bottle
              </h1>
              <IterableBottle
                bootleData={bottleData}
                bottles={item.bottles}
                decorationOptions={DECORATION_COMBINATIONS}
                onBottlesChange={(updatedBottles) => {
                  const updatedItems = items.map((it) => {
                    if (it.id === item.id) {
                      return { ...it, bottles: updatedBottles };
                    }
                    return it;
                  });
                  console.log(updatedItems,"updated Items")
                  setItems(updatedItems);
                }}
                onAmountChange={(amount) =>
                  handleAmountChange(item.id, "bottleAmount", amount)
                }
              />
            </div>

            <div className="border border-orange-300 p-4 rounded-md">
              <h1 className="text-lg font-semibold text-orange-800 mb-4">
                Team-Cap
              </h1>
              <IterableCap
                capData={capData}
                caps={item.caps}
                onAmountChange={(amount) =>
                  handleAmountChange(item.id, "capAmount", amount)
                }
                onCapsChange={(updatedBottles) => {
                  const updatedItems = items.map((it) => {
                    if (it.id === item.id) {
                      return { ...it, caps: updatedBottles };
                    }
                    return it;
                  });
                  console.log(updatedItems,"updated Items")
                  setItems(updatedItems);
                }}
              />
            </div>

            <div className="border border-orange-300 p-4 rounded-md">
              <h1 className="text-lg font-semibold text-orange-800 mb-4">
                Team-Pump
              </h1>
              <IterablePump
                pumpData={pumpData}
                pumps={item.pumps}
                onAmountChange={(amount) =>
                  handleAmountChange(item.id, "pumpAmount", amount)
                }
                onPumpsChange={(updatedBottles) => {
                  const updatedItems = items.map((it) => {
                    if (it.id === item.id) {
                      return { ...it, pumps: updatedBottles };
                    }
                    return it;
                  });
                  console.log(updatedItems,"updated Items")
                  setItems(updatedItems);
                }}
              />
            </div>

            <div className="border border-orange-300 p-4 rounded-md">
              <h1 className="text-lg font-semibold text-orange-800 mb-4">
                Team-Accessory
              </h1>
              <IterableAccessory
                accessories={item.accessories}
                onAmountChange={(amount) =>
                  handleAmountChange(item.id, "accessoryAmount", amount)
                }
                onAccesoryChange={(updatedBottles) => {
                const updatedItems = items.map((it) => {
                  if (it.id === item.id) {
                    return { ...it, accessories: updatedBottles };
                  }
                  return it;
                });
                console.log(updatedItems,"updated Items")
                setItems(updatedItems);
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IterableItems;
