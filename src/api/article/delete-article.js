import Axios from "axios";
import { API } from "../../utils/prefix";

export const deleteArticle = async (articleId) => {
  const request = `${API}/article/${articleId}`;
  const response = await Axios.delete(request,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  return response.data;
};
