import axios from "axios";
import { serverUrl } from "../../config/config.js";

console.log(serverUrl);

const axiosInstance = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});

export default axiosInstance;
