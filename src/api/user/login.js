import { Axios } from "axios";
import { API } from "../../utils/prefix";

export const login = async (id, pw) => {
  const request = `${API}/user/login?id=${id}&pw=${pw}`;
  const response = await Axios.get(request);
  return response;
};
