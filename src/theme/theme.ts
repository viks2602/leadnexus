import { createTheme } from "@mui/material/styles";

const theme = createTheme({

  typography: {
    fontFamily: "Nunito",
    h6:{
      fontSize:'14px',
      color: '#505050',
    },
    h5:{
      fontSize:'16px',
      color: '#505050',
    },
    h4:{
      fontSize:'18px',
      color: '#505050',
    },
    h3:{
      fontSize:'20px',
      color: '#505050',
    },
    h2:{
      fontSize:'22px',
      color: '#505050',
    },
    h1:{
      fontSize:'24px',
      '@media (max-width:600px)': { 
        fontSize: '18px', 
      },
    },
    subtitle1:{
      fontSize:'20px',
      fontWeight:700
    },
    subtitle2:{
      fontSize:'18px',
    },
    body1:{
      fontSize:'16px',
      color:'#505050',
      fontWeight:500 
    },
    body2:{
      fontSize:'14px',
      color:'#505050'
    }
  },
  components: {
     MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
        },
      },

    },
    MuiTextField:{
      styleOverrides:{
        root:{

        }
      }
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 900,
      lg: 1200,
      xl: 1536
    },
  },
});

export default theme;
