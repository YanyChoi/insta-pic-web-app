import { Grid } from "@mui/material";
import PostButton from "./buttons/post";
import HomeButton from "./buttons/home";
import SearchButton from "./buttons/search";
import LogoButton from "./buttons/logo";
import MenuButton from "./buttons/menu";
import ProfileButton from "./buttons/profile";
const Nav = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
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
      <LogoButton />
      <Grid container direction="column">
        <HomeButton />
        <SearchButton />
        <PostButton />
        <ProfileButton />
      </Grid>
      <MenuButton />
    </Grid>
  );
};

export default Nav;
