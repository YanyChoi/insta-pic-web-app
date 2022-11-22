import Axios from "axios";
import { API } from "../../utils/prefix";

export const getArticleLike = async (articleId) => {
  const request = `${API}/like/article?articleId=${articleId}`;
  const response = await Axios.get(request);
  return response.data;
};

export const getCommentLike = async (commentId) => {
  const request = `${API}/like/comment?commentId=${commentId}`;
  const response = await Axios.get(request);
  return response.data;
};
