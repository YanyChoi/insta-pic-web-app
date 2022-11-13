import Axios from "axios";
import { API } from "../../utils/prefix";

export const postArticle = async ({ location, text, userId }) => {
  const request = `${API}/article`;

  const response = await Axios.post(request, {
    location,
    text,
    userId,
  });

  return response.data;
};
