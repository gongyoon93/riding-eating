// import * as React from "react";

// function Copyright(props: any) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignUp() {
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  return (
    <></>
    // <Container component="main" maxWidth="xs">
    //   <CssBaseline />
    //   <Box
    //     sx={{
    //       marginTop: 8,
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
    //       <LockOutlinedIcon />
    //     </Avatar>
    //     <Typography component="h1" variant="h5">
    //       회원가입
    //     </Typography>
    //     <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
    //       <Grid container spacing={2}>
    //         <Grid item xs={12} sm={6}>
    //           <TextField
    //             autoComplete="given-name"
    //             name="firstName"
    //             required
    //             fullWidth
    //             id="firstName"
    //             label="이름"
    //             autoFocus
    //           />
    //         </Grid>
    //         <Grid item xs={12} sm={6}>
    //           <TextField
    //             required
    //             fullWidth
    //             id="lastName"
    //             label="성"
    //             name="lastName"
    //             autoComplete="family-name"
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <TextField
    //             required
    //             fullWidth
    //             id="email"
    //             label="이메일 주소"
    //             name="email"
    //             autoComplete="email"
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <TextField
    //             required
    //             fullWidth
    //             name="password"
    //             label="비밀번호"
    //             type="password"
    //             id="password"
    //             autoComplete="new-password"
    //           />
    //         </Grid>
    //         {/* <Grid item xs={12}>
    //             <FormControlLabel
    //               control={
    //                 <Checkbox value="allowExtraEmails" color="primary" />
    //               }
    //               label="I want to receive inspiration, marketing promotions and updates via email."
    //             />
    //           </Grid> */}
    //       </Grid>
    //       <Button
    //         type="submit"
    //         fullWidth
    //         variant="contained"
    //         sx={{ mt: 3, mb: 2 }}
    //       >
    //         회원가입
    //       </Button>
    //       <Grid container justifyContent="flex-end">
    //         <Grid item>
    //           <Link href="/signin" variant="body2">
    //             로그인 화면으로
    //           </Link>
    //         </Grid>
    //       </Grid>
    //     </Box>
    //   </Box>
    //   {/* <Copyright sx={{ mt: 5 }} /> */}
    // </Container>
  );
}
