import Axios from "axios";
import { API } from "../../utils/prefix";

const request = `${API}/media`;

export const deleteMedia = async (mediaId) => {
  const response = await Axios.delete(`${request}/media/${mediaId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  return response.data;
};
