import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
} from "../components";
import {
  Menu,
  MenuItem,
} from "@mui/material";
import { useAppContext } from "../Context";
import { useNavigate } from "react-router-dom";
import { save } from "../services/supabasedb";
import { signOut } from "../services/authentication";

const Settings = () => {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [birthDate, setBithDate] = useState("");
  const [edit, setEdit] = useState(false);
  const [languageAnchor, setLanguageAnchor] = useState(null);

  const { translate, changeLanguage, supabase } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    setName(profile.name);
    setWeight(profile.weight);
    setHeight(profile.height);
    setBithDate(profile.birth);
  }, []);

  const handleSave = async () => {
    const data = JSON.parse(localStorage.getItem("profile"));
    data.name = name;
    data.weight = weight;
    data.height = height;
    data.birth = birthDate;
    await save("profile", data);
    localStorage.setItem("profile", JSON.stringify(data));
    setEdit(false);
  };

  const handleLanguageMenu = (event) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleLanguageChange = (language) => {
    setLanguageAnchor(language);
    changeLanguage(language)
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>
        {translate("settings")}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: "16px"}}>
        <TextField
          label={translate("name")}
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!edit}
        />

        <TextField
          label={translate("weight")}
          variant="outlined"
          fullWidth
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          disabled={!edit}
        />

        <TextField
          label={translate("height")}
          variant="outlined"
          fullWidth
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          disabled={!edit}
        />

        <TextField
          label={translate("birth-date")}
          variant="outlined"
          fullWidth
          type="date"
          value={birthDate}
          onChange={(e) => setBithDate(e.target.value)}
          disabled={!edit}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setEdit(!edit)}
            >
              {edit ? translate("cancel") : translate("edit")}
            </Button>
          </Grid>
          {edit && (
            <Grid item>
              <Button
                variant="contained"
                color="success"
                onClick={handleSave}
              >
                {translate("save")}
              </Button>
            </Grid>
          )}
        </Grid>

        <Grid container spacing={2} justifyContent="center" sx={{marginTop: "16px"}}>
          <Grid item>
            <Button variant="outlined" onClick={handleLanguageMenu}>
              {translate("change-language")}
            </Button>
            <Menu
              anchorEl={languageAnchor}
              open={Boolean(languageAnchor)}
              onClose={() => setLanguageAnchor(null)}
            >
              <MenuItem onClick={() => handleLanguageChange("pt")}>
                Português
              </MenuItem>
              <MenuItem onClick={() => handleLanguageChange("en")}>
                English
              </MenuItem>
              <MenuItem onClick={() => handleLanguageChange("es")}>
                Español
              </MenuItem>
            </Menu>
          </Grid>

          <Grid item>
            <Button
              variant="outlined"
              color="error"
              onClick={() => signOut(supabase, navigate)}
            >
              {translate("logout")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Settings;
