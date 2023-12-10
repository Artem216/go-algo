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

import { useEffect } from "react";

export default function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerDisabled, setRegisterDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<null | string>(null);

  useEffect(() => {
    if (email && firstName && lastName && password) {
      setRegisterDisabled(false);
    } else {
      setRegisterDisabled(true);
    }
  }, [email, firstName, lastName, password]);

  const register = () => {
    setLoading(true);
    if (!email || !firstName || !lastName || !password) {
      setErr("Заполните все поля");
      setLoading(false);
      return;
    }
    const fetchToken = async () => {
      AuthApiServiceInstance.createUser({
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
      })
        .then((tokenData) => {
          console.log(tokenData);
          UserApiServiceInstance.getUserData().then((userData) => {
            console.log(userData);
            rootStore.setUser(userData);
            navigate("/profile");
            return;
          });
        })
        .catch((err) => {
          console.log(err);
          setErr("Введён неверный логин или пароль");
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchToken();
    setLoading(false);
  };

  return (
    <Container
      sx={{
        background: "#F3F4F6",
        borderRadius: "12px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      component="main"
      maxWidth="sm"
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pb: "45px",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ pb: "40px" }}>
          Регистрация
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Имя"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Фамилия"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={register}
          >
            Зарегистрироваться
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link sx={{ fontSize: "20px" }} href="/login" variant="body2">
                Уже есть аккаунт? Войти.
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
