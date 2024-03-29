import { Button, Grid, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/user/login";
import { UserContext } from "../../context/context";
import LogoTypo from "../../media/logo_typo.png";

const Login = () => {
  const { updateInfo, setAccessToken, setRefreshToken } =
    useContext(UserContext);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const onKeyPress = async (event) => {
    if (event.key === "Enter" && isValid) {
      await onClick();
    }
  };

  const onClick = async (e) => {
    const newUser = await login(id, pw);
    await updateInfo();
    setAccessToken(localStorage.getItem("accessToken"));
    setRefreshToken(localStorage.getItem("refreshToken"));
    navigate("/");
  };

  useEffect(() => {
    if (!!id && !!pw) {
      setIsValid(true);
    }
  }, [id, pw]);

  useEffect(() => {
    if (!!localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);

  return (
    <Grid
      conatiner
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
      <img
        src={LogoTypo}
        alt="logo"
        style={{ width: "252px", height: "80px", margin: "55px 47px 0px 47px" }}
      />
      <Grid
        container
        direction="column"
        justifyContent="center"
        style={{
          width: "350px",
          height: "300px",
          padding: "0px 30px 0px 30px",
        }}
      >
        <TextField
          label="아이디"
          id="id_input"
          variant="outlined"
          value={id}
          onKeyPress={onKeyPress}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <div style={{ height: "10px" }} />
        <TextField
          label="비밀번호"
          id="pw_input"
          variant="outlined"
          type="password"
          value={pw}
          onKeyPress={onKeyPress}
          onChange={(e) => {
            setPw(e.target.value);
          }}
        />
        <div style={{ height: "30px" }} />
        <Button
          disabled={!isValid}
          variant="contained"
          onClick={onClick}
          style={{ height: "40px", width: "290px" }}
        >
          로그인
        </Button>
      </Grid>
      <Grid container justifyContent="center">
        <p style={{ fontSize: "10pt" }}>
          계정이 없으시다면?{" "}
          <Link to="/signup" style={{ textDecoration: "none" }}>
            회원가입
          </Link>
        </p>
      </Grid>
    </Grid>
  );
};
export default Login;
