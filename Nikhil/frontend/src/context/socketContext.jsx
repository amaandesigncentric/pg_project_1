import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [dataStore, setDataStore] = useState({
    pumps: [],
    plasticCap: [],
    alluminiumCap: [],
    bottles: [],
    accessories: [],
  });

  const typeMapping = {
    pumps: "pumpdata",
    plasticCap: "plasticCapData",
    alluminiumCap: "alluminiumCapData",
    bottles: "bottledata",
    accessories: "accessoriesData",
  };

  const fetchInitialData = async () => {
    try {
      const fetchPromises = Object.entries(typeMapping).map(async ([key, endpoint]) => {
        const cached = localStorage.getItem(endpoint);
        if (cached) {
          console.log(`📦 Loaded ${key} from localStorage`);
          return { key, data: JSON.parse(cached) };
        }

        console.log(`🔄 Fetching ${key} from API...`);
        const res = await fetch(`http://localhost:5000/general/${endpoint}`);
        if (!res.ok) throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
        const data = await res.json();

        localStorage.setItem(endpoint, JSON.stringify(data));
        return { key, data };
      });

      const results = await Promise.all(fetchPromises);

      const newData = {};
      results.forEach(({ key, data }) => {
        newData[key] = data;
      });

      setDataStore((prev) => ({ ...prev, ...newData }));
      console.log("✅ SocketContext: Data loaded");
    } catch (error) {
      console.error("❌ Error loading data in SocketContext:", error);
    }
  };

  useEffect(() => {
    if (
      user?.position === "admin" ||
      user?.position === "ast_sales_manager" ||
      user?.position === "exp_sales_manager" ||
      user?.position === "exp_sales_member" ||
      user?.position === "dom_sales_manager" ||
      user?.position === "dom_sales_member"
    ) {
      fetchInitialData();
    }
  }, [user]);

  return (
    <SocketContext.Provider
      value={{
        setDataStore,
        fetchInitialData,
        pumps: dataStore.pumps,
        plasticCap: dataStore.plasticCap,
        alluminiumCap: dataStore.alluminiumCap,
        bottles: dataStore.bottles,
        accessories: dataStore.accessories,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
