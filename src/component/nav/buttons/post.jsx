import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button } from "@mui/material";
import { useState } from "react";
import PostModal from "../../modal/post";

const PostButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        style={{ width: 100, height: 70, color: "black" }}
      >
        <AddCircleOutlineIcon style={{ width: 35, height: 35 }} />
      </Button>
      <PostModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
export default PostButton;
