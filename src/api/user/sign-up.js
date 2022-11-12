import Axios from "axios";
import { API } from "../../utils/prefix";

export const signUp = async ({
  introduction,
  name,
  profilePicFile,
  pw,
  url,
  id,
}) => {
  const body = new FormData();

  const json = {
    introduction: introduction,
    name: name,
    pw: pw,
    url: url,
    userId: id,
  };

  const userDraft = new Blob([JSON.stringify(json)], {
    type: "application/json",
  });
  body.append("userDraft", userDraft);

  body.append("profilePic", profilePicFile, profilePicFile.name);

  const request = `${API}/user/signup`;

  const response = await Axios.post(request, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
