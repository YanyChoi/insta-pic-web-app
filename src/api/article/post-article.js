import { Axios } from "axios";
import { API } from "../../utils/prefix";

export const postArticle = async ({ date, location, text, userId }) => {
  const request = `${API}/article`;

  const response = await Axios.post(request, {
    date,
    location,
    text,
    userId,
  });
  

  return response;
};

