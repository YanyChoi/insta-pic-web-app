import { Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProfileButton = () => {
  const [profilePic, setProfilePic] = useState("");
  return (
    <Link to="/profile">
    <Button onClick={() => {}} style={{ width: 100, height: 70, color: 'black' }}>
      <div style={{ borderRadius: "50%", width: "35px", height: "35px" }}>
        <img src={profilePic} />
      </div>
    </Button>
    </Link>
  );
};
export default ProfileButton;