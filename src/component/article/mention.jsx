import { Typography } from "@mui/material";
import { useEffect } from "react";

const MentionBox = ({ mentions, position }) => {
  useEffect(() => {
    console.log(mentions);
  }, [mentions]);
  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
        opacity: "80%",
        width: "fit-content",
        padding: "2px 10px",
        borderRadius: "5px",
      }}
    >
      {mentions?.map((mention) => (
        <Typography style={{ margin: "0", fontSize: "14px", color: "white" }}>
          {mention}
        </Typography>
      ))}
    </div>
  );
};
export default MentionBox;
