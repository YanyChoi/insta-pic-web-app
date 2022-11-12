import Axios from "axios";
import { API } from "../../utils/prefix";

export const getUser = async (userId) => {
  const request = `${API}/user?id=${userId}`;
  const response = await Axios.get(request);
  return response.data;
};
