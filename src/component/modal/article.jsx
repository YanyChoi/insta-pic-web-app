import { Button, Grid, Modal, Paper, TextField } from "@mui/material";
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

const ArticleModal = ({ articleOpen, setArticleOpen, article, author }) => {
  const { userId } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaList, setMediaList] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState();
  const [liked, setLiked] = useState(false);
  const [commentDraft, setCommentDraft] = useState("");
  const getArticleMedia = async (articleId) => {
    const data = await getMedia(articleId);
    setMediaList(data.media);
    console.log(data.media);
  };

  const getArticleComments = async (articleId) => {
    const data = await getComments(articleId);
    setComments(data.comments);
  };

  const checkLike = async (articleId) => {
    const data = await getArticleLike(articleId);
    setLikes(data);
    console.log(data);
    for (let i = 0; i < data.count; i++) {
      if (data.articleLikeList[i].userId === userId) {
        setLiked(true);
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (article?.articleId) {
      getArticleMedia(article.articleId);
      getArticleComments(article.articleId);
      checkLike(article.articleId);
    }
    setIsLoading(false);
  }, [article]);
  return (
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
            style={{ width: "50vw", height: "90vh", backgroundColor: "black" }}
          >
            {isLoading ? (
              <>
                <CircularProgress />
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  overflowX: "scroll",
                  scrollSnapType: "x mandatory !important",
                  width: `calc(${mediaList.count} * 50vw)`,
                }}
              >
                {mediaList.map((media, index) => (
                  <div
                    key={index}
                    style={{
                      width: "50vw",
                      height: "90vh",
                    }}
                  >
                    <img
                      key={media.mediaId}
                      alt={media.mediaId}
                      src={media.url}
                      style={{
                        width: "50vw",
                        height: "90vh",
                        backgroundColor: "black",
                        objectFit: "contain",
                      }}
                    ></img>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Grid
            container
            direction="column"
            style={{ width: "30vw", height: "90vh" }}
          >
            <Grid
              container
              direction="row"
              style={{
                padding: "14px 4px 14px 16px",
                borderBottom: "1px solid lightgray",
              }}
            >
              <img
                src={author?.profilePic}
                style={{ width: "32px", height: "32px", borderRadius: "50%" }}
              />
              <b
                style={{
                  fontSize: "14px",
                  marginLeft: "14px",
                  marginTop: "7px",
                }}
              >
                {author?.userId}
              </b>
            </Grid>
            <Grid
              container
              direction="column"
              style={{
                width: "30vw",
                height: "calc(90vh - 200px)",
                borderBottom: "1px solid lightgray",
                overflow: "scroll",
              }}
            >
              <Grid container direction="column" style={{ padding: "16px" }}>
                <Grid container direction="row">
                  <img
                    src={author?.profilePic}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                    }}
                  />
                  <b
                    style={{
                      fontSize: "14px",
                      marginLeft: "14px",
                      marginTop: "7px",
                    }}
                  >
                    {author?.userId}
                  </b>
                </Grid>
                <p>{article?.text}</p>
                {comments.map((comment) => (
                  <Comment comment={comment} />
                ))}
                {/* comments */}
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="start"
              style={{
                width: "30vw",
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
                width: "30vw",
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
              >
                <b>좋아요 {likes?.count ?? 0}개</b>
              </Button>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              style={{
                width: "30vw",
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
                  width: "calc(30vw - 95px)",
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
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default ArticleModal;
