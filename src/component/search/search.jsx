import { Button, Grid, InputBase } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { searchUser } from "../../api/user/get-user";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const search = async () => {
    const data = await searchUser(keyword);
    setSearchResult(data.users);
  };

  return (
    <Grid
      container
      direction="column"
      style={{
        width: "60vw",
        height: "60vh",
        margin: "50px 0px 0px calc((100vw - 100px) / 4)",
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
      <Grid
        container
        direction="column"
        style={{
          width: "60vw",
          padding: "30px",
        }}
      >
        {searchResult.map((user) => {
          return (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              style={{
                width: "60vw",
                height: "50px",
              }}
            >
              <Link
                to={`/profile?id=${user.userId}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="start"
                  style={{
                    height: "50px",
                  }}
                >
                  <img
                    src={user.profilePic}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />
                  <p style={{ marginTop: "3px" }}>
                    <b>{user?.userId}</b>
                    <br />
                    {user?.name}
                  </p>
                </Grid>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};
export default Search;
