import { Axios } from "axios";
import { API } from "../../utils/prefix"

export const deleteArticle = async (articleId) => {
    const request = `${API}/article?articleId=${articleId}`;
    const response = await Axios.delete(request);
    return response;
}