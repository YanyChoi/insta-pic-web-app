import { Button, Grid } from "@mui/material";
import { useContext } from "react";
import { login } from "../../api/user/login";
import { UserContext } from "../../context/context";

const Home = () => {
  const { userId, pw, name, profilePic, url, introduction } = useContext(UserContext);
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      style={{ width: "80vw", marginLeft: "20vw" }}
    >
      <Button
        variant="contained"
        onClick={async () => {
          const result = await login("test", "pass");
          console.log(result);
        }}
      >
        Login
      </Button>

      <p>{userId}</p>
      <p>{pw}</p>
      <p>{name}</p>
      <p>{profilePic}</p>
      <p>{url}</p>
      <p>{introduction}</p>
    </Grid>
  );
};

export default Home;
