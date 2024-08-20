import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
const axiosIntances = axios.create({
  baseURL: "https://api-exercise-sopi.vercel.app/api/v1",
});

axiosIntances.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      Cookies.remove("apiKey");
      Cookies.remove("userEmail");
      localStorage.clear();
      toast.error("Có lỗi xảy ra vui lòng reload để đăng nhập lại (˃̣̣̥⌓˂̣̣̥ )");
    }
  }
);

export default axiosIntances;
