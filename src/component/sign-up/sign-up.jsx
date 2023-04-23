import { Button, Grid, TextField } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/user/login";
import { signUp } from "../../api/user/sign-up";
import { UserContext } from "../../context/context";

const SignUp = () => {
  const { updateInfo } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicFile, setProfilePicFile] = useState();
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [url, setUrl] = useState("");

  const photoInput = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (profilePicFile) {
      setProfilePicUrl(URL.createObjectURL(profilePicFile));
    }
  }, [profilePicFile]);

  useEffect(() => {
    if (localStorage.length >= 6) {
      navigate("/");
    }
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      style={{
        width: "350px",
        height: "600px",
        margin: "calc((100vh - 600px) / 2) auto",
        border: "1px solid gray",
        borderRadius: "20px",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="start"
        style={{
          width: "350px",
          height: "550px",
          padding: "0px 30px 0px 30px",
        }}
      >
        <Button
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            margin: "20px auto",
            padding: "0px",
            backgroundColor: "lightgray",
          }}
          onClick={() => {
            photoInput.current.click();
          }}
        >
          {!!profilePicUrl && (
            <img
              src={profilePicUrl}
              alt="profile"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                backgroundColor: "white",
                border: "1px solid black",
                objectFit: "cover",
              }}
            />
          )}
          <input
            type="file"
            ref={photoInput}
            accept="image/*"
            hidden
            onChange={(e) => {
              setProfilePicFile(e.target.files[0]);
            }}
          ></input>
        </Button>
        <div style={{ height: "30px" }} />
        <TextField
          label="아이디"
          id="username"
          variant="outlined"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <div style={{ height: "10px" }} />
        <TextField
          label="비밀번호"
          id="password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div style={{ height: "10px" }} />
        <TextField
          label="성명"
          id="name"
          variant="outlined"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
        <div style={{ height: "10px" }} />
        <TextField
          label="자기소개"
          id="bio"
          variant="outlined"
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />
        <div style={{ height: "10px" }} />
        <TextField
          label="홈페이지 URL"
          id="url"
          variant="outlined"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />

        <div style={{ height: "10px" }} />

        <Button
          variant="contained"
          onClick={async () => {
            console.log("signing up");
            const tokens = await signUp({
              userName: username,
              fullName: fullName,
              password: password,
              bio: bio,
              url: url,
              profilePicFile: profilePicFile,
            });
            console.log(tokens);
            const userInfo = await login(username, password);
            await updateInfo(userInfo);
            if (userInfo) {
              navigate("/");
            }
          }}
          style={{ height: "40px", width: "290px" }}
        >
          회원가입
        </Button>
        <Link
          to="/login"
          style={{ textDecoration: "none", textAlign: "center" }}
        >
          <p style={{ fontSize: "12px" }}>로그인하기</p>
        </Link>
      </Grid>
    </Grid>
  );
};

export default SignUp;
