import Axios from "axios";
import { API } from "../../utils/prefix";

export const getUser = async (userId) => {
  const request = `${API}/user/${userId}`;
  const response = await Axios.get(request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
  });
  return response.data;
};

export const getMyUser = async () => {
  const request = `${API}/user/me`;
  const response = await Axios.get(request, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
    }
  });
  return response.data;
};

export const searchUser = async (keyword) => {
  let request;
  if (keyword) {
    request = `${API}/user/search?keyword=${keyword}`;
  } else {
    request = `${API}/user/search`;
  }
  const response = await Axios.get(request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};
