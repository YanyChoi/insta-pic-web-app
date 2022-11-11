import Axios from "axios";
import { API } from "../../utils/prefix";

export const signUp = async ({
  introduction,
  name,
  profilePic,
  pw,
  url,
  userId,
}) => {
  const body = new FormData();

  body.append(
    "userDraft",
    `{"introduction": ${introduction},
    "name": ${name},
    "pw": ${pw},
    "url": ${url},
    "userId": ${userId}}`,
    { contentType: "application/json" }
  );

  body.append("profilePic", profilePic);

  const request = `${API}/user/signup`;

  const response = await Axios.post(request, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
