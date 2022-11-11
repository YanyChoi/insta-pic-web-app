import Axios from "axios";
import { API } from "../../utils/prefix";

export const getFollowers = async (followingId) => {
  const request = `${API}/follow/followers?followingId=${followingId}`;
  const response = await Axios.get(request);
  return response.data;
};

export const getFollowing = async (userId) => {
  const request = `${API}/follow/following?userId=${userId}`;
  const response = await Axios.get(request);
  return response.data;
};

export const getNeighbors = async (userId, followingId) => {
  const request = `${API}/follow/neighbors?userId=${userId}&followingId=${followingId}`;
  const response = await Axios.get(request);
  return response.data;
};
