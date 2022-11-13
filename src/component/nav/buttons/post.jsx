import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../../context/context";
import PostModal from "../../modal/post";

const PostButton = () => {
  const { setPostOpen } = useContext(UserContext);
  return (
    <>
      <Button
        onClick={() => {
          setPostOpen(true);
        }}
        style={{ width: 100, height: 70, color: "black" }}
      >
        <AddCircleOutlineIcon style={{ width: 35, height: 35 }} />
      </Button>
      <PostModal />
    </>
  );
};
export default PostButton;
