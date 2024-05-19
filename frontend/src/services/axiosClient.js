import axios from "axios";
const axiosClient = axios.create({
  baseURL: "https://donateme-backend.onrender.com/",
});
export default axiosClient;
