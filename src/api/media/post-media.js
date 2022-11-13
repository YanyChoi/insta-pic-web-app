import Axios from "axios";
import { API } from "../../utils/prefix";

export const postMedia = async (files, mentions, articleId) => {
  const body = new FormData();
  body.append("multipartFile", files);
  body.append("articleId", articleId);

  const json = {
    mentions: mentions,
  };
  const mention = new Blob([JSON.stringify(json)], {
    type: "application/json",
  });
  body.append("mentions", mention);
  const request = `${API}/media`;
  const response = await Axios.post(request, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
