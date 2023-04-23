import Axios from "axios";
import { API } from "../../utils/prefix";

export const postRootComment = async ({
  articleId,
  body
}) => {
  const request = `${API}/article/${articleId}/comment`;
  const response = await Axios.post(request, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  return response.data;
};