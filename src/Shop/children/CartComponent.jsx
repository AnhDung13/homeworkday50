import React from "react";
import { useShopContext } from "../../context/ShopContext";
import Loading from "../../Loading/LoadingComponent";
import axiosIntances from "../../config/axiosConfig";
import { toast } from "react-toastify";

export default function CartComponent() {
  const { cart, setCart, apiKey, isLoading, setLoading } = useShopContext();

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const products = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));
      const rs = await axiosIntances.post(
        "/oders",
        { body: products },
        { headers: { "X-Api-Key": apiKey } }
      );
      console.log(rs);
      toast.success("Đặt hàng thành công ٩(＾◡＾)۶");
    } catch {
      toast.error("Có lỗi xảy ra (˃̣̣̥⌓˂̣̣̥ )");
    } finally {
      setCart([]);
      localStorage.removeItem("cart");
      setLoading(false);
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs mt-4">
      {isLoading && <Loading />}
      {cart.length === 0 ? (
        <p className="text-white font-light mt-4 text-center">
          Chưa có gì trong giỏ hàng cả!!!!
        </p>
      ) : (
        <div className="w-full overflow-x-auto relative">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                <th className="px-4 py-3">Tên sản phẩm</th>
                <th className="px-4 py-3">Số lượng</th>
                <th className="px-4 py-3">Còn lại</th>
                <th className="px-4 py-3">Tổng tiền</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {cart.map(({ id, name, quantity, quantityLeft, price }) => (
                <tr className="text-gray-700" key={id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <p className="font-semibold">{name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{quantity}</td>
                  <td className="px-4 py-3 text-sm">{quantityLeft}</td>
                  <td className="px-4 py-3 text-sm">{price * quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handlePurchase}
            className="bg-green-500 hover:bg-green-700 select-none text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-max relative right-0"
          >
            Thanh toán
          </button>
        </div>
      )}
    </div>
  );
}
