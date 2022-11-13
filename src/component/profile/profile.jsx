import { Button, Grid } from "@mui/material";
import queryString from "query-string";
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
const Profile = () => {
  const { userId } = useContext(UserContext);
  const [profileId, setProfileId] = useState(
    queryString.parse(window.location.search).id
  );
  const [profileInfo, setProfileInfo] = useState();
  const [articles, setArticles] = useState();
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [neighbors, setNeighbors] = useState();
  const [userFollows, setUserFollows] = useState(false);
  const [articleOpen, setArticleOpen] = useState(false);
  const [openedArticle, setOpenedArticle] = useState();

  const initialize = async () => {
    console.log(profileId);
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
    }

    for (let i = 0; i < fetchFollowers?.followList.length; i++) {
      if (fetchFollowers.followList[i].userId === userId) {
        setUserFollows(true);
      }
    }

    console.log(fetchFollowers);
  };

  useEffect(() => {
    initialize();
  }, []);

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
                    const res = userFollows
                      ? await deleteFollow(userId, profileId)
                      : await postFollow(userId, profileId);
                    setUserFollows(!userFollows);
                    console.log(res);
                  }}
                >
                  {userFollows ? "언팔로우" : "팔로우"}
                </Button>
              )}
            </Grid>
            <Grid container direction="row">
              <b>게시물 {articles?.count}</b>
              <div style={{ width: "30px" }}></div>
              <b>팔로워 {followers?.count}</b>
              <div style={{ width: "30px" }}></div>
              <b>팔로우 {following?.count}</b>
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
                  setOpenedArticle(article);
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
      <ArticleModal
        articleOpen={articleOpen}
        setArticleOpen={setArticleOpen}
        article={openedArticle}
        author={profileInfo}
      />
    </>
  );
};
export default Profile;
