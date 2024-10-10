import axios from "axios";
import { BASE_API } from "../shared/base_api";

const Http = axios.create({
  baseURL: BASE_API,
});

export default Http;
