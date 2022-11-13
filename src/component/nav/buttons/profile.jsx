import { Button } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/context";

const ProfileButton = () => {
  const { userId, profilePic } = useContext(UserContext);
  return (
    <Link to={`/profile?id=${userId}`}>
      <Button
        onClick={() => {}}
        style={{ width: 100, height: 70, color: "black" }}
      >
        <div style={{ borderRadius: "50%", width: "35px", height: "35px" }}>
          <img
            src={profilePic}
            alt="profile"
            key={Date.now()}
            style={{ borderRadius: "50%", width: "35px", height: "35px" }}
          />
        </div>
      </Button>
    </Link>
  );
};
export default ProfileButton;