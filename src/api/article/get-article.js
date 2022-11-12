import Axios from "axios";
import { API } from "../../utils/prefix";

export const getArticle = async (articleId) => {
  const request = `${API}/article?articleId=${articleId}`;
  const response = await Axios.get(request);
  return response.data;
};

export const getArticleListByUser = async (userId) => {
  const request = `${API}/article/list?userId=${userId}`;
  const response = await Axios.get(request);
  return response.data;
};

export const getArticleListByLocation = async (location) => {
  const request = `${API}/article/list?location=${location}`;
  const response = await Axios.get(request);
  return response.data;
};
