import Axios from "axios";
import { API } from "../../utils/prefix";

export const deleteSingleComment = async (commentId) => {
  const request = `${API}/comment/${commentId}`;
  const response = await Axios.delete(request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  return response.data;
};