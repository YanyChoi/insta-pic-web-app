import { Button, Grid, TextField } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/user/login";
import { signUp } from "../../api/user/sign-up";
import { UserContext } from "../../context/context";

const SignUp = () => {
  const { updateInfo } = useContext(UserContext);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [introduction, setIntroduction] = useState("");
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
          id="id"
          variant="outlined"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <div style={{ height: "10px" }} />
        <TextField
          label="비밀번호"
          id="pw"
          variant="outlined"
          type="password"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
          }}
        />
        <div style={{ height: "10px" }} />
        <TextField
          label="성명"
          id="name"
          variant="outlined"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <div style={{ height: "10px" }} />
        <TextField
          label="자기소개"
          id="introduction"
          variant="outlined"
          value={introduction}
          onChange={(e) => {
            setIntroduction(e.target.value);
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
            await signUp({
              introduction,
              name,
              profilePicFile,
              pw,
              url,
              id,
            });
            const userInfo = await login(id, pw);
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
