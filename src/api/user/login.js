import Axios from "axios";
import { API } from "../../utils/prefix";
import { storeUserInfo } from "../../utils/user-info-manage";

export const login = async (id, pw) => {
  const request = `${API}/user/login?id=${id}&pw=${pw}`;
  const response = await Axios.get(request);
  storeUserInfo(response.data);
  return response.data;
};
