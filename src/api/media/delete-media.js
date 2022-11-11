import { Axios } from "axios";
import { API } from "../../utils/prefix";

const request = `${API}/media`;

export const deleteSingleMedia = async (mediaId) => {
  const response = await Axios.delete(`${request}/mediaId=${mediaId}`);
  return response;
};

export const deleteMultipleMedia = async (articleId) => {
  const response = await Axios.delete(`${request}/articleId=${articleId}`);
  return response;
};
