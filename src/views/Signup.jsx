import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "../components";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context";
import { save } from "../services/supabasedb";
import { signUp } from "../services/authentication";

const Singin = () => {
  const navigate = useNavigate();
  const { showSnackMessage, translate, supabase } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [erro, setErro] = useState("");

  const handleSignup = async () => {
    if (email === "" || password === "") {
      setErro("empty-fields");
      return;
    }

    if (password !== passwordConfirm) {
      setErro("match-passwords");
      return;
    }
    let { data: response, error } = await signUp(email, password, supabase);

    if (error) {
      if (
        error.toString().indexOf("AuthApiError: User already registered") !== -1
      ) {
        showSnackMessage(translate("user-already-register"));
      } else {
        showSnackMessage(error.toString());
      }
    } else {
      const data = {
        user: response.user.id,
      };
      await save("profile", data);
      showSnackMessage(translate("user-created"));
      navigate("/signin");
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
          <TextField
            label={translate("confirm-password")}
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleSignup}
          >
            {translate("register")}
          </Button>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 3,
            }}
          >
            <Link href="/signin" variant="body2" sx={{ textAlign: "center" }}>
              {translate("link-login")}
            </Link>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default Singin;
