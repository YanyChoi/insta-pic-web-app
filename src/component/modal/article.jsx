import {
  Button,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getMedia } from "../../api/media/get-media";
import CircularProgress from "@mui/material/CircularProgress";
import { getComments } from "../../api/comment/get-comment";
import { getArticleLike } from "../../api/like/get-like";
import { UserContext } from "../../context/context";
import { deleteArticleLike } from "../../api/like/delete-like";
import { postArticleLike } from "../../api/like/post-like";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Comment from "./article/comment";
import { postRootComment } from "../../api/comment/post-comment";
import MentionBox from "../article/mention";
import { useNavigate } from "react-router-dom";
import Media from "../article/media";

const ArticleModal = () => {
  const {
    articleOpen,
    setArticleOpen,
    setListOpen,
    setUserList,
    setListType,
    article,
    articleAuthor,
    articleLike,
    setArticleLike,
    setProfileId,
    setLocation,
  } = useContext(UserContext);
  const { userId } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaList, setMediaList] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState();
  const [commentDraft, setCommentDraft] = useState("");
  const [likeChange, setLikeChange] = useState(0);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionList, setMentionList] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const getArticleMedia = async (articleId) => {
    const data = await getMedia(articleId);
    setMediaList(data.media);
  };

  const getArticleComments = async (articleId) => {
    const data = await getComments(articleId);
    setComments(data.comments);
  };

  const onChange = async () => {
    getArticleComments(article.articleId);
    checkLike(article.articleId);
  };

  const checkLike = async (articleId) => {
    const data = await getArticleLike(articleId);
    setLikes(data);
    for (let i = 0; i < data.count; i++) {
      if (data.articleLikeList[i].userId === userId) {
        setArticleLike(true);
        return;
      }
    }
    setArticleLike(false);
    return;
  };

  const openProfile = (profileId) => {
    navigate(`/profile?id=${profileId}`);
    setProfileId(profileId);
    setArticleOpen(false);
  };

  const openLocation = (location) => {
    navigate(`/location?location=${location}`);
    setLocation(location);
    setArticleOpen(false);
  };

  useEffect(() => {
    if (articleOpen) {
      setIsLoading(true);
      if (article?.articleId) {
        getArticleMedia(article.articleId);
        getArticleComments(article.articleId);
        checkLike(article.articleId);
      }
      setIsLoading(false);
    } else {
      setLikeChange(0);
    }
  }, [articleOpen]);

  useEffect(() => {
    if (showMentions) {
      const e = window.event;
      setMousePosition({
        x: e.clientX - e.target.offsetLeft,
        y: e.clientY - e.target.offsetTop,
      });
    }
  }, [showMentions]);

  return (
    <>
      <Modal
        open={articleOpen}
        onClose={() => {
          setArticleOpen(false);
        }}
      >
        <Paper
          style={{
            width: "80vw",
            height: "90vh",
            position: "absolute",
            top: "5vh",
            left: "10vw",
          }}
        >
          <Grid container direction="row">
            <div
              style={{
                width: "calc(80vw - 300px)",
                height: "90vh",
                backgroundColor: "black",
              }}
            >
              {isLoading ? (
                <>
                  <CircularProgress />
                </>
              ) : (
                <Media
                  media={mediaList}
                  setMentionList={setMentionList}
                  showMentions={showMentions}
                  setShowMentions={setShowMentions}
                  width="calc(80vw - 300px)"
                  height="90vh"
                />
              )}
            </div>
            <Grid
              container
              direction="column"
              style={{ width: "300px", height: "90vh" }}
            >
              <Grid
                container
                direction="row"
                justifyContent="start"
                style={{
                  padding: "14px 4px 14px 16px",
                  borderBottom: "1px solid lightgray",
                }}
              >
                <img
                  alt="profile"
                  src={articleAuthor?.profilePic}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    openProfile(articleAuthor?.userId);
                  }}
                />
                <Grid
                  container
                  direction="column"
                  style={{ width: "fit-content" }}
                >
                  <b
                    style={{
                      fontSize: "14px",
                      marginLeft: "14px",
                      marginTop: !!article?.location ? "0px" : "7px",
                      width: "fit-content",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      openProfile(articleAuthor?.userId);
                    }}
                  >
                    {articleAuthor?.userId}
                  </b>
                  {!!article?.location && (
                    <Typography
                      style={{
                        margin: "0px 0px 0px 14px",
                        fontSize: "12px",
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
              <Grid
                container
                direction="column"
                style={{
                  height: "calc(90vh - 200px)",
                  borderBottom: "1px solid lightgray",
                  overflowY: "scroll",
                }}
              >
                <Grid
                  container
                  direction="column"
                  style={{ padding: "15px 5px 15px 15px" }}
                >
                  <Grid container direction="row">
                    <img
                      alt="profile"
                      src={articleAuthor?.profilePic}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        openProfile(articleAuthor?.userId);
                      }}
                    />
                    <b
                      style={{
                        fontSize: "14px",
                        marginLeft: "14px",
                        marginTop: "7px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        openProfile(articleAuthor?.userId);
                      }}
                    >
                      {articleAuthor?.userId}
                    </b>
                  </Grid>
                  <p>{article?.text}</p>
                  {comments?.map((comment, index) => (
                    <Comment
                      key={index}
                      comment={comment}
                      onChange={onChange}
                    />
                  ))}
                  {/* comments */}
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="start"
                style={{
                  width: "300px",
                  height: "46px",
                }}
              >
                <Button
                  id="like"
                  style={{ color: "black" }}
                  onClick={async () => {
                    if (articleLike) {
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
                    setArticleLike(!articleLike);
                  }}
                >
                  {articleLike ? (
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
                  width: "300px",
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
                  <b>좋아요 {likes?.count + likeChange}개</b>
                </Button>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                style={{
                  width: "300px",
                  height: "50px",
                  padding: "8px 14px 8px 14px",
                }}
              >
                <TextField
                  id="reply"
                  placeholder="댓글 달기..."
                  variant="standard"
                  onChange={(e) => {
                    setCommentDraft(e.target.value);
                  }}
                  value={commentDraft}
                  style={{
                    margin: "0px",
                    width: "205px",
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
                    const data = await postRootComment({
                      articleId: article.articleId,
                      userId,
                      mentionedId: mentions[0],
                      text: commentText,
                    });
                    setComments([...comments, data]);
                    setCommentDraft("");
                  }}
                >
                  게시
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {showMentions && (
            <MentionBox
              mentions={mentionList}
              position={mousePosition}
              isModal={true}
            />
          )}
        </Paper>
      </Modal>
    </>
  );
};

export default ArticleModal;
