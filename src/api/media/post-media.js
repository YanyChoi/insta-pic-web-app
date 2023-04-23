import Axios from "axios";
import { API } from "../../utils/prefix";

export const postMedia = async (articleId, file, body) => {
  const form = new FormData();
  form.append("file", file);
  const formBody = new Blob([JSON.stringify(body)], {
    type: "application/json",
  });
  form.append("body", formBody);
  const request = `${API}/article/${articleId}/media`;
  const response = await Axios.post(request, form, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    },
  });
  return response.data;
};
