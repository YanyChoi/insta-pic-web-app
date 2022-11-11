import Axios from "axios";
import { API } from "../../utils/prefix";

export const deleteSingleComment = async (commentId) => {
  const request = `${API}/comment?commentId=${commentId}`;
  const response = await Axios.delete(request);
  return response.data;
};

export const deleteMultipleComments = async (articleId) => {
  const request = `${API}/comment?articleId=${articleId}`;
  const response = await Axios.delete(request);
  return response.data;
};
