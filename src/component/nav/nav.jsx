import { Grid } from "@mui/material";
import PostButton from "./buttons/post";
import HomeButton from "./buttons/home";
import SearchButton from "./buttons/search";
const Nav = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignContent="center"
      style={{
        width: "100px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        borderRight: "1px solid lightgray",
      }}
    >
      
      <HomeButton />
      <SearchButton />
      <PostButton />
    </Grid>
  );
};

export default Nav;
