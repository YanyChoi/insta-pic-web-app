import Axios from "axios";
import { API } from "../../utils/prefix";

export const deleteArticleLike = async ({ articleId, userId }) => {
  const request = `${API}/article/${articleId}/like?userId=${userId}`;
  const response = await Axios.delete(request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  return response.data;
};

export const deleteCommentLike = async ({ commentId, userId }) => {
  const request = `${API}/comment/${commentId}/like?userId=${userId}`;
  const response = await Axios.delete(request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  return response.data;
};
