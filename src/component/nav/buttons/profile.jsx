import { Button } from "@mui/material";

const ProfileButton = () => {
  const [profilePic, setProfilePic] = useState("");
  return (
    <Button onClick={() => {}} style={{ width: 100, height: 70 }}>
      <div style={{ borderRadius: "50%", width: "35px", height: "35px" }}>
        <img src={profilePic} />
      </div>
    </Button>
  );
};
