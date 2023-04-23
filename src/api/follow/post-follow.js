import Axios from "axios";
import { API } from "../../utils/prefix";

export const postFollow = async (userId, followId) => {
  const request = `${API}/user/${userId}/follow/${followId}`;
  const response = await Axios.post(request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  return response.data;
};
