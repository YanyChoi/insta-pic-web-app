import Axios from "axios";
import { API } from "../../utils/prefix";
import { deleteMultipleMedia } from "../media/delete-media";

export const deleteArticle = async (articleId) => {
  await deleteMultipleMedia(articleId);
  const request = `${API}/article?articleId=${articleId}`;
  const response = await Axios.delete(request);
  return response.data;
};
