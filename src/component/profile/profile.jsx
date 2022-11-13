import { Grid } from "@mui/material";
import queryString from "query-string";
import { useContext, useEffect, useState } from "react";
import { getArticleListByUser } from "../../api/article/get-article";
import {
  getFollowers,
  getFollowing,
  getNeighbors,
} from "../../api/follow/get-follow";
import { getUser } from "../../api/user/get-user";
import { UserContext } from "../../context/context";
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

    console.log(articles);
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      style={{ width: "800px", margin: "0 auto" }}
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
          <p style={{ fontSize: "30px", marginBottom: "5px" }}>{profileId}</p>
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
        {articles?.articleList.map((article) => {
          console.log(article);
        })}
      </div>
    </Grid>
  );
};
export default Profile;
