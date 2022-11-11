import { Axios } from "axios";
import { API } from "../../utils/prefix";

export const signUp = async ({
  introduction,
  name,
  profilePic,
  pw,
  url,
  userId,
}) => {
  const request = `${API}/user/signup`;

  const response = await Axios.post(request, {
    introduction: introduction,
    name: name,
    profilePic: profilePic,
    pw: pw,
    url: url,
    userId: userId,
  });

  return response;
};
