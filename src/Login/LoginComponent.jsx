import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosIntances from "../config/axiosConfig";
import { useShopContext } from "../context/ShopContext";
import Cookies from "js-cookie";
export default function LoginComponent() {
  const { setApiKey } = useShopContext();
  const [email, setEmail] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.warning("Không được bỏ trống ಠ_ಠ");
      return;
    }
    try {
      const rs = await axiosIntances.get("/api-key", {
        params: { email: email },
      });
      setApiKey(rs.data.data.apiKey);
      Cookies.set("apiKey", `${rs.data.data.apiKey}`);
      Cookies.set("userEmail", `${email}`);
    } catch {
      toast.error("Email không tồn tại trong dữ liệu (╬≖_≖)");
    }
  };
  return (
    <div className="w-screen h-screen bg-slate-300 fixed inset-0 flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleLogin}>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="example@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="mt-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
