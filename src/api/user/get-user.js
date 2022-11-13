import Axios from "axios";
import { API } from "../../utils/prefix";

export const getUser = async (userId) => {
  const request = `${API}/user?id=${userId}`;
  const response = await Axios.get(request);
  return response.data;
};

export const searchUser = async (keyword) => {
  let request;
  if (keyword) {
    request = `${API}/user/search?keyword=${keyword}`;
  } else {
    request = `${API}/user/search`;
  }
  const response = await Axios.get(request);
  return response.data;
};
