import Axios from "axios";
import { API } from "../../utils/prefix";

export const postArticleLike = async ({ articleId, userId }) => {
  const request = `${API}/article/${articleId}/like?userId=${userId}`;
  const response = await Axios.post(request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  return response.data;
};

export const postCommentLike = async ({ commentId, userId }) => {
  const request = `${API}/comment/${commentId}/like?userId=${userId}`;
  const response = await Axios.post(request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  return response.data;
};
