import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { login } from "../../api/user/login";
import LogoTypo from "../../media/logo_typo.png";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    if (id.length > 0 && setPw > 0) {
      setIsValid(true);
    }
  }, [id, pw]);

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
          onChange={(e) => {
            setPw(e.target.value);
          }}
        />
        <div style={{ height: "30px" }} />
        <Button
          variant="contained"
          onClick={() => {
            const newUser = login(id, pw);
            setUserInfo(newUser);
          }}
          style={{ height: "40px", width: "290px" }}
        >
          로그인
        </Button>
      </Grid>
      <Grid container justifyContent="center">
        <p style={{ fontSize: '10pt'}}>계정이 없으시다면? <a href="" style={{textDecoration: 'none'}}>회원가입</a></p>
      </Grid>
    </Grid>
  );
};
export default Login;
