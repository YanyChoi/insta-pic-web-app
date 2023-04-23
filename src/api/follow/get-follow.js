import Axios from "axios";
import { API } from "../../utils/prefix";

export const getFollowers = async (userId, lastUserId, size) => {
  const request = `${API}/user/${userId}/followers?lastUserId=${lastUserId}&size=${size}`;
  const response = await Axios.get(request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  return response.data;
};

export const getFollowing = async (userId, lastUserId, size) => {
  const request = `${API}/user/${userId}/following?lastUserId=${lastUserId}&size=${size}`;
  const response = await Axios.get(request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  return response.data;
};

export const getNeighbors = async (followingId, lastUserId, size) => {
  const request = `${API}/mutual/${followingId}?lastUserId=${lastUserId}&size=${size}`;
  const response = await Axios.get(request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  return response.data;
};
