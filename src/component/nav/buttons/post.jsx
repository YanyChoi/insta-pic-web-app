import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const PostButton = () => {
  return (
    <Link to="/post">
      <Button
        onClick={() => {}}
        style={{ width: 100, height: 70, color: "black" }}
      >
        <AddCircleOutlineIcon style={{ width: 35, height: 35 }} />
      </Button>
    </Link>
  );
};
export default PostButton;
