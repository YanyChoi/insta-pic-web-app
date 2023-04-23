import Axios from "axios";
import { API } from "../../utils/prefix";
import { storeUserInfo } from "../../utils/user-info-manage";

export const login = async (id, pw) => {
  const request = `${API}/login`;
  const response = await Axios.post(request, {
    username: id,
    password: pw,
  });
  storeUserInfo(response.data);
  return response.data;
};
