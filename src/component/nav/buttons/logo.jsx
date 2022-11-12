import InstagramIcon from "@mui/icons-material/Instagram";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const LogoButton = () => {
  return (
    <Link to="/">
      <Button
        onClick={() => {}}
        style={{ width: 100, height: 70, color: "black" }}
      >
        <InstagramIcon style={{ width: 35, height: 35 }} />
      </Button>
    </Link>
  );
};
export default LogoButton;
