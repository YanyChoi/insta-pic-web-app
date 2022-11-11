import { API } from "../../utils/prefix";

export const postMedia = async (files, articleId) => {
  const body = new FormData();
  body.append("files", files);
  body.append("articleId", articleId);

  const request = `${API}/media`;
  const response = await Axios.post(request, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
