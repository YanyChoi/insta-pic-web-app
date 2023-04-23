import { Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFeedArticlesByUser } from "../../api/article/get-article";
import { UserContext } from "../../context/context";
import Article from "../article/article";
import ArticleModal from "../modal/article";
import UserListModal from "../modal/userlist";
import EmptyBox from "../../media/empty_box.png";

const Home = () => {
  const { accessToken, updateInfo } = useContext(UserContext);

  const [articleList, setArticleList] = useState([]);
  const navigate = useNavigate();
  const initialize = async () => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    const userId = await updateInfo();
    const articles = await getFeedArticlesByUser(userId, 0, 10);
    setArticleList(articles);
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        style={{
          width: "calc(100vw - 100px)",
          marginLeft: "100px",
        }}
      >
        {articleList?.length > 0 ? (
          articleList.map((article, index) => (
            <Article key={index} article={article} />
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              marginTop: "calc(40vh - 100px)",
            }}
          >
            <img
              src={EmptyBox}
              style={{ width: "200px", height: "200px" }}
            ></img>
            <Typography>
              피드가 비어있습니다. 유저를 팔로우해서 피드를 채우세요!
            </Typography>
          </div>
        )}
      </Grid>
      <ArticleModal />
      <UserListModal />
    </>
  );
};

export default Home;
