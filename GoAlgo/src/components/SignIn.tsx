import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { AuthApiServiceInstance } from "../app/AuthApiService";
import { UserApiServiceInstance } from "../app/UserApiService";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { rootStore } from "../stores/RootStore.ts";

export default function SignIn() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const [login, { isLoading }] = useLoginMutation();
  const [_err, setErr] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = () => {
    setLoading(true);
    const fetchToken = async () => {
      console.log({
        username: username,
        password: password,
      });
      AuthApiServiceInstance.getAccessToken({
        username: username,
        password: password,
      })
        .then((res) => {
          UserApiServiceInstance.getUserData().then((userData) => {
            console.log(userData);
            rootStore.setUser(userData);
            navigate("/profile");
            return;
          });
        })
        .catch((err) => {
          setErr("Введён неверный логин или пароль");
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchToken();
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        background: "#F3F4F6",
        borderRadius: "12px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          pb: "45px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            autoComplete="current-password"
          />
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, background: "#FF0508" }}
            onClick={login}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item>
              <Link sx={{ fontSize: "20px" }} href="/register" variant="body2">
                {"Нет аккаунта? Зарегистрироваться."}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
