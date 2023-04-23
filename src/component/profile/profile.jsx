import { Button, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import ArticleBlock from "./article-block";
const Profile = () => {
  const {
    userId,
    updateInfo,
    setListOpen,
    setListType,
    setUserList,
    profileId,
    setProfileId,
  } = useContext(UserContext);
  const [profileInfo, setProfileInfo] = useState();
  const [articles, setArticles] = useState();
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [neighbors, setNeighbors] = useState();
  const [userFollows, setUserFollows] = useState(false);

  const initialize = async () => {
    if (!userId) {
      updateInfo();
      console.log(userId)
    }
    const fetchProfile = await getUser(profileId);
    setProfileInfo(fetchProfile);
    const fetchArticle = await getArticleListByUser(profileId, 0, 10);
    console.log(fetchArticle);
    setArticles(fetchArticle);
    const fetchFollowers = await getFollowers(profileId, 0, 10);
    setFollowers(fetchFollowers);
    const fetchFollowing = await getFollowing(profileId, 0, 10);
    setFollowing(fetchFollowing);
    const fetchNeighbors = await getNeighbors(profileId, 0, 10);
    setNeighbors(fetchNeighbors);

    for (let i = 0; i < fetchFollowers?.length; i++) {
      if (fetchFollowers[i].userId === userId) {
        setUserFollows(true);
      }
    }
  };

  const navigate = useNavigate();

  const openProfile = (profileId) => {
    navigate(`/profile?id=${profileId}`);
    setProfileId(profileId);
  };

  useEffect(() => {
    initialize();
  }, [profileId]);

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
          <img
            alt="profile"
            src={profileInfo?.profilePictureUrl}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "50%",
              marginRight: "50px",
              marginTop: "10px",
            }}
          ></img>
          <Grid container direction="column" style={{ width: "330px" }}>
            <Grid container direction="row">
              <p
                style={{
                  fontSize: "30px",
                  marginBottom: "5px",
                  marginTop: "0px",
                }}
              >
                {profileInfo?.userName}
              </p>
              {!(userId === profileId) && (
                <Button
                  variant="contained"
                  style={{ height: "30px", margin: "0px 0px 5px 20px" }}
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
            <h3>{profileInfo?.fullName}</h3>
            <a href={profileInfo?.url}>
              <p style={{ marginTop: "0", fontSize: "14px" }}>
                {profileInfo?.url}
              </p>
            </a>
            <p style={{ margin: "0", fontSize: "14px" }}>
              {profileInfo?.introduction}
            </p>
            {userId !== profileId && neighbors?.count > 0 && (
              <Grid
                container
                style={{
                  fontSize: "12px",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
              >
                <b
                  style={{ width: "fit-content" }}
                  onClick={async () => {
                    openProfile(neighbors?.neighbors[0]?.neighborId);
                  }}
                >
                  {neighbors?.neighbors[0]?.neighborId}님
                </b>
                <p
                  style={{
                    margin: 0,
                    width: "fit-content",
                  }}
                  onClick={() => {
                    setUserList(followers.followList);
                    setListType("followers");
                    setListOpen(true);
                  }}
                >
                  {neighbors?.count > 1 ? ` 외 ${neighbors?.count - 1}명` : ""}
                  이 팔로우합니다
                </p>
              </Grid>
            )}
          </Grid>
        </Grid>
        <div>
          {articles?.map((article, index) => (
            <ArticleBlock key={index} article={article} />
          ))}
        </div>
      </Grid>
      <ArticleModal />
      <UserListModal />
    </>
  );
};
export default Profile;
