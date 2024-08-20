import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
const shopContext = createContext();
function ShopProvider({ children }) {
  const [apiKey, setApiKey] = useState(Cookies.get("apiKey") || null);
  const [isLoading, setLoading] = useState(false);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) ?? []
  );
  const [listProducts, setListProducts] = useState(null);
  return (
    <shopContext.Provider
      value={{
        apiKey,
        setApiKey,
        isLoading,
        setLoading,
        cart,
        setCart,
        listProducts,
        setListProducts,
      }}
    >
      {children}
    </shopContext.Provider>
  );
}

function useShopContext() {
  return useContext(shopContext);
}

export { ShopProvider, useShopContext };
