import Axios from "axios";
import { API } from "../../utils/prefix"

export const deleteArticleLike = async ({articleId, userId}) => {
    const request = `${API}/like/article?articleId=${articleId}&userId=${userId}`;
    const response = await Axios.delete(request);
    return response.data;
}

export const deleteCommentLike = async ({commentId, userId}) => {
    const request = `${API}/like/comment?commentId=${commentId}&userId=${userId}`;
    const response = await Axios.delete(request);
    return response.data;
}