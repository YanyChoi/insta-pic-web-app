import Axios from "axios";
import { API } from "../../utils/prefix";

export const postArticle = async ({ userId, body }) => {
  const request = `${API}/user/${userId}/article`;

  const response = await Axios.post(request, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });

  return response.data;
};
