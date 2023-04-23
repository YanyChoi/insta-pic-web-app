import Axios from "axios";
import { API } from "../../utils/prefix";

export const signUp = async ({
  userName,
  fullName,
  password,
  bio,
  url,
  profilePicFile
}) => {
  const body = new FormData();

  const json = {
    userName: userName,
    fullName: fullName,
    pw: password,
    bio: bio,
    url: url
  };

  const userDraft = new Blob([JSON.stringify(json)], {
    type: "application/json",
  });
  body.append("body", userDraft);

  body.append("profilePicture", profilePicFile, profilePicFile.name);

  const request = `${API}/signup`;

  const response = await Axios.post(request, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
