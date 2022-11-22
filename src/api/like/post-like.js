import Axios from "axios";
import { API } from "../../utils/prefix";

export const postArticleLike = async ({ articleId, userId }) => {
  const request = `${API}/like/article?articleId=${articleId}&userId=${userId}`;
  const response = await Axios.post(request);
  return response.data;
};

export const postCommentLike = async ({ commentId, userId }) => {
  const request = `${API}/like/comment?commentId=${commentId}&userId=${userId}`;
  const response = await Axios.post(request);
  return response.data;
};
