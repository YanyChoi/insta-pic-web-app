import { Button, Grid, IconButton, Popover, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getCommentLike } from "../../../api/like/get-like";
import { UserContext } from "../../../context/context";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { deleteCommentLike } from "../../../api/like/delete-like";
import { postCommentLike } from "../../../api/like/post-like";
import { postRootComment } from "../../../api/comment/post-comment";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { deleteSingleComment } from "../../../api/comment/delete-comment";

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
  const [iconVisible, setIconVisible] = useState(false);
  const [commentMenu, setCommentMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
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
          display: isDeleted ? "none" : "block",
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
            <Grid container direction="column" style={{ width: "200px" }}>
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
                    marginTop: "2px",
                  }}
                  onClick={() => {
                    setListType("likes");
                    setUserList(commentLikes);
                    setListOpen(true);
                  }}
                >
                  좋아요 {commentLikes?.length + likeChange}개
                </Button>
                {comment.parentCommentId === 0 && (
                  <Button
                    variant="text"
                    style={{
                      fontSize: "12px",
                      height: "14px",
                      color: "gray",
                      marginTop: "2px",
                    }}
                    onClick={() => {
                      setOpenReply(!openReply);
                    }}
                  >
                    {openReply ? "닫기" : "답글 달기"}
                  </Button>
                )}
                {userId === comment?.userId && (
                  <IconButton
                    style={{
                      height: "14px",
                      width: "14px",
                      marginTop: "-1px",
                    }}
                    onMouseOver={() => {
                      if (!iconVisible) {
                        setIconVisible(true);
                      }
                    }}
                    onMouseLeave={() => {
                      if (iconVisible) {
                        setIconVisible(false);
                      }
                    }}
                    onClick={(e) => {
                      setCommentMenu(!commentMenu);
                      setAnchorEl(e.currentTarget);
                    }}
                  >
                    {iconVisible && (
                      <MoreHorizIcon
                        style={{
                          height: "14px",
                          width: "14px",
                        }}
                      />
                    )}
                  </IconButton>
                )}
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
                width: "180px",
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
              style={{ height: "32px" }}
            >
              게시
            </Button>
          </Grid>
        )}
      </Grid>
      <div style={{ marginLeft: 15 }}>
        {comment?.childComments.map((childComment, index) => (
          <Comment key={index} comment={childComment} />
        ))}
      </div>
      <Popover
        id={commentMenu ? "simple-popover" : undefined}
        open={commentMenu}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          setCommentMenu(false);
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
            deleteSingleComment(comment?.commentId);
            setIsDeleted(true);
            setCommentMenu(false);
          }}
        >
          댓글 삭제
        </Button>
      </Popover>
    </>
  );
};

export default Comment;
