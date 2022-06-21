import { create } from "apisauce";
import apiConfig from "./apiConfig";

const client = create({ baseURL: apiConfig.HOST + "/" + apiConfig.ENDPOINT });

export default client;
