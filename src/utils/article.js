import { getFeedArticlesByUser } from "../api/article/get-article";

export const getArticleList = async (userId) => {
  const articles = await getFeedArticlesByUser(userId);
  return articles;
};
