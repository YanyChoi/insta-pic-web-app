import { Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/context";

const ProfileButton = () => {
  const { userId, profilePic } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        navigate(`/profile?id=${userId}`);
        window.location.reload();
      }}
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
  );
};
export default ProfileButton;
