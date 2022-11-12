import Axios from "axios";
import { API } from "../../utils/prefix";

export const getMedia = async (articleId) => {
  const request = `${API}/media?articleId=${articleId}`;
  const response = await Axios.get(request);

  return response.data;
};
