import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
} from "../components";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context";
import { signIn } from "../services/authentication";
import { get } from "../services/supabasedb";

const Singin = () => {
  const { showSnackMessage, supabase, translate } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "" || password === "") {
      setErro("empty-fields");
      return;
    }
    verifyLogin();
  };

  const verifyLogin = async () => {
    let { data: response, error } = await signIn(email, password, supabase);

    if (error && error.message === "Invalid login credentials") {
      showSnackMessage(translate("wrong-credentials"));
    } else {
      localStorage.setItem("session", JSON.stringify(response.session));
      localStorage.setItem("user", JSON.stringify(response.user));

      const profile = await get("profile", [
        { field: "user", value: response.user.id },
      ]);
      localStorage.setItem("profile", JSON.stringify(profile));

      navigate("/");
    }
  };

  return (
    <Container
      sx={{
        backgroundColor: "primary.main",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          padding: "20px",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FEFEFE",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
            {translate("welcome")}
          </Typography>

          {erro && (
            <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
              {translate(erro)}
            </Typography>
          )}

          <TextField
            label={translate("email")}
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label={translate("password")}
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleLogin}
          >
            {translate("login")}
          </Button>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 3,
            }}
          >
            <Link href="/signup" variant="body2" sx={{ textAlign: "center" }}>
              {translate("link-register")}
            </Link>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default Singin;
