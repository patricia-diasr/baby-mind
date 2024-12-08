import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { IconButton, Box } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

const AppBarComponent = ({ ...props }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: isMobile ? "space-between" : "flex-start",
          alignItems: "center",
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => navigate("/")}
          sx={{
            marginRight: isMobile ? 0 : theme.spacing(2),
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: isMobile ? 1 : 0,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          {props.title}
        </Typography>
        {props.id && (
          <Box
            sx={{
              marginLeft: isMobile ? 0 : "auto",
            }}
          >
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="delete"
              onClick={props._delete}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
