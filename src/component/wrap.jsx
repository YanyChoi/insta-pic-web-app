import { Grid } from "@mui/material";
import Nav from "./nav/nav";

const Wrap = ({ children }) => {
  return (
    <Grid container direction="row" justifyContent="flex-start">
      <Nav />
      {children}
    </Grid>
  );
};
export default Wrap;
