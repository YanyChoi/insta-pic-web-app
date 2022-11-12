import Axios from "axios";
import { API } from "../../utils/prefix";

export const getComments = async (articleId) => {
  const request = `${API}/comment?articleId=${articleId}`;
  const response = await Axios.get(request);
  return response.data;
};
