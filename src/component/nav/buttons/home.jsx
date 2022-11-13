import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const HomeButton = () => {
  return (
    <>
      <Link to="/">
        <Button
          onClick={() => {}}
          style={{ width: 100, height: 70, color: "black" }}
        >
          <HomeOutlinedIcon style={{ width: 35, height: 35 }} />
        </Button>
      </Link>
    </>
  );
};
export default HomeButton;
