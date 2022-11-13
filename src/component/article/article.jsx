import { Button, Grid, TextField } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useContext, useEffect, useState } from "react";
import { getUser } from "../../api/user/get-user";
import { getFollowing } from "../../api/follow/get-follow";
import { getMedia } from "../../api/media/get-media";
import { useNavigate } from "react-router-dom";
import { getArticleLike } from "../../api/like/get-like";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { postArticleLike } from "../../api/like/post-like";
import { deleteArticleLike } from "../../api/like/delete-like";
import { postRootComment } from "../../api/comment/post-comment";
import { UserContext } from "../../context/context";

const Article = ({ article, userId }) => {
  const {
    setArticleOpen,
    setArticle,
    setUserList,
    setListOpen,
    setListType,
    setArticleAuthor,
  } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [media, setMedia] = useState([]);
  const [likes, setLikes] = useState();
  const [liked, setLiked] = useState(false);
  const [commentDraft, setCommentDraft] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
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

  const checkLike = async (articleId) => {
    const data = await getArticleLike(articleId);
    setLikes(data);
    for (let i = 0; i < data.count; i++) {
      if (data.articleLikeList[i].userId === userId) {
        setLiked(true);
      }
    }
  };

  const openProfile = (profileId) => {
    navigate(`/profile?id=${profileId}`);
    window.location.reload();
  };

  useEffect(() => {
    getUserInfo(article.userId);
    getArticleMedia(article.articleId);
    checkFollow();
    checkLike(article.articleId);
  }, []);

  return (
    <>
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
            {/* <Link
              to={`/profile?id=${author?.userId}`}
              style={{
                color: "black",
                height: "42px",
                width: "300px",
                textDecoration: "none",
              }}
            > */}
            <Grid direction="row" container>
              <img
                alt="author"
                src={author?.profilePic}
                onClick={() => {
                  openProfile(article.userId);
                }}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  margin: "10px 10px 0px 0px",
                  cursor: "pointer",
                }}
              />
              <p
                onClick={() => {
                  openProfile(article.userId);
                }}
                style={{
                  marginRight: "10px",
                  marginTop: "20px",
                  cursor: "pointer",
                }}
              >
                <b>{article.userId}</b>
              </p>
            </Grid>
            {/* </Link> */}
            {!isFollowing && (
              <Button
                style={{
                  textDecoration: "none",
                  color: "#0074cc",
                  marginTop: "4px",
                }}
              >
                <p>팔로우</p>
              </Button>
            )}
          </Grid>
          <MoreHorizIcon
            style={{
              width: "40px",
              height: "40px",
              margin: "10px 10px 0px 0px",
            }}
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
          <Button
            id="like"
            style={{ color: "black" }}
            onClick={async () => {
              if (liked) {
                await deleteArticleLike({
                  articleId: article.articleId,
                  userId: userId,
                });
              } else {
                await postArticleLike({
                  articleId: article.articleId,
                  userId: userId,
                });
              }
              setLiked(!liked);
            }}
          >
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Button>
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
        >
          <Button
            style={{
              padding: "0px",
              height: "24px",
              color: "black",
              marginBottom: "10px",
            }}
            onClick={() => {
              setUserList(likes.articleLikeList);
              setListType("likes");
              setListOpen(true);
            }}
          >
            <b>좋아요 {likes?.count ?? 0}개</b>
          </Button>
        </Grid>
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
          <p style={{ margin: "0" }}>
            <b>{article.userId}</b> {article.text}
          </p>
          <a
            onClick={() => {
              setArticleAuthor(author);
              setListType("article");
              setArticle(article);
              setArticleOpen(true);
            }}
            style={{ textDecoration: "none", color: "darkgray" }}
          >
            <p style={{ margin: "5px 0px 0px 0px", cursor: "pointer" }}>
              댓글 더보기
            </p>
          </a>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          style={{
            width: "470px",
            height: "50px",
            padding: "8px 14px 8px 14px",
          }}
        >
          <TextField
            id="reply"
            placeholder="댓글 입력..."
            variant="standard"
            onChange={(e) => {
              setCommentDraft(e.target.value);
            }}
            value={commentDraft}
            style={{
              margin: "0px",
              width: "370px",
              height: "34px",
            }}
          />
          <Button
            variant="text"
            onClick={async () => {
              const mentions = [];
              let mention = commentDraft;
              while (mention.includes("@")) {
                mention = mention.slice(mention.indexOf("@") + 1);
                if (mention.indexOf(" ") !== -1)
                  mentions.push(mention.slice(0, mention.indexOf(" ")));
                else mentions.push(mention);
              }
              const commentText =
                mention !== commentDraft
                  ? mention.slice(mention.indexOf(" ") + 1)
                  : commentDraft;
              await postRootComment({
                articleId: article.articleId,
                userId,
                mentionedId: mentions[0],
                text: commentText,
              });
              setCommentDraft("");
            }}
          >
            게시
          </Button>
        </Grid>
      </div>
    </>
  );
};
export default Article;
