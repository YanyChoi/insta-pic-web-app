import { Button, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getArticleListByUser } from "../../api/article/get-article";
import { deleteFollow } from "../../api/follow/delete-follow";
import {
  getFollowers,
  getFollowing,
  getNeighbors,
} from "../../api/follow/get-follow";
import { postFollow } from "../../api/follow/post-follow";
import { getUser } from "../../api/user/get-user";
import { UserContext } from "../../context/context";
import ArticleModal from "../modal/article";
import UserListModal from "../modal/userlist";
const Profile = (props) => {
  const {
    userId,
    setArticleOpen,
    setArticle,
    setListOpen,
    setListType,
    setUserList,
    setArticleAuthor,
    profileId,
  } = useContext(UserContext);
  const [profileInfo, setProfileInfo] = useState();
  const [articles, setArticles] = useState();
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [neighbors, setNeighbors] = useState();
  const [userFollows, setUserFollows] = useState(false);

  const initialize = async () => {
    const fetchProfile = await getUser(profileId);
    setProfileInfo(fetchProfile);
    const fetchArticle = await getArticleListByUser(profileId);
    setArticles(fetchArticle);
    const fetchFollowers = await getFollowers(profileId);
    setFollowers(fetchFollowers);
    const fetchFollowing = await getFollowing(profileId);
    setFollowing(fetchFollowing);
    if (userId !== profileId) {
      const fetchNeighbors = await getNeighbors(userId, profileId);
      setNeighbors(fetchNeighbors);

      for (let i = 0; i < fetchFollowers?.followList.length; i++) {
        if (fetchFollowers.followList[i].userId === userId) {
          setUserFollows(true);
        }
      }
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {});

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        style={{ width: "930px", margin: "0 auto" }}
      >
        <Grid
          container
          direction="row"
          style={{
            padding: "50px",
            marginBottom: "50px",
            borderBottom: "1px solid lightgray",
          }}
        >
          <img
            alt="profile"
            src={profileInfo?.profilePic}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "50%",
              marginRight: "100px",
              marginTop: "20px",
            }}
          ></img>
          <Grid container direction="column" style={{ width: "450px" }}>
            <Grid container direction="row">
              <p style={{ fontSize: "30px", marginBottom: "5px" }}>
                {profileId}
              </p>
              {!(userId === profileId) && (
                <Button
                  variant="contained"
                  style={{ height: "30px", margin: "30px 0px 5px 20px" }}
                  onClick={async () => {
                    userFollows
                      ? await deleteFollow(userId, profileId)
                      : await postFollow(userId, profileId);
                    setUserFollows(!userFollows);
                  }}
                >
                  {userFollows ? "언팔로우" : "팔로우"}
                </Button>
              )}
            </Grid>
            <Grid container direction="row">
              <b>게시물 {articles?.count}</b>
              <div style={{ width: "30px" }}></div>
              <b
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setUserList(followers.followList);
                  setListType("followers");
                  setListOpen(true);
                }}
              >
                팔로워 {followers?.count}
              </b>
              <div style={{ width: "30px" }}></div>
              <b
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setUserList(following.followList);
                  setListType("following");
                  setListOpen(true);
                }}
              >
                팔로우 {following?.count}
              </b>
            </Grid>
            <h2>{profileInfo?.name}</h2>
            <p style={{ margin: "0" }}>{profileInfo?.introduction}</p>
          </Grid>
        </Grid>
        <div>
          {articles?.articleList.map((article, index) => {
            return (
              <Button
                onClick={() => {
                  setArticleAuthor(profileInfo);
                  setArticle(article);
                  setArticleOpen(true);
                }}
                style={{ width: "300px", height: "300px", margin: "5px" }}
              >
                <img
                  src={article.thumbnail}
                  alt="thumbnail"
                  key={index}
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                  }}
                />
              </Button>
            );
          })}
        </div>
      </Grid>
      <ArticleModal />
      <UserListModal />
    </>
  );
};
export default Profile;
