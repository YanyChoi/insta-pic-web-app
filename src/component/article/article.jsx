import { Button, Grid } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useEffect, useState } from "react";
import { getUser } from "../../api/user/get-user";
import { getFollowing } from "../../api/follow/get-follow";
import { getMedia } from "../../api/media/get-media";

const Article = ({ article, userId }) => {
  const [author, setAuthor] = useState();
  const [isFollowing, setIsFollowing] = useState(false);
  const [media, setMedia] = useState([]);

  const getUserInfo = async (userId) => {
    const data = await getUser(userId);
    setAuthor(data);
  };

  const getArticleMedia = async (articleId) => {
    const data = await getMedia(articleId);
    setMedia(data.media);
  };

  const checkFollow = async () => {
    const result = await getFollowing(userId);
    for (let i = 0; i < result.count; i++) {
      if (result.followList[i].followId === article.userId) {
        setIsFollowing(true);
        return true;
      }
    }
    setIsFollowing(false);
    return false;
  };

  useEffect(() => {
    getUserInfo(article.userId);
    getArticleMedia(article.articleId);
    checkFollow();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        width: "470px",
        border: "1px solid lightgray",
        marginLeft: "calc((80vw - 570px) / 2)",
        marginTop: "30px",
        borderRadius: "10px",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        style={{
          width: "470px",
          height: "58px",
          padding: "0px 8px 0px 8px",
          borderBottom: "1px solid lightgray",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="start"
          style={{
            width: "404px",
            height: "58px",
          }}
        >
          <img
            alt="author"
            src={author?.profilePic}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              margin: "10px 10px 0px 0px",
            }}
          />
          <p style={{ marginRight: "10px", marginTop: "20px" }}>
            <b>{article.userId}</b>
          </p>
          <Button
            style={{
              textDecoration: "none",
              color: "#0074cc",
              marginTop: "4px",
            }}
          >
            {!isFollowing && <p>팔로우</p>}
          </Button>
        </Grid>
        <MoreHorizIcon
          style={{ width: "40px", height: "40px", margin: "10px 10px 0px 0px" }}
        ></MoreHorizIcon>
      </Grid>
      {/* media */}
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          overflowX: "scroll",
          scrollSnapType: "x mandatory !important",
          width: `calc(${media.count} * 470px)`,
        }}
      >
        {media.map((singleMedia, index) => (
          <div
            key={index}
            style={{
              width: "470px",
              height: "470px",
            }}
          >
            <img
              key={singleMedia.mediaId}
              alt={singleMedia.mediaId}
              src={singleMedia.url}
              style={{
                width: "470px",
                height: "470px",
                backgroundColor: "black",
                objectFit: "contain",
              }}
            ></img>
          </div>
        ))}
      </div>
      <Grid
        container
        direction="row"
        justifyContent="start"
        style={{
          width: "470px",
          height: "46px",
        }}
      >
        <Button id="like"></Button>
        <Button id="comment"></Button>
      </Grid>
      <Grid
        container
        direction="row"
        style={{
          width: "470px",
          height: "24px",
          padding: "0px 10px 0px 10px",
        }}
      ></Grid>
      <Grid
        container
        direction="column"
        alignContent="start"
        style={{
          width: "470px",
          height: "70px",
          padding: "0px 12px 0px 12px",
          borderBottom: "1px solid lightgray",
        }}
      >
        <p style={{ margin: '0' }}><b>{article.userId}</b> {article.text}</p>
        <p style={{ margin: '5px 0px 0px 0px' }}>댓글 더보기</p>
      </Grid>
      <Grid
        container
        direction="row"
        style={{
          width: "470px",
          height: "50px",
          padding: "3px 14px 0px 14px",
        }}
      ></Grid>
    </div>
  );
};
export default Article;
