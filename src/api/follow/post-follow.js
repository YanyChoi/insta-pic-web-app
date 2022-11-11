import { Axios } from "axios";
import { API } from "../../utils/prefix";

export const postFollow = async (userId, followId) => {
  const request = `${API}/follow?userId=${userId}&followId=${followId}`;

  const response = await Axios.post(request);

  return response;
};
