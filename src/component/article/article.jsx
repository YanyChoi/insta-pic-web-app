import {
  Button,
  Grid,
  IconButton,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
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
import MentionBox from "./mention";
import { deleteArticle } from "../../api/article/delete-article";
import Media from "./media";

const Article = ({ article }) => {
  const {
    userId,
    setArticleOpen,
    setArticle,
    setUserList,
    setListOpen,
    setListType,
    setArticleAuthor,
    articleLike,
    setArticleLike,
    setProfileId,
    setLocation,
  } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [media, setMedia] = useState([]);
  const [likes, setLikes] = useState();
  const [liked, setLiked] = useState(false);
  const [commentDraft, setCommentDraft] = useState("");
  const [author, setAuthor] = useState("");
  const [likeChange, setLikeChange] = useState(0);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionList, setMentionList] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
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
    if (result.followList[0].userId === userId) {
      setIsFollowing(true);
      return true;
    }
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
        return;
      }
    }
    setLiked(false);
  };

  const openProfile = (profileId) => {
    navigate(`/profile?id=${profileId}`);
    setProfileId(profileId);
  };

  const openLocation = (location) => {
    navigate(`/location?location=${location}`);
    setLocation(location);
  };

  useEffect(() => {
    getUserInfo(article.userId);
    getArticleMedia(article.articleId);
    checkFollow();
    checkLike(article.articleId);
  }, []);

  useEffect(() => {
    checkLike(article.articleId);
    setLikeChange(0);
  }, [articleLike]);

  useEffect(() => {
    if (showMentions) {
      const e = window.event;
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  }, [showMentions]);

  return (
    <>
      <div
        style={{
          display: isDeleted ? "none" : "flex",
          flexDirection: "column",
          justifyContent: "start",
          width: "470px",
          border: "1px solid lightgray",
          marginLeft: "calc((100vw - 570px) / 2)",
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
                  objectFit: "cover",
                  margin: "10px 10px 0px 0px",
                  cursor: "pointer",
                }}
              />
              <Grid
                container
                direction="column"
                style={{ width: "fit-content" }}
              >
                <p
                  onClick={() => {
                    openProfile(article.userId);
                  }}
                  style={{
                    marginBottom: "0px",
                    marginRight: "10px",
                    marginTop: !!article.location ? "10px" : "20px",
                    cursor: "pointer",
                  }}
                >
                  <b>{article.userId}</b>
                </p>
                {!!article.location && (
                  <Typography
                    style={{
                      margin: "0px",
                      fontSize: "14px",
                      fontWeight: "lighter",
                      width: "fit-content",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      openLocation(article.location);
                    }}
                  >
                    {article.location}
                  </Typography>
                )}
              </Grid>
            </Grid>
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
          {userId === article?.userId && (
            <IconButton
              style={{
                width: "40px",
                height: "40px",
                margin: "10px 10px 0px 0px",
              }}
              onClick={(e) => {
                setOpen(!open);
                setAnchorEl(e.currentTarget);
              }}
            >
              <MoreHorizIcon
                style={{
                  width: "40px",
                  height: "40px",
                }}
              ></MoreHorizIcon>
            </IconButton>
          )}
        </Grid>
        <Media
          media={media}
          setMentionList={setMentionList}
          showMentions={showMentions}
          setShowMentions={setShowMentions}
          width="470px"
          height="470px"
        />
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
                setLikeChange(likeChange - 1);
              } else {
                await postArticleLike({
                  articleId: article.articleId,
                  userId: userId,
                });
                setLikeChange(likeChange + 1);
              }
              setLiked(!liked);
            }}
          >
            {liked ? (
              <FavoriteIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
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
            onClick={async () => {
              const data = await getArticleLike(article.articleId);
              setUserList(data.articleLikeList);
              setListType("likes");
              setListOpen(true);
            }}
          >
            <b>좋아요 {likes?.count + likeChange}개</b>
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
              setArticleLike(liked);
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

      {showMentions && (
        <MentionBox mentions={mentionList} position={mousePosition} />
      )}
      <Popover
        id={open ? "simple-popover" : undefined}
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          setOpen(false);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Button
          variant="text"
          style={{ width: "150px", height: "50px", color: "red" }}
          onClick={async () => {
            deleteArticle(article?.articleId);
            setIsDeleted(true);
            setOpen(false);
          }}
        >
          게시글 삭제
        </Button>
      </Popover>
    </>
  );
};
export default Article;
