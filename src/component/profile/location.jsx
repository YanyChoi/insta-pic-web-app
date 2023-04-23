import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getArticleListByLocation } from "../../api/article/get-article";
import { UserContext } from "../../context/context";
import ArticleModal from "../modal/article";
import UserListModal from "../modal/userlist";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArticleBlock from "./article-block";

const LocationArticlePage = (props) => {
  const { userId, location, updateInfo } = useContext(UserContext);
  const [articles, setArticles] = useState();
  const initialize = async () => {
    if (!!!userId) {
      updateInfo()
    }
    const fetchArticle = await getArticleListByLocation(location, 0, 10);
    setArticles(fetchArticle);
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
        style={{ width: "630px", margin: "0 auto" }}
      >
        <Grid
          container
          direction="row"
          style={{
            padding: "50px 50px 20px 50px",
            marginBottom: "50px",
            borderBottom: "1px solid lightgray",
          }}
        >
          <LocationOnOutlinedIcon
            style={{
              padding: "15px",
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "50%",
              marginRight: "50px",
              background:
                "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
              color: "white",
            }}
          />
          <Grid container direction="column" style={{ width: "330px" }}>
            <Grid container direction="row">
              <p style={{ fontSize: "30px", marginBottom: "5px" }}>
                {location}
              </p>
            </Grid>
            <Grid container direction="row">
              {/* <b>게시물 {articles?.count}</b> */}
              <div style={{ width: "30px" }}></div>
            </Grid>
          </Grid>
        </Grid>
        <div>
          {articles?.map((article, index) => {
            return <ArticleBlock key={index} article={article} />;
          })}
        </div>
      </Grid>
      <ArticleModal />
      <UserListModal />
    </>
  );
};
export default LocationArticlePage;
