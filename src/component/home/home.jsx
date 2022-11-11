import { Button, Grid } from "@mui/material";
import { login } from "../../api/user/login";

const Home = () => {
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
    </Grid>
  );
};

export default Home;
