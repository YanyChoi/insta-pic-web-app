import { Button, Grid, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../../context/context";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { getUser } from "../../api/user/get-user";
import { getArticle } from "../../api/article/get-article";

const ArticleBlock = ({ article }) => {
  const { setArticle, setArticleAuthor, setArticleOpen } =
    useContext(UserContext);
  const [hover, setHover] = useState(false);
  return (
    <Button
      onClick={async () => {
        const profileInfo = await getUser(article?.author.userId);
        setArticleAuthor(profileInfo);
        const modalArticle = await getArticle(article?.articleId)
        setArticle(modalArticle);
        setArticleOpen(true);
        setHover(false);
      }}
      style={{
        position: "relative",
        width: "200px",
        height: "200px",
        margin: "5px",
      }}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <img
        src={article?.thumbnail}
        alt="thumbnail"
        style={{
          width: "200px",
          height: "200px",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          display: hover ? "inline-block" : "none",
          width: "200px",
          height: "200px",
          position: "absolute",
          background: "rgba(0, 0, 0, 0.3)",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          style={{ color: "white", margin: "85px auto" }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            width={60}
          >
            <FavoriteIcon style={{ width: "30px", height: "30px" }} />
            <Typography style={{ paddingTop: "3px" }}>
              <b>{article?.likeCount}</b>
            </Typography>
          </Grid>
          <div style={{ width: "10px" }} />
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            width={60}
          >
            <ModeCommentIcon style={{ width: "30px", height: "30px" }} />
            <Typography style={{ paddingTop: "3px" }}>
              <b>{article?.commentCount}</b>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Button>
  );
};
export default ArticleBlock;
