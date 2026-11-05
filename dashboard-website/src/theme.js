import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      light: '#e6e0fb',
      main: '#673ab7',
      dark: '#4c2b8c'
    },
    secondary: {
      light: '#e3f2fd',
      main: '#1e88e5',
      dark: '#1565c0'
    },
    warning: {
      light: '#fff8e1',
      main: '#ffab00',
      dark: '#ff8f00'
    },
    success: {
      light: '#e6f9ea',
      main: '#2e9e5b'
    },
    error: {
      light: '#fde9e9',
      main: '#e33d3d'
    },
    background: {
      default: '#f8f8f8',
      paper: '#ffffff'
    },
    text: {
      primary: '#26262f',
      secondary: '#8c8c9c'
    }
  },
  shape: {
    borderRadius: 12
  },
  typography: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(',')
  }
})

export default theme