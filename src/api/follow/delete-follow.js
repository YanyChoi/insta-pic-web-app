import Axios from "axios";
import { API } from "../../utils/prefix";

export const deleteFollow = async (userId, followId) => {
  const request = `${API}/user/${userId}/follow/${followId}`;
  const response = await Axios.delete(request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  return response.data;
};
