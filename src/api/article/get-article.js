import Axios from "axios";
import { API } from "../../utils/prefix";

export const getArticle = async (articleId) => {
  const request = `${API}/article/${articleId}`;
  const response = await Axios.get(request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  return response.data;
};

export const getFeedArticlesByUser = async (feedUserId, lastArticleId, size) => {
  const request = `${API}/user/${feedUserId}/feed?lastArticleId=${lastArticleId}&size=${size}`;
  const response = await Axios.get(request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  return response.data;
};

export const getArticleListByUser = async (userId, lastArticleId, size) => {
  const request = `${API}/user/${userId}/articles?lastArticleId=${lastArticleId}&size=${size}`;
  const response = await Axios.get(request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  return response.data;
};

export const getArticleListByLocation = async (location, lastArticleId, size) => {
  const request = `${API}/location/${location}/articles?lastArticleId=${lastArticleId}&size=${size}`;
  const response = await Axios.get(request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  return response.data;
};
