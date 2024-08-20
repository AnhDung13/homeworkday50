import React, { useEffect, useLayoutEffect } from "react";
import Cookies from "js-cookie";
import LoginComponent from "./Login/LoginComponent";
import ShopComponent from "./Shop/ShopComponent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useShopContext } from "./context/ShopContext";
import axiosIntances from "./config/axiosConfig";
function App() {
  const { apiKey, setCart, setApiKey } = useShopContext();

  useEffect(() => {
    if (!Cookies.get("apiKey") || !Cookies.get("userEmail")) {
      Cookies.remove("apiKey");
      Cookies.remove("userEmail");
      localStorage.clear();
      setCart([]);
      setApiKey(null);
    }
  }, []);
  useEffect(() => {
    const getUser = async () => {
      if (apiKey) {
        const rs = await axiosIntances("/users/profile", {
          headers: { "X-Api-Key": apiKey },
        });
        toast.success(
          `Chào mừng ${rs.data.data.emailId.name} quay lại (｡´∀｀)ﾉ`
        );
      }
    };
    getUser();
  }, []);
  return (
    <>
      {!apiKey ? <LoginComponent /> : <ShopComponent />}
      <ToastContainer closeOnClick />
    </>
  );
}

export default App;
