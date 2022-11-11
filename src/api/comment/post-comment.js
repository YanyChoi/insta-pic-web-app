import Axios from "axios";
import { API } from "../../utils/prefix";

export const postRootComment = async ({
  articleId,
  userId,
  mentionedId,
  text,
  parentCommentId = 0,
}) => {
  const request = `${API}/comment`;

  if (mentionedId) {
    const body = {
      articleId: articleId,
      mentionedId: mentionedId,
      parentCommentId: parentCommentId,
      userId: userId,
      text: text,
    };
  } else {
    const body = {
      articleId: articleId,
      parentCommentId: parentCommentId,
      userId: userId,
      text: text,
    };
  }
  const response = await Axios.post(request, body);
  return response.data;
};

// {
//     "articleId": 0,
//     "mentionedId": "string",
//     "parentCommentId": 0,
//     "text": "string",
//     "userId": "string"
//   }
