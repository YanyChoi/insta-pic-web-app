import { Grid } from "@mui/material";
import Home from "./home/home";
import Nav from "./nav/nav";

const Wrap = () => {
  const Pages = [<Home />];
  return (
    <Grid container direction="row" justifyContent="flex-start">
      <Nav />
      {Pages[0]}
    </Grid>
  );
};
export default Wrap;
