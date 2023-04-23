import Axios from "axios";
import { API } from "../../utils/prefix";

export const getArticleLike = async (articleId, lastUserId, size) => {
  const request = `${API}/article/${articleId}/likes?lastUserId=${lastUserId}&size=${size}`;
  const response = await Axios.get(request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  return response.data;
};

export const getCommentLike = async (commentId, lastUserId, size) => {
  const request = `${API}/comment/${commentId}/likes?lastUserId=${lastUserId}&size=${size}`;
  const response = await Axios.get(request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  return response.data;
};
