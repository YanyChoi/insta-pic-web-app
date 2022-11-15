import { Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/context";

const MentionBox = ({ mentions, position, isModal }) => {
  const { setProfileId } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div
      id="mentionpop"
      style={{
        position: "absolute",
        left: isModal ? `calc(${position.x}px - 10vw)` : position.x,
        top: isModal ? `calc(${position.y}px - 5vh)` : position.y,
        // left: position.x,
        // top: position.y,
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
        <Typography
          style={{
            margin: "0",
            fontSize: "14px",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => {
            setProfileId(mention);
            navigate(`/profile?id=${mention}`);
          }}
        >
          {mention}
        </Typography>
      ))}
    </div>
  );
};
export default MentionBox;
