import React, { useEffect } from "react";
import { useShopContext } from "../../context/ShopContext";
import axiosIntances from "../../config/axiosConfig";
import { toast } from "react-toastify";
import Loading from "../../Loading/LoadingComponent";

export default function ListProductsComponent() {
  const { listProducts, setListProducts, cart, setCart } = useShopContext();
  const getProducts = async () => {
    try {
      const rs = await axiosIntances.get("/products", { params: { limit: 8 } });
      setListProducts(rs.data.data.listProduct);
    } catch {
      toast.error("Có lỗi xảy ra ( ╥ω╥ )");
    }
  };
  const addCart = (id, name, quantityLeft, price) => {
    const product = {
      id,
      name,
      quantity: 1,
      quantityLeft,
      price,
    };
    if (cart.find((item) => item.id === product.id)) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                quantityLeft: item.quantityLeft - 1,
              }
            : item
        )
      );
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      setCart([...cart, product]);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="product-list grid grid-cols-4 gap-4">
      {!listProducts ? (
        <Loading />
      ) : (
        listProducts.map(({ _id, name, price, image, quantity }) => (
          <div
            className="box p-4 shadow-lg bg-white rounded-lg relative"
            key={_id}
          >
            <img
              src={image}
              alt={name}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <h2 className="text-xl font-normal mt-2">{name}</h2>
            <div className="flex justify-between items-center">
              <span className="text-orange-500 font-bold">$ {price}</span>
              <button
                onClick={() => addCart(_id, name, quantity, price)}
                className="bg-green-500 hover:bg-green-700 select-none text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
              >
                Add to cart!
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
