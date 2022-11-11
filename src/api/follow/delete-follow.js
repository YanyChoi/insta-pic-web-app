import { Axios } from "axios";
import { API } from "../../utils/prefix"

export const deleteFollow = async (userId, followId) => {
    const request = `${API}/follow?userId=${userId}&followId=${followId}`;
    const response = await Axios.delete(request);
    return response;
}