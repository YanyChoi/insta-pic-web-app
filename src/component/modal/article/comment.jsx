import { Button, Grid, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getCommentLike } from "../../../api/like/get-like";
import { UserContext } from "../../../context/context";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { deleteCommentLike } from "../../../api/like/delete-like";
import { postCommentLike } from "../../../api/like/post-like";
import { postRootComment } from "../../../api/comment/post-comment";
import { useNavigate } from "react-router-dom";

const Comment = ({ comment, onChange }) => {
  const {
    userId,
    setListOpen,
    setUserList,
    setListType,
    setArticleOpen,
    setProfileId,
  } = useContext(UserContext);
  const [openReply, setOpenReply] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeChange, setLikeChange] = useState(0);
  const [reply, setReply] = useState("");
  const [commentLikes, setCommentLikes] = useState();
  const navigate = useNavigate();
  const getCommentLikes = async (commentId) => {
    const data = await getCommentLike(commentId);
    setCommentLikes(data.commentLikeList);
  };

  useEffect(() => {
    getCommentLikes(comment?.commentId);
  }, []);

  useEffect(() => {
    for (let i = 0; i < commentLikes?.length; i++) {
      if (commentLikes[i]?.userId === userId) {
        setLiked(true);
      }
    }
  }, [commentLikes, userId]);

  return (
    <>
      <Grid
        container
        direction="column"
        style={{
          padding: "12px 0px 0px 0px",
        }}
      >
        <Grid container direction="row" justifyContent="space-between">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
            }}
          >
            <img
              alt="profile"
              src={comment?.profilePic}
              style={{
                marginTop: "5px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
              }}
            />
            <Grid
              container
              direction="column"
              style={{ width: "calc(30vw - 130px)" }}
            >
              <Grid
                container
                direction="row"
                style={{ textDecoration: "none", color: "black" }}
              >
                <b
                  style={{
                    fontSize: "14px",
                    marginLeft: "14px",
                    marginTop: "7px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setArticleOpen(false);
                    setProfileId(comment?.userId);
                    navigate(`/profile?id=${comment?.userId}`);
                  }}
                >
                  {comment?.userId}
                </b>
                <div
                  style={{
                    display: "flex",
                    direction: "row",
                    fontSize: "14px",
                    marginLeft: "5px",
                    marginTop: "0px",
                  }}
                >
                  {!!comment?.mentionedId && (
                    <p
                      style={{
                        color: "gray",
                        marginTop: "7px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setProfileId(comment?.userId);
                        navigate(`/profile?id=${comment?.userId}`);
                        setArticleOpen(false);
                      }}
                    >
                      {`@${comment.mentionedId}`}&nbsp;
                    </p>
                  )}
                  <p style={{ marginTop: "7px" }}>{comment?.text}</p>
                </div>
              </Grid>
              <Grid container direction="row" style={{ color: "gray" }}>
                <p
                  style={{
                    fontSize: "12px",
                    height: "14px",
                    margin: "0px 0px 0px 10px",
                  }}
                >
                  {comment?.datetime.slice(5, 10)}
                </p>
                <Button
                  variant="text"
                  style={{
                    fontSize: "12px",
                    height: "14px",
                    color: "gray",
                  }}
                  onClick={() => {
                    setListType("likes");
                    setUserList(commentLikes);
                    setListOpen(true);
                  }}
                >
                  좋아요 {commentLikes?.length + likeChange}개
                </Button>
                <Button
                  variant="text"
                  style={{
                    fontSize: "12px",
                    height: "14px",
                    color: "gray",
                  }}
                  onClick={() => {
                    setOpenReply(!openReply);
                  }}
                >
                  {openReply ? "닫기" : "답글 달기"}
                </Button>
              </Grid>
            </Grid>
          </div>
          <div
            id="like"
            style={{
              color: "black",
              width: "12px",
              height: "12px",
              marginTop: "10px",
              cursor: "pointer",
            }}
            onClick={async () => {
              if (liked) {
                await deleteCommentLike({
                  commentId: comment?.commentId,
                  userId: userId,
                });
                setLikeChange(likeChange - 1);
              } else {
                await postCommentLike({
                  commentId: comment?.commentId,
                  userId: userId,
                });
                setLikeChange(likeChange + 1);
              }
              setLiked(!liked);
            }}
          >
            {liked ? (
              <FavoriteIcon style={{ width: "12px", height: "12px" }} />
            ) : (
              <FavoriteBorderIcon style={{ width: "12px", height: "12px" }} />
            )}
          </div>
        </Grid>
        {openReply && (
          <Grid container direction="row" justifyContent="end">
            <TextField
              placeholder="답글 작성..."
              variant="standard"
              value={reply}
              onChange={(e) => {
                setReply(e.target.value);
              }}
              style={{
                marginLeft: "10px",
                width: "calc(25vw - 100px)",
                height: "30px",
              }}
            />
            <Button
              variant="text"
              onClick={async () => {
                const mentions = [];
                let mention = reply;
                while (mention.includes("@")) {
                  mention = mention.slice(mention.indexOf("@") + 1);
                  if (mention.indexOf(" ") !== -1)
                    mentions.push(mention.slice(0, mention.indexOf(" ")));
                  else mentions.push(mention);
                }
                const commentText =
                  mention !== reply
                    ? mention.slice(mention.indexOf(" ") + 1)
                    : reply;
                const data = await postRootComment({
                  articleId: comment.articleId,
                  userId: userId,
                  mentionenId: mentions[0],
                  text: commentText,
                  parentCommentId: comment.commentId,
                });
                onChange();
                getCommentLikes(comment?.commentId);
                setReply("");
                setOpenReply(false);
              }}
              style={{ width: "30px", height: "30px" }}
            >
              게시
            </Button>
          </Grid>
        )}
      </Grid>
      <div style={{ marginLeft: 40 }}>
        {comment?.childComments.map((childComment) => (
          <Comment comment={childComment} />
        ))}
      </div>
    </>
  );
};

export default Comment;
