import Axios from "axios";
import { API } from "../../utils/prefix";

export const changePw = async (id, oldPw, newPw) => {
  const request = `${API}/user/change-pw?id=${id}&oldPw=${oldPw}&newPw=${newPw}`;
  const response = await Axios.put(request);
  return response.data;
};
