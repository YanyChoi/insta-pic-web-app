import { Button, Grid, InputBase, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchUser } from "../../api/user/get-user";
import { UserContext } from "../../context/context";
import NotFound from "../../media/not_found.png";

const Search = () => {
  const { userId, setProfileId } = useContext(UserContext);
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();
  const search = async () => {
    const data = await searchUser(keyword);
    setSearchResult(data.users);
  };

  useEffect(() => {
    search();
  }, [keyword]);

  useEffect(() => {
    if (localStorage.length < 6) {
      navigate("/login");
    }
  }, [userId]);

  return (
    <Grid
      container
      direction="column"
      style={{
        width: "50vw",
        margin: "50px 0px 0px calc(25vw)",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        style={{
          height: "62px",
          width: "50vw",
          backgroundColor: "lightgray",
          borderRadius: "20px",
          marginBottom: "30px",
        }}
      >
        <InputBase
          placeholder="유저 검색..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          style={{
            width: "calc(50vw - 100px)",
            padding: "15px 15px 15px 30px",
          }}
        />
        <Button
          variant="text"
          style={{
            width: "62px",
            height: "62px",
            paddingRight: "5px",
            borderRadius: "50%",
          }}
          onClick={search}
        >
          검색
        </Button>
      </Grid>
      {searchResult.length > 0 ? (
        <Grid
          container
          direction="column"
          style={{
            width: "50vw",
            overflowY: "scroll",
          }}
        >
          {searchResult.map((user, index) => {
            return (
              <Grid
                container
                direction="row"
                key={index}
                justifyContent="space-between"
                style={{
                  height: "50px",
                }}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="start"
                  key={index}
                  onClick={() => {
                    setProfileId(user.userId);
                    navigate(`/profile?id=${user.userId}`);
                  }}
                  style={{
                    height: "50px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={user.profilePic}
                    key={user.profilePic}
                    alt="profile"
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />
                  <p key={index} style={{ marginTop: "3px" }}>
                    <b>{user?.userId}</b>
                    <br />
                    {user?.name}
                  </p>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <div
          style={{
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          <img
            src={NotFound}
            style={{ width: "200px", height: "200px", marginBottom: "30px" }}
          ></img>
          <Typography>
            검색결과가 없습니다. 다른 키워드로 검색해주세요!
          </Typography>
        </div>
      )}
    </Grid>
  );
};
export default Search;
