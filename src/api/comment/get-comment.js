import Axios from "axios";
import { API } from "../../utils/prefix";

export const getComments = async (articleId, lastCommentId, size) => {
  const request = `${API}/article/${articleId}/comments?lastCommentId=${lastCommentId}&size=${size}`;
  const response = await Axios.get(request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  return response.data;
};
