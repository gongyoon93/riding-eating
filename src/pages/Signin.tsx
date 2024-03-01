import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "@/firebase/fbInstance";
import { useSetRecoilState } from "recoil";
import { userState } from "@/lib/atoms/atoms";

// 이메일 유효성 검사 함수
const validateEmail = (email: string) => {
  const email_regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
  return !email_regex.test(email) || email === "";
};

// 비밀번호 유효성 검사 함수
const validatePassword = (password: string) => {
  return password.length < 8 || password === "";
};

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const setUser = useSetRecoilState(userState);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value, // name 값이 동적으로 결정되기 때문에 Computed Property Names(계산된 속성 이름)을 사용한다.
    });
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateEmail(formData.email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    if (validatePassword(formData.password)) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
    try {
      const userCredential = await signInWithEmailAndPassword(
        authService,
        formData.email,
        formData.password
      );
      //웹 앱에서도 저장될 수 있는 방식으로 sessionId(user data) 저장
      const currentUser = userCredential.user;
      setUser(currentUser);
      // setCookie("uid", currentUser.uid, 30);
      console.log(currentUser);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            type="email"
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일 주소"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleInputChange}
            error={emailError}
            helperText={
              emailError ? "이메일은 '@', '.'가 포함 되어야 합니다." : ""
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleInputChange}
            error={passwordError}
            helperText={
              passwordError ? "패스워드를 8자리 이상 입력해야 합니다." : ""
            }
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="아이디 기억하기"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            확인
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                비밀번호 찾기
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                회원가입
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
