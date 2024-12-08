import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    primary: {
      light: "#a7c9f4", 
      main: "#6a9ed8", 
      dark: "#3f7bbf", 
      contrastText: "#fff",
    },
    secondary: {
      light: "#f8c2d1", 
      main: "#f07c9d",  
      dark: "#c3577b",  
      contrastText: "#000",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      light: "#a7c9f4",
      main: "#6a9ed8", 
      dark: "#3f7bbf",  
      contrastText: "#fff",
    },
    secondary: {
      light: "#f8c2d1",
      main: "#f07c9d", 
      dark: "#c3577b", 
      contrastText: "#000",
    },
  },
});

export { lightTheme, darkTheme };
