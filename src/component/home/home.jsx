import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getFeedArticlesByUser } from "../../api/article/get-article";
import { UserContext } from "../../context/context";
import Article from "../article/article";
import ArticleModal from "../modal/article";
import UserListModal from "../modal/userlist";

const Home = () => {
  const { userId } = useContext(UserContext);

  const [articleList, setArticleList] = useState([]);

  const getArticleList = async (userId) => {
    const articles = await getFeedArticlesByUser(userId);
    setArticleList(articles.articleList);
    return articles;
  };

  useEffect(() => {
    getArticleList(userId);
  }, []);

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        style={{ width: "80vw", marginLeft: "20vw" }}
      >
        {articleList &&
          articleList.map((article) => (
            <Article article={article} userId={userId} />
          ))}
      </Grid>
      <ArticleModal />
      <UserListModal />
    </>
  );
};

export default Home;
