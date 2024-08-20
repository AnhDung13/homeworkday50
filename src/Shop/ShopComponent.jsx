import React from "react";
import ListProductsComponent from "./children/ListProductsComponent";
import CartComponent from "./children/CartComponent";

export default function ShopComponent() {
  return (
    <main className=" flex items-center justify-center p-8">
      <div className="container bg-slate-700 p-4 flex flex-col justify-center items-center">
        <h1 className="font-bold text-white">Welcome to Shop!</h1>
        <ListProductsComponent />
        <CartComponent />
      </div>
    </main>
  );
}
